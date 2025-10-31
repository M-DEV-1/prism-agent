from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import asyncio

from app.agents.graph import build_graph

router = APIRouter()
graph = build_graph()

class ChatIn(BaseModel):
    application_id: str
    message: str

def guardrail(user_text: str) -> str:
    # convert this to a security guardrail
    if "aadhaar" in user_text.lower():
        return "For this demo we do not process Aadhaar. You can share PAN text only."
    return user_text

@router.post("/chat/stream")
async def chat_stream(body: ChatIn):
    user_text = guardrail(body.message)
    init_state = {
        "context_id": body.application_id,
        "messages": [{"role":"user","content": user_text}],
        "state": "GREET"
    }

    async def gen():
        # stream LangGraph node outputs as plain text chunks
        stream = graph.stream(init_state, {"configurable":{"thread_id": body.application_id}})
        async for event in stream:
            # pick the node that just ran (there will be 1 per event in this stub)
            for node_name, node_state in event.items():
                if not isinstance(node_state, dict): 
                    continue
                msgs = node_state.get("messages", [])
                # emit the last assistant message from that node, if any
                assistants = [m for m in msgs if m.get("role")=="assistant"]
                if assistants:
                    yield (assistants[-1]["content"] + "\n").encode()
            await asyncio.sleep(0)
        yield b"[END]\n"

    return StreamingResponse(gen(), media_type="text/plain")
