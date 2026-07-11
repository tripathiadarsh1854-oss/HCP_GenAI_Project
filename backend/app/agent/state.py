from typing import Annotated, TypedDict, Optional, Dict, Any
from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """
    Represents the complete state of the CRM Assistant at any point in time.
    """
    # The chat history between the rep and the AI. 
    # 'add_messages' ensures new messages are appended to the list.
    messages: Annotated[list[AnyMessage], add_messages]
    
    # Contextual data to keep the AI focused
    active_hcp_id: Optional[int]
    
    # The current state of the React frontend form.
    # The AI reads this so it doesn't overwrite data the user manually typed.
    current_form_state: Dict[str, Any]