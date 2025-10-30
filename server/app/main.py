# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routers import chat, kyc, credit, pdf

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
app.include_router(kyc.router, prefix="/kyc", tags=["KYC"])
app.include_router(credit.router, prefix="/credit", tags=["Credit"])
app.include_router(pdf.router, prefix="/pdf", tags=["PDF"])

@app.get("/")
def root():
    return {"message": "Prism Agent backend running 🚀"}
