# agents/orchestrator.py
from .sales_agent import sales_agent
from .kyc_agent import kyc_agent
from .credit_agent import credit_agent
from .underwriter_agent import underwriter_agent
from .document_agent import document_agent

def run_workflow(user_input: str) -> dict:
    print(f"Starting workflow for: {user_input}")

    state = {"user_input": user_input, "progress": []}

    # Sequential agent flow
    state = sales_agent(state)
    state = kyc_agent(state)
    state = credit_agent(state)
    state = underwriter_agent(state)
    state = document_agent(state)

    print("Workflow complete.")
    return state
