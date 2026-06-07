from fastapi import APIRouter, Depends
from utils.auth import get_current_user
from database import get_db

router = APIRouter()

@router.get("/")
async def list_meetings(current_user=Depends(get_current_user), db=Depends(get_db)):
    from bson import ObjectId
    meetings = await db.meetings.find(
        {"user_id": str(current_user["_id"])}
    ).sort("created_at", -1).to_list(50)
    for m in meetings:
        m["id"] = str(m.pop("_id"))
    return meetings