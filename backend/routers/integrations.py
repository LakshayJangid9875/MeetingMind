from fastapi import APIRouter, Depends, HTTPException
from utils.auth import get_current_user
from database import get_db
from bson import ObjectId

router = APIRouter()

@router.post("/notion/{meeting_id}")
async def export_to_notion(
    meeting_id: str,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    meeting = await db.meetings.find_one({
        "_id": ObjectId(meeting_id),
        "user_id": str(current_user["_id"])
    })
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting["id"] = str(meeting.pop("_id"))

    try:
        from services.notion_service import export_to_notion
        url = await export_to_notion(meeting)
        return {"success": True, "url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/jira/{meeting_id}")
async def export_to_jira(
    meeting_id: str,
    project_key: str = "MM",
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    meeting = await db.meetings.find_one({
        "_id": ObjectId(meeting_id),
        "user_id": str(current_user["_id"])
    })
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting["id"] = str(meeting.pop("_id"))

    try:
        from services.jira_service import create_jira_tickets
        tickets = await create_jira_tickets(meeting, project_key)
        return {"success": True, "tickets": tickets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))