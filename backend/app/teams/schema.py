
from pydantic import BaseModel, ConfigDict


class TeamCreate(BaseModel):
    name: str
    description: str
    category: str
    image: str | None = None


class TeamUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    category: str | None = None
    image: str | None = None


class TeamJoin(BaseModel):
    message: str | None = None


class ActivityCreate(BaseModel):
    title: str
    description: str
    activity_date: str
    location: str | None = None


class ActivityUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    activity_date: str | None = None
    location: str | None = None


class TeamResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str
    category: str
    image: str | None = None