def credit_agent(state: dict) -> dict:
    print("CreditAgent: calculating credit score...")
    state["credit_score"] = 750
    state["progress"].append("CreditAgent completed")
    return state
