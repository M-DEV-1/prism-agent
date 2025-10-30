from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class CreditRequest(BaseModel):
    income: int
    loan_amount: int

class CreditResponse(BaseModel):
    credit_score: int

class KYCResponse(BaseModel):
    filename: str
    status: str
