from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.impact.model import ImpactAction
from app.impact.schema import ImpactActionCreate
from app.teams.model import Team, TeamMember, TeamActivity

router = APIRouter(prefix="/impact", tags=["Impact Tracker"])

def action_to_dict(action: ImpactAction):
    return {
        "id": action.id,
        "user_id": action.user_id,
        "team_id": action.team_id,
        "activity_id": action.activity_id,
        "action_type": action.action_type,
        "title": action.title,
        "description": action.description,
        "quantity": action.quantity,
        "unit": action.unit,
        "impact_points": action.impact_points,
        "created_at": action.created_at,
    }


@router.post("/actions")
def create_impact_action(
    data: ImpactActionCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if data.team_id is not None:
        team = db.query(Team).filter(Team.id == data.team_id).first()

        if not team:
            raise HTTPException(status_code=404, detail="Team not found")

        is_member = (
            db.query(TeamMember)
            .filter(
                TeamMember.team_id == data.team_id,
                TeamMember.user_id == user.id,
            )
            .first()
        )

        if team.created_by != user.id and not is_member:
            raise HTTPException(
                status_code=403,
                detail="Join the team before recording an action for it",
            )

    if data.activity_id is not None:
        activity = (
            db.query(TeamActivity)
            .filter(TeamActivity.id == data.activity_id)
            .first()
        )

        if not activity:
            raise HTTPException(
                status_code=404,
                detail="Team activity not found",
            )

        if data.team_id != activity.team_id:
            raise HTTPException(
                status_code=400,
                detail="The activity must belong to the selected team",
            )

    action = ImpactAction(
        user_id=user.id,
        team_id=data.team_id,
        activity_id=data.activity_id,
        action_type=data.action_type.strip(),
        title=data.title.strip(),
        description=data.description,
        quantity=data.quantity,
        unit=data.unit,
        impact_points=data.impact_points,
    )

    db.add(action)
    db.commit()
    db.refresh(action)

    return {
        "message": "Your small win has been recorded!",
        "action": action_to_dict(action),
    }


@router.get("/me")
def get_my_impact(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow_start = today_start + timedelta(days=1)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = today_start.replace(day=1)

    query = db.query(ImpactAction).filter(
        ImpactAction.user_id == user.id
    )

    total_actions = query.count()

    total_points = (
        db.query(func.coalesce(func.sum(ImpactAction.impact_points), 0))
        .filter(ImpactAction.user_id == user.id)
        .scalar()
    )

    today_actions = query.filter(
        ImpactAction.created_at >= today_start,
        ImpactAction.created_at < tomorrow_start,
    ).count()

    weekly_actions = query.filter(
        ImpactAction.created_at >= week_start,
        ImpactAction.created_at < tomorrow_start,
    ).count()

    monthly_actions = query.filter(
        ImpactAction.created_at >= month_start,
        ImpactAction.created_at < tomorrow_start,
    ).count()

    return {
        "total_actions": total_actions,
        "total_impact_points": int(total_points or 0),
        "today_actions": today_actions,
        "weekly_actions": weekly_actions,
        "monthly_actions": monthly_actions,
    }


@router.get("/me/history")
def get_my_impact_history(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    query = db.query(ImpactAction).filter(
        ImpactAction.user_id == user.id
    )

    total = query.count()

    actions = (
        query.order_by(ImpactAction.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "items": [action_to_dict(action) for action in actions],
        "page": page,
        "limit": limit,
        "total": total,
        "pages": (total + limit - 1) // limit,
    }


@router.get("/teams/{team_id}")
def get_team_impact(
    team_id: int,
    db: Session = Depends(get_db),
):
    team = db.query(Team).filter(Team.id == team_id).first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    total_actions = (
        db.query(func.count(ImpactAction.id))
        .filter(ImpactAction.team_id == team_id)
        .scalar()
    )

    total_points = (
        db.query(func.coalesce(func.sum(ImpactAction.impact_points), 0))
        .filter(ImpactAction.team_id == team_id)
        .scalar()
    )

    contributors = (
        db.query(func.count(func.distinct(ImpactAction.user_id)))
        .filter(ImpactAction.team_id == team_id)
        .scalar()
    )

    return {
        "team_id": team_id,
        "team_name": team.name,
        "total_actions": total_actions or 0,
        "total_impact_points": int(total_points or 0),
        "contributors": contributors or 0,
    }