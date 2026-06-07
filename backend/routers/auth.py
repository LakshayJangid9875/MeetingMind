from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from utils.auth import hash_password, verify_password, create_access_token
from database import get_db
from datetime import datetime

router = APIRouter()

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", status_code=201)
async def register(data: UserRegister, db=Depends(get_db)):
    if await db.users.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    user_doc = {
        "name":       data.name,
        "email":      data.email,
        "password":   hash_password(data.password),
        "plan":       "free",
        "created_at": datetime.utcnow(),
    }

    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    token = create_access_token({"sub": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id":         user_id,
            "name":       data.name,
            "email":      data.email,
            "plan":       "free",
        }
    }

@router.post("/login")
async def login(data: UserLogin, db=Depends(get_db)):
    user = await db.users.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_id = str(user["_id"])
    token = create_access_token({"sub": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id":    user_id,
            "name":  user["name"],
            "email": user["email"],
            "plan":  user.get("plan", "free"),
        }
    }