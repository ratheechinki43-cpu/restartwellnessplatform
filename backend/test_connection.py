import asyncio
import os
import sys
from pathlib import Path

# Add backend directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, check_db_health

async def test_db():
    print("Testing MongoDB Atlas Connection...")
    print(f"Loaded URI snippet: {settings.MONGODB_URI[:30]}...")
    print(f"Target Database: {settings.MONGODB_DB_NAME}")
    
    try:
        await connect_to_mongo()
        health = await check_db_health()
        print(f"Health Check Status: {health}")
        await close_mongo_connection()
        print("Test completed successfully!")
    except Exception as e:
        print(f"Test failed with error: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())
