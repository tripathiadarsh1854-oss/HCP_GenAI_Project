import json
from typing import List
from langchain_core.tools import tool

@tool
def recommend_collateral_tool(topics: List[str]) -> str:
    """Analyzes discussed topics and matches them against approved marketing collateral or product samples."""
    MARKETING_VAULT = {
        "oncoboost": [{"title": "OncoBoost Phase 3 PDF", "url": "https://vault/ob-phase3.pdf"}],
        "cardio": [{"title": "CardioShield Study", "url": "https://vault/cs-study.pdf"}]
    }
    
    recommendations = []
    normalized_topics = [t.lower() for t in topics]
    
    for product_key, assets in MARKETING_VAULT.items():
        if any(product_key in topic for topic in normalized_topics):
            recommendations.extend(assets)
            
    if not recommendations:
        recommendations.append({"title": "General Catalog", "url": "https://vault/general.pdf"})
        
    return json.dumps({"recommended_collateral": recommendations})

@tool
def draft_followup_email_tool(hcp_name: str, topics_discussed: List[str]) -> str:
    """Generates a professional follow-up email draft for the HCP based on the meeting topics."""
    topics_str = ", ".join(topics_discussed)
    
    email_draft = f"""
Subject: Follow-up from our recent meeting

Dear {hcp_name},

Thank you for taking the time to meet with me today. I really enjoyed our discussion regarding {topics_str}. 

I have attached the requested materials to this email. Please let me know if you or your staff have any further questions.

Best regards,
[Your Name]
"""
    return json.dumps({"status": "success", "email_draft": email_draft})