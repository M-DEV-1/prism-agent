from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class CreditRequest(BaseModel):
    income: int
    loan_amount: int

@router.post("/score")
def credit_score(req: CreditRequest):
    score = min(900, int(req.income / req.loan_amount * 100 + 500))
    return {"credit_score": score}
