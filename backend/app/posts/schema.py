from pydantic import BaseModel, ConfigDict, Field

class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1)
    category: str = Field(min_length=1, max_length=100)

class PostUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=200)
    content: str | None = None
    category: str | None = Field(default=None, max_length=100)

class CommentCreate(BaseModel):
    content: str = Field(min_length=1)
    parent_id: int | None = None

class CommentUpdate(BaseModel):
    content: str = Field(min_length=1)

class PostResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    content: str
    category: str
    user_id: int