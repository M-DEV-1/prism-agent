# routers/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.orchestrator import run_workflow

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat_endpoint(req: ChatRequest):
    result = run_workflow(req.message)
    return {
        "message": req.message,
        "decision": result.get("decision"),
        "credit_score": result.get("credit_score"),
        "kyc_verified": result.get("kyc_verified"),
        "pdf_link": result.get("pdf_link"),
        "progress": result.get("progress"),
    }
