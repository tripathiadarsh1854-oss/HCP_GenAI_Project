import os
from typing import Literal
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode
# 1. Import the official in-memory state cache checkpointer
from langgraph.checkpoint.memory import MemorySaver
from dotenv import load_dotenv

load_dotenv()

# Import custom State and Tools
from .state import AgentState
from .tools import AGENT_TOOLS

# 2. Initialize the Groq LLM
llm = ChatGroq(
    model="llama-3.1-8b-instant",  
    temperature=0.1, 
    max_tokens=1024,
)

# 3. Bind the tools to the LLM 
llm_with_tools = llm.bind_tools(AGENT_TOOLS)

# 4. Define the System Prompt (The AI's Persona & Rules)
system_prompt = """You are a highly capable and friendly CRM assistant for medical sales representatives. 
Your job is to help reps log meetings, edit notes, and schedule follow-ups with Healthcare Professionals (HCPs).

Follow these rules strictly:
1. If the user provides meeting notes, use the 'log_interaction_tool' to save them.
2. If the user asks to change existing data, use the 'edit_interaction_tool'.
3. Do not invent or hallucinate dates, names, or sentiments. Only use what the user provides.
4. Whenever you successfully log a meeting or update a record, respond with a natural, conversational confirmation. Example: "I've successfully updated Dr. Smith's sentiment to neutral for you!"
5. NEVER say "Please provide the next instruction" or sound robotic."""

prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    MessagesPlaceholder(variable_name="messages"),
])

# --- NODE DEFINITIONS ---

def call_model(state: AgentState) -> dict:
    """Invokes the LLM to decide the next action or respond to the user."""
    prompt = prompt_template.invoke({"messages": state["messages"]})
    response = llm_with_tools.invoke(prompt)
    
    # Return the new message to be appended to the state
    return {"messages": [response]}

# We use LangGraph's highly optimized pre-built ToolNode to execute our tools
tool_node = ToolNode(AGENT_TOOLS)

def should_continue(state: AgentState) -> Literal["tools", END]:
    """Determines if the LLM decided to call a tool, or if it is finished responding."""
    last_message = state["messages"][-1]
    
    # If the LLM generated a tool call, route to the 'tools' node
    if last_message.tool_calls:
        return "tools"

    return END


# --- GRAPH COMPILATION ---

# 5. Initialize the built-in memory checkpointer instance outside the function
memory_cache = MemorySaver()

def build_graph():
    """Assembles the nodes and edges into a compiled state machine."""
    workflow = StateGraph(AgentState)
    
    # Add our two main nodes
    workflow.add_node("agent", call_model)
    workflow.add_node("tools", tool_node)
    
    # Define the flow (Edges)
    workflow.add_edge(START, "agent")
    
    # Conditional edge: After the agent thinks, does it use a tool or stop?
    workflow.add_conditional_edges(
        "agent",
        should_continue,
    )
    
    # After a tool finishes executing, ALWAYS go back to the agent to summarize the result
    workflow.add_edge("tools", "agent")
    
    # 6. Compile the graph passing the checkpointer to activate conversational memory
    return workflow.compile(checkpointer=memory_cache)

# Export the compiled agent so FastAPI can use it
crm_agent = build_graph()