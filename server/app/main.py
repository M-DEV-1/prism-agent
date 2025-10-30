from fastapi import FastAPI
from app.routes import chat, form, session, reasoning, persona

app = FastAPI()
app.include_router(chat.router)
app.include_router(form.router)
app.include_router(session.router)
app.include_router(reasoning.router)
app.include_router(persona.router)