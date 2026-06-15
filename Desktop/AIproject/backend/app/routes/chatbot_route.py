from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.chatbot.chatbot_engine import OLLAMA_HOST, OLLAMA_MODEL, ask_ollama
from app.database.db import get_db

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chatbot(data: ChatRequest, db: Session = Depends(get_db)):
    response = ask_ollama(data.message, db)
    return {"response": response}


@router.get("/chat/status")
def chatbot_status():
    return {
        "agent": "ollama",
        "model": OLLAMA_MODEL,
        "host": OLLAMA_HOST,
        "endpoint": "/chat",
    }
