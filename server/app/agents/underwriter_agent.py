def underwriter_agent(state: dict) -> dict:
    print("UnderwriterAgent: making decision...")
    score = state.get("credit_score", 0)
    decision = "Approved" if score > 650 else "Rejected"
    state["decision"] = decision
    state["progress"].append("UnderwriterAgent completed")
    return state
