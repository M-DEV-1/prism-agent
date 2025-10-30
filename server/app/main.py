from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes import chat, form, session, reasoning, persona

load_dotenv()

app = FastAPI(title="Prism Agent API", version="0.1.0")

# Allow local frontend
origins = ["http://localhost:3000", "https://your-vercel-app.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(form.router, prefix="/form", tags=["Form"])
app.include_router(session.router, prefix="/session", tags=["Session"])
app.include_router(reasoning.router)
app.include_router(persona.router)

@app.get("/")
def root():
    return {"message": "Prism Agent backend running 🚀"}