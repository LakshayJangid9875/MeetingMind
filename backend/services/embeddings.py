import chromadb
import os
from chromadb.config import Settings

# Initialize ChromaDB — stores vectors locally in a folder
CHROMA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "chroma_db")
CHROMA_DIR = os.path.abspath(CHROMA_DIR)

client     = chromadb.PersistentClient(path=CHROMA_DIR)
collection = client.get_or_create_collection(
    name="meetings",
    metadata={"hnsw:space": "cosine"}
)

def add_meeting_embedding(meeting_id: str, user_id: str, title: str, transcript: str, summary: str):
    """Store meeting text as vector embedding for semantic search."""
    try:
        text = f"Title: {title}\nSummary: {summary}\nTranscript: {transcript[:3000]}"
        collection.upsert(
            documents=[text],
            ids=[meeting_id],
            metadatas=[{"user_id": user_id, "title": title, "meeting_id": meeting_id}]
        )
        print(f"✅ Embedding stored for meeting {meeting_id}")
    except Exception as e:
        print(f"❌ Embedding failed: {e}")

def search_meetings(query: str, user_id: str, n_results: int = 5) -> list:
    """Search meetings using semantic similarity."""
    try:
        results = collection.query(
            query_texts=[query],
            n_results=n_results,
            where={"user_id": user_id}
        )
        meetings = []
        if results and results["ids"] and results["ids"][0]:
            for i, meeting_id in enumerate(results["ids"][0]):
                meetings.append({
                    "meeting_id": meeting_id,
                    "title":      results["metadatas"][0][i]["title"],
                    "score":      round(1 - results["distances"][0][i], 3),
                    "excerpt":    results["documents"][0][i][:200] + "..."
                })
        return meetings
    except Exception as e:
        print(f"❌ Search failed: {e}")
        return []