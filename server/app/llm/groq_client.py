from groq import Groq
from app.config import settings

groq_client = Groq(api_key=settings.GROQ_API_KEY)

def simple_completion(system: str, user: str) -> str:
    resp = groq_client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {"role":"system","content":system},
            {"role":"user","content":user}
        ],
        temperature=0.2,
    )
    return resp.choices[0].message.content
