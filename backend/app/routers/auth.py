from fastapi import APIRouter, HTTPException, status, Header, Depends
from typing import Optional
from datetime import datetime
from bson import ObjectId

from app.database import get_database
from app.schemas import UserCreate, UserLogin, UserResponse, TokenResponse
from app.security import hash_password, verify_password, create_access_token, decode_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    db = get_database()
    users_col = db["users"]

    # Check if user already exists
    existing_user = await users_col.find_one({"email": user_in.email.lower()})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Hash password and create user doc
    now = datetime.utcnow()
    user_doc = {
        "name": user_in.name,
        "email": user_in.email.lower(),
        "password_hash": hash_password(user_in.password),
        "avatar": f"https://api.dicebear.com/7.x/bottts/svg?seed={user_in.name}",
        "created_at": now
    }
    
    result = await users_col.insert_one(user_doc)
    user_id = str(result.inserted_id)

    user_resp = UserResponse(
        id=user_id,
        name=user_doc["name"],
        email=user_doc["email"],
        avatar=user_doc["avatar"],
        created_at=now
    )

    token = create_access_token({"sub": user_id, "email": user_doc["email"]})

    return TokenResponse(access_token=token, token_type="bearer", user=user_resp)


@router.post("/login", response_model=TokenResponse)
async def login(user_in: UserLogin):
    db = get_database()
    users_col = db["users"]

    user_doc = await users_col.find_one({"email": user_in.email.lower()})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(user_in.password, user_doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user_id = str(user_doc["_id"])
    user_resp = UserResponse(
        id=user_id,
        name=user_doc["name"],
        email=user_doc["email"],
        avatar=user_doc.get("avatar", f"https://api.dicebear.com/7.x/bottts/svg?seed={user_doc['name']}"),
        created_at=user_doc.get("created_at", datetime.utcnow())
    )

    token = create_access_token({"sub": user_id, "email": user_doc["email"]})

    return TokenResponse(access_token=token, token_type="bearer", user=user_resp)


@router.get("/me", response_model=UserResponse)
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header"
        )

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    db = get_database()
    users_col = db["users"]

    try:
        user_doc = await users_col.find_one({"_id": ObjectId(payload["sub"])})
    except Exception:
        user_doc = None

    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return UserResponse(
        id=str(user_doc["_id"]),
        name=user_doc["name"],
        email=user_doc["email"],
        avatar=user_doc.get("avatar"),
        created_at=user_doc.get("created_at", datetime.utcnow())
    )
