from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    Float,
)
from app.database import Base

class ImpactAction(Base):
    __tablename__ = "impact_actions"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    team_id = Column(
        Integer,
        ForeignKey("teams.id"),
        nullable=True,
    )

    activity_id = Column(
        Integer,
        ForeignKey("team_activities.id"),
        nullable=True,
    )

    action_type = Column(
        String(100),
        nullable=False,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    quantity = Column(
        Float,
        nullable=True,
    )

    unit = Column(
        String(50),
        nullable=True,
    )

    impact_points = Column(
        Integer,
        default=1,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )