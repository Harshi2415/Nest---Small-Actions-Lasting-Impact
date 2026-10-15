
from pathlib import Path
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    UploadFile,
    File,
)
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.posts.model import Post, PostMedia, Like, Comment
from app.posts.schema import (
    PostCreate,
    PostUpdate,
    CommentCreate,
    CommentUpdate,
)


router = APIRouter(prefix="/posts", tags=["Posts"])

UPLOAD_DIR = Path("uploads/posts")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024


def get_post_or_404(post_id: int, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    return post


def get_comment_or_404(comment_id: int, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    return comment


def check_post_owner(post: Post, user: User):
    if post.user_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only manage your own posts",
        )


def format_post(post: Post, db: Session):
    author = db.query(User).filter(User.id == post.user_id).first()

    likes_count = (
        db.query(func.count(Like.id))
        .filter(Like.post_id == post.id)
        .scalar()
    )

    comments_count = (
        db.query(func.count(Comment.id))
        .filter(Comment.post_id == post.id)
        .scalar()
    )

    media = (
        db.query(PostMedia)
        .filter(PostMedia.post_id == post.id)
        .order_by(PostMedia.id.asc())
        .all()
    )

    return {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "user_id": post.user_id,
        "author_name": author.name if author else "Unknown",
        "created_at": post.created_at,
        "updated_at": post.updated_at,
        "likes_count": likes_count or 0,
        "comments_count": comments_count or 0,
        "images": [item.file_path for item in media],
    }


def format_comment(comment: Comment, db: Session):
    author = db.query(User).filter(User.id == comment.user_id).first()

    replies = (
        db.query(Comment)
        .filter(Comment.parent_id == comment.id)
        .order_by(Comment.created_at.asc())
        .all()
    )

    return {
        "id": comment.id,
        "post_id": comment.post_id,
        "user_id": comment.user_id,
        "author_name": author.name if author else "Unknown",
        "parent_id": comment.parent_id,
        "content": comment.content,
        "created_at": comment.created_at,
        "updated_at": comment.updated_at,
        "replies": [
            {
                "id": reply.id,
                "post_id": reply.post_id,
                "user_id": reply.user_id,
                "author_name": (
                    db.query(User.name)
                    .filter(User.id == reply.user_id)
                    .scalar()
                ) or "Unknown",
                "parent_id": reply.parent_id,
                "content": reply.content,
                "created_at": reply.created_at,
                "updated_at": reply.updated_at,
            }
            for reply in replies
        ],
    }


@router.get("/")
def get_posts(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=50),
    search: str | None = None,
    category: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Post)

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Post.title.ilike(term),
                Post.content.ilike(term),
            )
        )

    if category and category.lower() != "all":
        query = query.filter(Post.category.ilike(category.strip()))

    total = query.count()

    posts = (
        query.order_by(Post.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": [format_post(post, db) for post in posts],
        "page": page,
        "limit": limit,
        "total": total,
        "pages": (total + limit - 1) // limit,
    }


@router.post("/")
def create_post(
    data: PostCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = Post(
        title=data.title,
        content=data.content,
        category=data.category,
        user_id=user.id,
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return {
        "message": "Post created successfully",
        "post": format_post(post, db),
    }


@router.get("/{post_id}")
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = get_post_or_404(post_id, db)
    return format_post(post, db)


@router.put("/{post_id}")
def update_post(
    post_id: int,
    data: PostUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = get_post_or_404(post_id, db)
    check_post_owner(post, user)

    for field, value in data.model_dump(exclude_unset=True).items():
        if value is not None:
            setattr(post, field, value)

    db.commit()
    db.refresh(post)

    return {
        "message": "Post updated successfully",
        "post": format_post(post, db),
    }


@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = get_post_or_404(post_id, db)
    check_post_owner(post, user)

    media = db.query(PostMedia).filter(
        PostMedia.post_id == post_id
    ).all()

    for item in media:
        file_path = Path(item.file_path.lstrip("/"))
        if file_path.is_file():
            file_path.unlink()

    comment_ids = [
        comment.id
        for comment in db.query(Comment.id)
        .filter(Comment.post_id == post_id)
        .all()
    ]

    if comment_ids:
        db.query(Comment).filter(
            Comment.parent_id.in_(comment_ids)
        ).delete(synchronize_session=False)

        db.query(Comment).filter(
            Comment.post_id == post_id
        ).delete(synchronize_session=False)

    db.query(Like).filter(
        Like.post_id == post_id
    ).delete(synchronize_session=False)

    db.query(PostMedia).filter(
        PostMedia.post_id == post_id
    ).delete(synchronize_session=False)

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}


@router.post("/{post_id}/images")
async def upload_post_images(
    post_id: int,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = get_post_or_404(post_id, db)
    check_post_owner(post, user)

    if not files:
        raise HTTPException(status_code=400, detail="Select an image")

    if len(files) > 5:
        raise HTTPException(
            status_code=400,
            detail="You can upload a maximum of 5 images at once",
        )

    saved_paths = []

    try:
        for upload in files:
            if upload.content_type not in ALLOWED_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail="Only JPEG, PNG and WebP images are allowed",
                )

            content = await upload.read()

            if len(content) > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=400,
                    detail="Each image must be 5 MB or smaller",
                )

            extension = {
                "image/jpeg": ".jpg",
                "image/png": ".png",
                "image/webp": ".webp",
            }[upload.content_type]

            filename = f"{uuid4().hex}{extension}"
            destination = UPLOAD_DIR / filename
            destination.write_bytes(content)
            saved_paths.append(destination)

            media = PostMedia(
                post_id=post_id,
                file_path=f"/uploads/posts/{filename}",
            )
            db.add(media)

        db.commit()

    except Exception:
        db.rollback()

        for path in saved_paths:
            if path.exists():
                path.unlink()

        raise

    return {
        "message": "Images uploaded successfully",
        "images": [
            f"/uploads/posts/{path.name}" for path in saved_paths
        ],
    }


@router.post("/{post_id}/like")
def toggle_like(
    post_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    get_post_or_404(post_id, db)

    existing = (
        db.query(Like)
        .filter(
            Like.post_id == post_id,
            Like.user_id == user.id,
        )
        .first()
    )

    if existing:
        db.delete(existing)
        db.commit()
        liked = False
    else:
        db.add(Like(post_id=post_id, user_id=user.id))
        db.commit()
        liked = True

    likes_count = (
        db.query(func.count(Like.id))
        .filter(Like.post_id == post_id)
        .scalar()
    )

    return {
        "liked": liked,
        "likes_count": likes_count or 0,
    }


@router.get("/{post_id}/likes")
def get_post_likes(
    post_id: int,
    db: Session = Depends(get_db),
):
    get_post_or_404(post_id, db)

    return (
        db.query(User.id, User.name, Like.created_at)
        .join(Like, Like.user_id == User.id)
        .filter(Like.post_id == post_id)
        .order_by(Like.created_at.desc())
        .all()
    )


@router.get("/{post_id}/comments")
def get_post_comments(
    post_id: int,
    db: Session = Depends(get_db),
):
    get_post_or_404(post_id, db)

    comments = (
        db.query(Comment)
        .filter(
            Comment.post_id == post_id,
            Comment.parent_id.is_(None),
        )
        .order_by(Comment.created_at.asc())
        .all()
    )

    return [format_comment(comment, db) for comment in comments]


@router.post("/{post_id}/comments")
def create_comment(
    post_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    get_post_or_404(post_id, db)

    if data.parent_id is not None:
        parent = get_comment_or_404(data.parent_id, db)

        if parent.post_id != post_id:
            raise HTTPException(
                status_code=400,
                detail="Reply must belong to the same post",
            )

    comment = Comment(
        post_id=post_id,
        user_id=user.id,
        parent_id=data.parent_id,
        content=data.content.strip(),
    )

    if not comment.content:
        raise HTTPException(
            status_code=400,
            detail="Comment cannot be empty",
        )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return {
        "message": "Comment added successfully",
        "comment": format_comment(comment, db),
    }


@router.post("/comments/{comment_id}/replies")
def create_reply(
    comment_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    parent = get_comment_or_404(comment_id, db)

    # Keep replies one level deep to make the response predictable.
    if parent.parent_id is not None:
        raise HTTPException(
            status_code=400,
            detail="Replies to replies are not supported",
        )

    content = data.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Reply cannot be empty",
        )

    reply = Comment(
        post_id=parent.post_id,
        user_id=user.id,
        parent_id=parent.id,
        content=content,
    )

    db.add(reply)
    db.commit()
    db.refresh(reply)

    return {
        "message": "Reply added successfully",
        "comment": format_comment(reply, db),
    }


@router.put("/comments/{comment_id}")
def update_comment(
    comment_id: int,
    data: CommentUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    comment = get_comment_or_404(comment_id, db)

    if comment.user_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only edit your own comments",
        )

    content = data.content.strip()

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Comment cannot be empty",
        )

    comment.content = content
    db.commit()
    db.refresh(comment)

    return {
        "message": "Comment updated successfully",
        "comment": format_comment(comment, db),
    }


@router.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    comment = get_comment_or_404(comment_id, db)

    if comment.user_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only delete your own comments",
        )

    # Delete child replies before deleting the parent comment.
    db.query(Comment).filter(
        Comment.parent_id == comment.id
    ).delete(synchronize_session=False)

    db.delete(comment)
    db.commit()

    return {"message": "Comment deleted successfully"}