from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.teams.routes import router as teams_router
from app.posts.routes import router as posts_router
from app.impact.routes import router as impact_router

# Register SQLAlchemy models.
from app.models.user import User
from app.teams.model import Team, TeamMember, TeamActivity
from app.posts.model import Post, PostMedia, Like, Comment
from app.impact.model import ImpactAction

app = FastAPI(
    title="NEST API",
    version="1.0.0",
)

# Allow the local React/Vite frontend to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keep uploads available regardless of the terminal's working directory.
BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
(UPLOAD_DIR / "profile").mkdir(parents=True, exist_ok=True)
(UPLOAD_DIR / "posts").mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads",
)

# Register all API routes.
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(teams_router)
app.include_router(posts_router)
app.include_router(impact_router)

@app.get("/")
def root():
    return {"message": "NEST API is running"}