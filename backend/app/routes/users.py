
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserUpdate


router = APIRouter(prefix="/users", tags=["Users"])

BACKEND_DIR = Path(__file__).resolve().parents[2]
PROFILE_DIR = BACKEND_DIR / "uploads" / "profile"
PROFILE_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
MAX_FILE_SIZE = 5 * 1024 * 1024


def profile_response(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "bio": user.bio,
        "profile_image": user.profile_image,
        "created_at": user.created_at,
        "updated_at": user.updated_at,
    }


def remove_old_photo(photo_url: str | None):
    if not photo_url or not photo_url.startswith("/uploads/profile/"):
        return

    filename = photo_url.rsplit("/", 1)[-1]

    # Only remove a simple filename from the profile upload directory.
    if filename and Path(filename).name == filename:
        old_file = PROFILE_DIR / filename
        if old_file.is_file():
            old_file.unlink()


@router.get("/me")
def get_my_profile(
    user: User = Depends(get_current_user),
):
    return profile_response(user)


@router.put("/me")
def update_my_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    updates = data.model_dump(exclude_unset=True)

    if not updates:
        raise HTTPException(
            status_code=400,
            detail="Provide at least one profile field to update",
        )

    if "name" in updates:
        if updates["name"] is None or not updates["name"].strip():
            raise HTTPException(
                status_code=400,
                detail="Name cannot be empty",
            )
        updates["name"] = updates["name"].strip()

    if "email" in updates:
        if updates["email"] is None:
            raise HTTPException(
                status_code=400,
                detail="Email cannot be empty",
            )

        updates["email"] = str(updates["email"]).lower()

        existing_user = (
            db.query(User)
            .filter(
                User.email == updates["email"],
                User.id != user.id,
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="This email is already registered",
            )

    if "bio" in updates and updates["bio"] is not None:
        updates["bio"] = updates["bio"].strip() or None

    for field, value in updates.items():
        setattr(user, field, value)

    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Could not update profile",
        )

    return {
        "message": "Profile updated successfully",
        "user": profile_response(user),
    }


@router.post("/me/photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG and WebP images are allowed",
        )

    content = await file.read()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty",
        )

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Profile photo must be 5 MB or smaller",
        )

    filename = f"{uuid4().hex}{ALLOWED_TYPES[file.content_type]}"
    destination = PROFILE_DIR / filename
    destination.write_bytes(content)

    old_photo = user.profile_image
    user.profile_image = f"/uploads/profile/{filename}"

    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        destination.unlink(missing_ok=True)
        raise HTTPException(
            status_code=500,
            detail="Could not save profile photo",
        )

    if old_photo != user.profile_image:
        remove_old_photo(old_photo)

    return {
        "message": "Profile photo uploaded successfully",
        "profile_image": user.profile_image,
        "user": profile_response(user),
    }


@router.delete("/me/photo")
def delete_profile_photo(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    old_photo = user.profile_image

    if not old_photo:
        return {"message": "No profile photo to delete"}

    user.profile_image = None

    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Could not remove profile photo",
        )

    remove_old_photo(old_photo)

    return {
        "message": "Profile photo removed successfully",
        "user": profile_response(user),
    }
