import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from httpx import AsyncClient, ASGITransport
from app.main import app

async def test_fastapi_routes():
    print("Testing FastAPI app routes using ASGI client with lifespan...")
    # Trigger FastAPI lifespan events
    async with app.router.lifespan_context(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.get("/")
            print(f"GET / -> Status {response.status_code}, Response: {response.json()}")
            
            health_resp = await client.get("/api/health")
            print(f"GET /api/health -> Status {health_resp.status_code}, Response: {health_resp.json()}")

if __name__ == "__main__":
    asyncio.run(test_fastapi_routes())
