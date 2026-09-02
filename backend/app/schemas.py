from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class StoryItem(BaseModel):
    title: str = Field(..., example="My Journey to Recovery")
    author: str = Field(..., example="Alex Johnson")
    content: str = Field(..., example="Detailed wellness journey story...")
    category: str = Field(default="Recovery", example="Recovery")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StoryItemResponse(StoryItem):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True
