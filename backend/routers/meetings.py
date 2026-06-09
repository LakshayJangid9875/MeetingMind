import os
import uuid
import asyncio
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from utils.auth import get_current_user
from database import get_db
from datetime import datetime
from bson import ObjectId

router = APIRouter()

# Use absolute path for uploads folder
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")
UPLOAD_DIR = os.path.abspath(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR, exist_ok=True)

print(f"📁 Upload directory: {UPLOAD_DIR}")

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".mp4"}

@router.post("/upload", status_code=201)
async def upload_meeting(
    file:  UploadFile = File(...),
    title: str        = Form(...),
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only MP3, WAV, MP4 files allowed")

    filename  = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    print(f"💾 Saving file to: {file_path}")

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    print(f"✅ File saved: {os.path.exists(file_path)}")

    meeting_doc = {
        "user_id":      str(current_user["_id"]),
        "title":        title,
        "status":       "queued",
        "filename":     filename,
        "file_path":    file_path,
        "created_at":   datetime.utcnow(),
        "transcript":   None,
        "summary":      None,
        "key_points":   [],
        "decisions":    [],
        "action_items": [],
        "participants": [],
    }

    result     = await db.meetings.insert_one(meeting_doc)
    meeting_id = str(result.inserted_id)

    asyncio.create_task(
        transcribe_in_background(file_path, meeting_id, db)
    )

    return {"id": meeting_id, "title": title, "status": "uploading"}


async def transcribe_in_background(file_path, meeting_id, db):
    print(f"🚀 Background task started: {meeting_id}")

    from services.transcription import transcribe_audio

    await transcribe_audio(file_path, meeting_id, db)

    print(f"✅ Background task finished: {meeting_id}")


@router.get("/")
async def list_meetings(
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    meetings = await db.meetings.find(
        {"user_id": str(current_user["_id"])}
    ).sort("created_at", -1).to_list(50)

    for m in meetings:
        m["id"] = str(m.pop("_id"))
    return meetings


@router.get("/{meeting_id}")
async def get_meeting(
    meeting_id: str,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    meeting = await db.meetings.find_one({
        "_id":     ObjectId(meeting_id),
        "user_id": str(current_user["_id"])
    })

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting["id"] = str(meeting.pop("_id"))
    return meeting