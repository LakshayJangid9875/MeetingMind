import os
from jira import JIRA
from dotenv import load_dotenv

load_dotenv()

async def create_jira_tickets(meeting: dict, project_key: str) -> list:
    """Create Jira tickets for each action item in the meeting."""
    try:
        if not os.getenv("JIRA_URL"):
            raise Exception("JIRA_URL not configured")

        if not os.getenv("JIRA_EMAIL"):
            raise Exception("JIRA_EMAIL not configured")

        if not os.getenv("JIRA_API_TOKEN"):
            raise Exception("JIRA_API_TOKEN not configured")


        jira = JIRA(
            server=os.getenv("JIRA_URL"),
            basic_auth=(os.getenv("JIRA_EMAIL"), os.getenv("JIRA_API_TOKEN"))
        )

        created = []
        for item in meeting.get("action_items", []):
            issue = jira.create_issue(
                project=project_key,
                summary=item.get("task", "Action Item"),
                description=(
                    f"Assigned to: {item.get('assigned_to', 'Unassigned')}\n"
                    f"Deadline: {item.get('deadline', 'Not specified')}\n"
                    f"From meeting: {meeting.get('title', 'Meeting')}"
                ),
                issuetype={"name": "Task"},
            )
            created.append({"key": issue.key, "url": f"{os.getenv('JIRA_URL')}/browse/{issue.key}"})

        return created
    except Exception as e:
        print(f"❌ Jira export failed: {e}")
        raise