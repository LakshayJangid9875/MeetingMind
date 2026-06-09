import os
from notion_client import Client
from dotenv import load_dotenv

load_dotenv()

async def export_to_notion(meeting: dict) -> str:
    """Export meeting notes to Notion. Returns the created page URL."""
    try:
        notion = Client(auth=os.getenv("NOTION_API_KEY"))
        page_id = os.getenv("NOTION_PAGE_ID")

        if not page_id:
            raise Exception("NOTION_PAGE_ID not configured")

        if not os.getenv("NOTION_API_KEY"):
            raise Exception("NOTION_API_KEY not configured")

        action_items_text = "\n".join([
            f"• {item.get('task', 'Task')} — "
            f"{item.get('assigned_to', 'Unassigned')} "
            f"(Due: {item.get('deadline', 'Not specified')})"
            for item in meeting.get("action_items", [])
        ])

        decisions_text = "\n".join([
            f"• {d}" for d in meeting.get("decisions", [])
        ])

        response = notion.pages.create(
            parent={"page_id": page_id},
            properties={
                "title": {
                    "title": [{
                        "text": {
                            "content": meeting.get("title", "Untitled Meeting")
                        }
                    }]
                }
            },
            children=[
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {"rich_text": [{"text": {"content": "📋 Summary"}}]}
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"text": {"content": meeting.get("summary", "")}}]}
                },
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {"rich_text": [{"text": {"content": "✅ Action Items"}}]}
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"text": {"content": action_items_text or "None"}}]}
                },
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {"rich_text": [{"text": {"content": "🎯 Decisions"}}]}
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"text": {"content": decisions_text or "None"}}]}
                },
            ]
        )
        return response["url"]
    except Exception as e:
        print(f"❌ Notion export failed: {e}")
        raise