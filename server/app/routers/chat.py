from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat_endpoint(req: ChatRequest):
    return {"response": f"Agent heard: {req.message}"}
