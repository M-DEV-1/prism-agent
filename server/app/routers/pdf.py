from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
def generate_pdf():
    return {"status": "PDF generated (mock)"}
