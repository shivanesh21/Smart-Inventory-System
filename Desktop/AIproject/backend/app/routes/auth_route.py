from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.user_model import User
from app.schemas.user_schema import (usercreate, userlogin)
from jose import jwt
from datetime import datetime, timedelta
import hashlib

router = APIRouter()
SECRET_KEY = "inventory_secret"
ALGORITHM = "HS256"
FIXED_PASSWORD = "inventoryofficial"

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hashlib.sha256(password.encode()).hexdigest() == hashed

@router.post("/register")
def register(user: usercreate, db: Session = Depends(get_db)):
    if user.password != FIXED_PASSWORD:
        raise HTTPException(status_code=400, detail="Password must be inventoryofficial")
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    return {
        "message": "User Registered"
    }

@router.post("/login")
def login(user: userlogin, db: Session = Depends(get_db)):
    if user.password != FIXED_PASSWORD:
        raise HTTPException(status_code=401, detail="Password must be inventoryofficial")
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid Username")
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid Password")
    token = jwt.encode(
        {"sub": db_user.username,
         "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"token": token}