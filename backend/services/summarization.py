import os
import json
from datetime import datetime
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

async def analyze_meeting(meeting_id: str, transcript: str, db) -> None:
    from bson import ObjectId

    try:
        prompt = f"""
You are an expert meeting analyst.

Analyze this meeting transcript and return ONLY valid JSON.

TRANSCRIPT:
{transcript}

Return this structure:
{{
  "summary": "",
  "key_points": [],
  "decisions": [],
  "action_items": [],
  "participants": [],
  "meeting_mood": ""
}}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini returns it
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]

        text = text.strip()

        data = json.loads(text)

        await db.meetings.update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {
                "status": "ready",
                "summary": data.get("summary", ""),
                "key_points": data.get("key_points", []),
                "decisions": data.get("decisions", []),
                "action_items": data.get("action_items", []),
                "participants": data.get("participants", []),
                "meeting_mood": data.get("meeting_mood", "neutral"),
                "analyzed_at": datetime.utcnow(),
            }}
        )

        print(f"✅ Analysis complete for meeting {meeting_id}")

    except Exception as e:
        import traceback
        traceback.print_exc()

        print(f"❌ Analysis failed for {meeting_id}: {e}")

        await db.meetings.update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {"status": "failed", "error": str(e)}}
        )