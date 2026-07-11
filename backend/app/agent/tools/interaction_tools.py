import json
from datetime import datetime
from typing import List, Optional
from langchain_core.tools import tool

from .db_utils import get_db_context
from ...models import HCP, InteractionLog, ActionItem
from ...schemas import Sentiment, TaskStatus

@tool
def log_interaction_tool(
    hcp_id: int, interaction_date: str, narrative_notes: str, 
    topics: List[str], sentiment: str, summary: str, 
    new_action_items: Optional[List[dict]] = None,
    hcp_name: Optional[str] = None,       
    interaction_time: Optional[str] = None 
) -> str:
    """Logs a brand new interaction touchpoint with a Healthcare Professional (HCP) into the CRM.
    
    Args:
        hcp_id: The integer ID of the HCP.
        interaction_date: Date in YYYY-MM-DD format.
        narrative_notes: Detailed notes from the meeting.
        topics: List of strings representing topics discussed.
        sentiment: Must be "positive", "neutral", or "negative".
        summary: A brief summary of the meeting.
        new_action_items: STRICTLY an Array of Dictionaries. Each dictionary MUST contain:
            - 'task_description' (string): What needs to be done.
            - 'due_date' (string): Date in YYYY-MM-DD format.
            Example: [{"task_description": "Send safety brochure", "due_date": "2026-07-17"}]
        hcp_name: The name of the doctor (e.g., "Dr. Smith"). Passed for UI context.
        interaction_time: The time of the meeting (e.g., "14:30" or "02:30 PM"). Passed for UI context.
    """
    db = get_db_context()
    try:
        parsed_date = datetime.strptime(interaction_date, "%Y-%m-%d").date()
        validated_sentiment = Sentiment(sentiment.lower())
        
        # We save the data to Postgres exactly as before (ignoring the name/time for the DB insert)
        db_log = InteractionLog(
            hcp_id=hcp_id, interaction_date=parsed_date, narrative_notes=narrative_notes,
            topics=topics, sentiment=validated_sentiment, summary=summary
        )
        db.add(db_log)
        db.flush() 
        
        created_tasks = []
        if new_action_items:
            for item in new_action_items:
                parsed_due_date = datetime.strptime(item['due_date'], "%Y-%m-%d").date() if item.get('due_date') else None
                db_item = ActionItem(
                    interaction_log_id=db_log.id, task_description=item['task_description'],
                    due_date=parsed_due_date, status=TaskStatus.PENDING
                )
                db.add(db_item)
                created_tasks.append(item['task_description'])
        
        db.commit()
        return json.dumps({"status": "success", "id": db_log.id, "message": "Interaction logged successfully."})
    except Exception as e:
        db.rollback()
        return json.dumps({"status": "error", "message": str(e)})
    finally:
        db.close()

@tool
def edit_interaction_tool(interaction_log_id: int, updates: dict) -> str:
    """Modifies an existing interaction log record in the database using a dictionary of changes."""
    db = get_db_context()
    try:
        db_log = db.query(InteractionLog).filter(InteractionLog.id == interaction_log_id).first()
        if not db_log:
            return json.dumps({"status": "error", "message": "Log not found."})
        
        if 'interaction_date' in updates:
            db_log.interaction_date = datetime.strptime(updates['interaction_date'], "%Y-%m-%d").date()
        if 'narrative_notes' in updates: db_log.narrative_notes = updates['narrative_notes']
        if 'topics' in updates: db_log.topics = updates['topics']
        if 'sentiment' in updates: db_log.sentiment = Sentiment(updates['sentiment'].lower())
        if 'summary' in updates: db_log.summary = updates['summary']
            
        db.commit()
        return json.dumps({"status": "success", "message": "Interaction updated."})
    except Exception as e:
        db.rollback()
        return json.dumps({"status": "error", "message": str(e)})
    finally:
        db.close()

@tool
def query_hcp_context_tool(hcp_id: int, limit: int = 3) -> str:
    """Retrieves history, past interaction briefs, and clinical sentiment profiles for a specific HCP."""
    db = get_db_context()
    try:
        hcp = db.query(HCP).filter(HCP.id == hcp_id).first()
        if not hcp: return json.dumps({"status": "error", "message": "HCP not found."})
            
        logs = db.query(InteractionLog).filter(InteractionLog.hcp_id == hcp_id).order_by(InteractionLog.interaction_date.desc()).limit(limit).all()
        history = [{"id": log.id, "date": str(log.interaction_date), "sentiment": log.sentiment.value} for log in logs]
            
        return json.dumps({"hcp_profile": {"name": hcp.name}, "recent_interactions": history})
    finally:
        db.close()

@tool
def update_task_status_tool(task_id: int, new_status: str) -> str:
    """Updates the status of a follow-up action item (e.g., 'completed', 'canceled')."""
    db = get_db_context()
    try:
        task = db.query(ActionItem).filter(ActionItem.id == task_id).first()
        if not task:
            return json.dumps({"status": "error", "message": "Task not found."})
        
        # Validates status against your Pydantic enum
        task.status = TaskStatus(new_status.lower())
        db.commit()
        return json.dumps({"status": "success", "message": f"Task {task_id} marked as {new_status}."})
    except Exception as e:
        db.rollback()
        return json.dumps({"status": "error", "message": str(e)})
    finally:
        db.close()

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