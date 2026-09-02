from fastapi import APIRouter, HTTPException, status
from app.database import get_database
from app.schemas import StoryItem
from typing import List

router = APIRouter(prefix="/api/stories", tags=["Wellness Stories"])

@router.get("", response_model=List[dict])
async def get_stories():
    db = get_database()
    stories = []
    cursor = db["stories"].find({}).limit(50)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        stories.append(doc)
    return stories

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_story(story: StoryItem):
    db = get_database()
    data = story.model_dump()
    result = await db["stories"].insert_one(data)
    return {
        "message": "Story created successfully",
        "id": str(result.inserted_id)
    }
