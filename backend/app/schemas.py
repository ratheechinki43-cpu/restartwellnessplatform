from pydantic import BaseModel, Field, EmailStr
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

# --- User Auth Schemas ---

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, example="Elena Rostova")
    email: EmailStr = Field(..., example="elena@example.com")
    password: str = Field(..., min_length=6, example="secret123")

class UserLogin(BaseModel):
    email: EmailStr = Field(..., example="elena@example.com")
    password: str = Field(..., example="secret123")

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar: Optional[str] = None
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
