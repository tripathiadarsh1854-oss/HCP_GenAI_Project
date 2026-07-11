from .interaction_tools import log_interaction_tool, edit_interaction_tool, query_hcp_context_tool
from .task_tools import schedule_follow_up_tool, update_task_status_tool
from .content_tools import recommend_collateral_tool, draft_followup_email_tool

# This is the master list that graph.py will import!
AGENT_TOOLS = [
    log_interaction_tool,
    edit_interaction_tool,
    query_hcp_context_tool,
    schedule_follow_up_tool,
    update_task_status_tool,
    recommend_collateral_tool,
    draft_followup_email_tool
]