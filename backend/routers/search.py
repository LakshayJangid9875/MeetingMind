from fastapi import APIRouter, Depends, Query
from utils.auth import get_current_user
from database import get_db

router = APIRouter()

@router.get("/")
async def semantic_search(
    q: str = Query(..., min_length=2),
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    """Semantic search across all user meetings."""
    from services.embeddings import search_meetings
    user_id = str(current_user["_id"])
    results = search_meetings(q, user_id)
    return {"query": q, "results": results}