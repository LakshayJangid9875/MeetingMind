import whisper
import os
import asyncio
from datetime import datetime


model = None

def get_model():
    global model

    if model is None:
        print("📥 Loading Whisper model...")
        model = whisper.load_model("tiny")
        print("✅ Whisper model loaded")

    return model

async def transcribe_audio(file_path: str, meeting_id: str, db) -> None:
    from bson import ObjectId

    try:
        print(f"🚀 Background transcription started for {meeting_id}")
        await db.meetings.update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {"status": "transcribing"}}
        )

        # Normalize path for Windows
        fp = str(file_path).replace("\\", "/")
        print(f"🎵 Transcribing file: {fp}")
        print(f"📂 File exists: {os.path.exists(fp)}")

        import shutil
        print("FFmpeg path:", shutil.which("ffmpeg"))

        print("🚀 Starting transcription...")

        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: get_model().transcribe(fp, verbose=False)
        )

        print("✅ Transcription finished")

        transcript = result["text"].strip()
        segments   = result.get("segments", [])

        timestamped = []
        for seg in segments:
            start = int(seg["start"])
            mins  = start // 60
            secs  = start % 60
            timestamped.append(f"[{mins:02d}:{secs:02d}] {seg['text'].strip()}")

        timestamped_text = "\n".join(timestamped)

        await db.meetings.update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {
                "status":                 "processing",
                "transcript":             transcript,
                "transcript_timestamped": timestamped_text,
                "transcribed_at":         datetime.utcnow(),
            }}
        )

        print(f"✅ Transcription complete for meeting {meeting_id}")

        from .summarization import analyze_meeting
        print("🧠 Starting AI analysis...")

        await analyze_meeting(meeting_id, transcript, db)

        print("✅ AI analysis complete")

    except Exception as e:
        import traceback

        print(f"❌ Transcription failed for {meeting_id}")
        print(traceback.format_exc())

        await db.meetings.update_one(
            {"_id": ObjectId(meeting_id)},
            {
                "$set": {
                    "status": "failed",
                    "error": str(e)
                }
            }
        )

    finally:
        if os.path.exists(str(file_path)):
            os.remove(str(file_path))