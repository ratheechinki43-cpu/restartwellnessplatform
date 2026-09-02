import logging
import certifi
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings

logger = logging.getLogger("uvicorn")

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_manager = Database()

async def connect_to_mongo():
    logger.info(f"Connecting to MongoDB Atlas at URI: {settings.MONGODB_URI.split('@')[-1] if '@' in settings.MONGODB_URI else 'localhost'}...")
    try:
        db_manager.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            tlsCAFile=certifi.where()
        )
        db_manager.db = db_manager.client[settings.MONGODB_DB_NAME]
        # Ping database to confirm connection
        await db_manager.client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB database: {settings.MONGODB_DB_NAME}")
    except Exception as e:
        logger.warning(f"Initial connection ping attempt returned: {str(e)}")
        # Do not block application startup completely if IP whitelist or temporary network check is pending
        logger.info("FastAPI service started. Database client initialized.")

async def close_mongo_connection():
    if db_manager.client:
        logger.info("Closing MongoDB connection...")
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_database() -> AsyncIOMotorDatabase:
    if db_manager.db is None:
        raise RuntimeError("Database connection has not been initialized.")
    return db_manager.db

async def check_db_health() -> dict:
    if db_manager.client is None:
        return {"status": "disconnected", "details": "Database client not initialized"}
    try:
        res = await db_manager.client.admin.command('ping')
        return {
            "status": "connected",
            "database_name": settings.MONGODB_DB_NAME,
            "ping_response": res
        }
    except Exception as e:
        return {"status": "error", "details": str(e)}
