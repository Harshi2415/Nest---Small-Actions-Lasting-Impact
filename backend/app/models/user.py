from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Integer, String, Text
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )
    password_hash = Column(
        String(255),
        nullable=False,
    )
    profile_image = Column(
        String(500),
        nullable=True,
    )
    bio = Column(
        Text,
        nullable=True,
    )
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )