import logging
import os
from typing import Any, Dict, List

logger = logging.getLogger(__name__)

CHROMA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "chroma_db")
CHROMA_DIR = os.path.abspath(CHROMA_DIR)

_collection = None


def _get_collection():
    global _collection
    if _collection is not None:
        return _collection

    try:
        import chromadb
    except ImportError as exc:
        raise RuntimeError(
            "chromadb is required. Install with `pip install chromadb`."
        ) from exc

    os.makedirs(CHROMA_DIR, exist_ok=True)

    if hasattr(chromadb, "PersistentClient"):
        client = chromadb.PersistentClient(path=CHROMA_DIR)
    elif hasattr(chromadb, "Client"):
        client = chromadb.Client(path=CHROMA_DIR)
    else:
        raise RuntimeError("Unsupported chromadb version.")

    _collection = client.get_or_create_collection(
        name="meetings",
        metadata={"hnsw:space": "cosine"},
    )
    return _collection


def _build_document_text(title: str, summary: str, transcript: str) -> str:
    return f"Title: {title}\nSummary: {summary}\nTranscript: {transcript[:3000]}"


def add_meeting_embedding(
    meeting_id: str,
    user_id: str,
    title: str,
    transcript: str,
    summary: str,
) -> None:
    """Store meeting text as vector embedding for semantic search."""
    try:
        collection = _get_collection()
        text = _build_document_text(title, summary, transcript)
        collection.upsert(
            documents=[text],
            ids=[meeting_id],
            metadatas=[{"user_id": user_id, "title": title, "meeting_id": meeting_id}],
        )
        logger.info("Embedding stored for meeting %s", meeting_id)
    except Exception:
        logger.exception("Embedding failed for meeting %s", meeting_id)


def search_meetings(query: str, user_id: str, n_results: int = 5) -> List[Dict[str, Any]]:
    """Search meetings using semantic similarity."""
    try:
        collection = _get_collection()

        # Guard: if collection is empty, return early
        count = collection.count()
        if count == 0:
            return []

        # Don't request more results than exist
        actual_n = min(n_results, count)

        results = collection.query(
            query_texts=[query],
            n_results=actual_n,
            where={"user_id": user_id},
        )

        meetings = []
        if results and results.get("ids") and results["ids"][0]:
            for i, meeting_id in enumerate(results["ids"][0]):
                metadata = results["metadatas"][0][i] if results.get("metadatas") else {}
                distance = results["distances"][0][i] if results.get("distances") else 0.0
                document = results["documents"][0][i] if results.get("documents") else ""
                meetings.append({
                    "meeting_id": meeting_id,
                    "title":      metadata.get("title", ""),
                    "score":      round(1 - distance, 3),
                    "excerpt":    document[:200] + "...",
                })
        return meetings

    except Exception:
        logger.exception("Search failed for user %s", user_id)
        return []