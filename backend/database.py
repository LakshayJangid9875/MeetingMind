from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

client = None
db = None

async def connect_db():
    global client, db

    MONGODB_URL = os.getenv("MONGODB_URL")

    client = AsyncIOMotorClient(
        MONGODB_URL,
        serverSelectionTimeoutMS=30000,
        connectTimeoutMS=30000,
        socketTimeoutMS=30000
    )

    # Test connection
    await client.admin.command("ping")

    db = client.meetingmind

    print("✅ Connected to MongoDB Atlas")


async def close_db():
    global client

    if client:
        client.close()
        print("❌ MongoDB Connection Closed")


def get_db():
    return db