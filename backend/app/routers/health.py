from fastapi import APIRouter
from app.database import check_db_health

router = APIRouter(prefix="/api/health", tags=["Health Check"])

@router.get("")
async def get_health():
    db_status = await check_db_health()
    return {
        "status": "ok" if db_status.get("status") == "connected" else "degraded",
        "database": db_status
    }
