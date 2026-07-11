import json
from datetime import datetime
from langchain_core.tools import tool

from .db_utils import get_db_context
from ...models import ActionItem
from ...schemas import TaskStatus

@tool
def schedule_follow_up_tool(interaction_log_id: int, task_description: str, due_date: str) -> str:
    """Explicitly schedules an actionable task or calendar follow-up item tied to an interaction."""
    db = get_db_context()
    try:
        parsed_due_date = datetime.strptime(due_date, "%Y-%m-%d").date()
        new_task = ActionItem(
            interaction_log_id=interaction_log_id,
            task_description=task_description,
            due_date=parsed_due_date,
            status=TaskStatus.PENDING
        )
        db.add(new_task)
        db.commit()
        return json.dumps({"status": "success", "task_id": new_task.id, "message": "Task scheduled."})
    except Exception as e:
        db.rollback()
        return json.dumps({"status": "error", "message": str(e)})
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
        
        task.status = TaskStatus(new_status.lower())
        db.commit()
        return json.dumps({"status": "success", "message": f"Task {task_id} marked as {new_status}."})
    except Exception as e:
        db.rollback()
        return json.dumps({"status": "error", "message": str(e)})
    finally:
        db.close()