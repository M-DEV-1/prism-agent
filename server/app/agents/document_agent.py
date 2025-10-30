def document_agent(state: dict) -> dict:
    print("DocumentAgent: generating sanction letter...")
    if state.get("decision") == "Approved":
        state["pdf_link"] = "https://dummy.link/sanction_letter.pdf"
    state["progress"].append("DocumentAgent completed")
    return state
