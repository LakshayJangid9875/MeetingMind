from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_db, close_db
from routers import auth, meetings, tasks, search, analytics, integrations

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()

app = FastAPI(
    title="MeetingMind API",
    description="AI-powered meeting intelligence platform",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,         prefix="/api/auth",         tags=["Auth"])
app.include_router(meetings.router,     prefix="/api/meetings",     tags=["Meetings"])
app.include_router(tasks.router,        prefix="/api/tasks",        tags=["Tasks"])
app.include_router(search.router,       prefix="/api/search",       tags=["Search"])
app.include_router(analytics.router,    prefix="/api/analytics",    tags=["Analytics"])
app.include_router(integrations.router, prefix="/api/integrations", tags=["Integrations"])

@app.get("/health")
async def health():
    return {"status": "ok", "service": "MeetingMind API"}