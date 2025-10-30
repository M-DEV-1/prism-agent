# agents/sales_agent.py
def sales_agent(state: dict) -> dict:
    print("SalesAgent: collecting user info...")
    state["sales_info"] = {"name": "Test User", "amount": 50000}
    state["progress"].append("SalesAgent completed")
    return state
