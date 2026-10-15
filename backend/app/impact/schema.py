from pydantic import BaseModel, Field

class ImpactActionCreate(BaseModel):
    action_type: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    quantity: float | None = Field(default=None, gt=0)
    unit: str | None = Field(default=None, max_length=50)
    impact_points: int = Field(default=1, ge=1, le=1000)
    team_id: int | None = None
    activity_id: int | None = None