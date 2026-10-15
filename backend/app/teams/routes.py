
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.teams.model import Team, TeamMember, TeamActivity
from app.teams.schema import (
    TeamCreate,
    TeamUpdate,
    TeamJoin,
    ActivityCreate,
    ActivityUpdate,
)
from app.impact.model import ImpactAction


router = APIRouter(prefix="/teams", tags=["Teams"])


def get_team_or_404(team_id: int, db: Session):
    team = db.query(Team).filter(Team.id == team_id).first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    return team


def check_team_owner(team: Team, user: User):
    if team.created_by != user.id:
        raise HTTPException(
            status_code=403,
            detail="Only the team creator can manage this team",
        )


def parse_activity_date(value: str):
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Use a valid ISO date/time, for example 2026-10-15T10:00:00",
        )


@router.get("/")
def get_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).order_by(Team.created_at.desc()).all()
    result = []

    for team in teams:
        members_count = (
            db.query(func.count(TeamMember.id))
            .filter(TeamMember.team_id == team.id)
            .scalar()
        )

        actions_count = (
            db.query(func.count(ImpactAction.id))
            .filter(ImpactAction.team_id == team.id)
            .scalar()
        )

        next_activity = (
            db.query(TeamActivity)
            .filter(
                TeamActivity.team_id == team.id,
                TeamActivity.activity_date >= datetime.now(),
            )
            .order_by(TeamActivity.activity_date.asc())
            .first()
        )

        result.append({
            "id": team.id,
            "name": team.name,
            "description": team.description,
            "category": team.category,
            "image": team.image,
            "created_by": team.created_by,
            "created_at": team.created_at,
            "members_count": members_count or 0,
            "actions_count": actions_count or 0,
            "next_activity": (
                {
                    "id": next_activity.id,
                    "title": next_activity.title,
                    "activity_date": next_activity.activity_date,
                    "location": next_activity.location,
                }
                if next_activity else None
            ),
        })

    return result


@router.post("/")
def create_team(
    data: TeamCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    team = Team(
        name=data.name,
        description=data.description,
        category=data.category,
        image=data.image,
        created_by=user.id,
    )

    db.add(team)
    db.commit()
    db.refresh(team)

    return {
        "message": "Team created successfully",
        "team": team,
    }


@router.get("/{team_id}")
def get_team(team_id: int, db: Session = Depends(get_db)):
    team = get_team_or_404(team_id, db)

    members_count = (
        db.query(func.count(TeamMember.id))
        .filter(TeamMember.team_id == team_id)
        .scalar()
    )

    actions_count = (
        db.query(func.count(ImpactAction.id))
        .filter(ImpactAction.team_id == team_id)
        .scalar()
    )

    return {
        "id": team.id,
        "name": team.name,
        "description": team.description,
        "category": team.category,
        "image": team.image,
        "created_by": team.created_by,
        "created_at": team.created_at,
        "members_count": members_count or 0,
        "actions_count": actions_count or 0,
    }


@router.put("/{team_id}")
def update_team(
    team_id: int,
    data: TeamUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    team = get_team_or_404(team_id, db)
    check_team_owner(team, user)

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(team, field, value)

    db.commit()
    db.refresh(team)

    return {"message": "Team updated successfully", "team": team}


@router.delete("/{team_id}")
def delete_team(
    team_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    team = get_team_or_404(team_id, db)
    check_team_owner(team, user)

    activity_ids = [
        activity.id
        for activity in db.query(TeamActivity)
        .filter(TeamActivity.team_id == team_id)
        .all()
    ]

    if activity_ids:
        db.query(ImpactAction).filter(
            ImpactAction.activity_id.in_(activity_ids)
        ).delete(synchronize_session=False)

    db.query(ImpactAction).filter(
        ImpactAction.team_id == team_id
    ).delete(synchronize_session=False)

    db.query(TeamActivity).filter(
        TeamActivity.team_id == team_id
    ).delete(synchronize_session=False)

    db.query(TeamMember).filter(
        TeamMember.team_id == team_id
    ).delete(synchronize_session=False)

    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully"}


@router.post("/{team_id}/join")
def join_team(
    team_id: int,
    data: TeamJoin | None = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    get_team_or_404(team_id, db)

    existing = (
        db.query(TeamMember)
        .filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == user.id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already joined this team",
        )

    membership = TeamMember(
        team_id=team_id,
        user_id=user.id,
        message=data.message if data else None,
    )

    db.add(membership)
    db.commit()

    return {"message": "You joined the team successfully"}


@router.delete("/{team_id}/leave")
def leave_team(
    team_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    get_team_or_404(team_id, db)

    membership = (
        db.query(TeamMember)
        .filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == user.id,
        )
        .first()
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="You are not a member of this team",
        )

    db.delete(membership)
    db.commit()

    return {"message": "You left the team successfully"}


@router.get("/{team_id}/members")
def get_team_members(
    team_id: int,
    db: Session = Depends(get_db),
):
    get_team_or_404(team_id, db)

    members = (
        db.query(TeamMember, User)
        .join(User, TeamMember.user_id == User.id)
        .filter(TeamMember.team_id == team_id)
        .order_by(TeamMember.joined_at.desc())
        .all()
    )

    return [
        {
            "id": membership.id,
            "user_id": member.id,
            "name": member.name,
            "email": member.email,
            "message": membership.message,
            "joined_at": membership.joined_at,
        }
        for membership, member in members
    ]


@router.get("/{team_id}/activities")
def get_team_activities(
    team_id: int,
    db: Session = Depends(get_db),
):
    get_team_or_404(team_id, db)

    return (
        db.query(TeamActivity)
        .filter(TeamActivity.team_id == team_id)
        .order_by(TeamActivity.activity_date.asc())
        .all()
    )


@router.post("/{team_id}/activities")
def create_team_activity(
    team_id: int,
    data: ActivityCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    team = get_team_or_404(team_id, db)
    check_team_owner(team, user)

    activity = TeamActivity(
        team_id=team_id,
        title=data.title,
        description=data.description,
        activity_date=parse_activity_date(data.activity_date),
        location=data.location,
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return {
        "message": "Team activity created successfully",
        "activity": activity,
    }


@router.put("/activities/{activity_id}")
def update_team_activity(
    activity_id: int,
    data: ActivityUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    activity = (
        db.query(TeamActivity)
        .filter(TeamActivity.id == activity_id)
        .first()
    )

    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    team = get_team_or_404(activity.team_id, db)
    check_team_owner(team, user)

    updates = data.model_dump(exclude_unset=True)

    if "activity_date" in updates and updates["activity_date"]:
        updates["activity_date"] = parse_activity_date(
            updates["activity_date"]
        )

    for field, value in updates.items():
        setattr(activity, field, value)

    db.commit()
    db.refresh(activity)

    return {"message": "Activity updated successfully", "activity": activity}


@router.delete("/activities/{activity_id}")
def delete_team_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    activity = (
        db.query(TeamActivity)
        .filter(TeamActivity.id == activity_id)
        .first()
    )

    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    team = get_team_or_404(activity.team_id, db)
    check_team_owner(team, user)

    db.query(ImpactAction).filter(
        ImpactAction.activity_id == activity_id
    ).update(
        {"activity_id": None},
        synchronize_session=False,
    )

    db.delete(activity)
    db.commit()

    return {"message": "Activity deleted successfully"}