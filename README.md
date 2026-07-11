# AI CRM Agent for Healthcare Professionals

Overview
This project is an AI-first CRM designed for medical sales representatives. It features a React-based UI where users can chat with an autonomous LangGraph-powered AI agent. The agent uses Server-Sent Events to stream data and auto-fill a controlled form, pushing validated data directly into a PostgreSQL database.

Tech Stack
* Frontend: React.js, Tailwind CSS, Redux Toolkit
* Backend: Python, FastAPI, SQLAlchemy
* AI Framework: LangGraph, LangChain, Groq
* Database: PostgreSQL

Key Features
* Agentic Auto-Fill: The AI extracts entities from natural language chat and populates the React form.
* Autonomous Error Recovery: Strict database constraints prevent bad data. If the AI makes a mistake, it reads the SQL error and asks the user for the correct information.
* Real-time Streaming: Uses FastAPI to stream agent thoughts and tool executions directly to the UI.

How to Run the Project

Backend Setup
1. Open a terminal in the backend directory.
2. Create a virtual environment: python -m venv venv
3. Activate the virtual environment.
4. Install dependencies: pip install -r requirements.txt
5. Update your database URL and API keys in the .env file.
6. Start the server: uvicorn app.main:app --reload

Frontend Setup
1. Open a terminal in the frontend directory.
2. Install dependencies: npm install
3. Start the development server: npm run dev
4. Open the localhost link in your browser.

LangGraph Agent Tools
1. log_interaction_tool: Saves new meeting records to the database.
2. edit_interaction_tool: Modifies existing records based on user chat.
3. query_hcp_context_tool: Fetches past interaction history for a specific doctor.
4. schedule_follow_up_tool: Creates new action items and tasks.
5. update_task_status_tool: Changes the status of existing tasks.
6. recommend_collateral_tool: Suggests marketing materials based on the chat.
7. draft_followup_email_tool: Generates professional email drafts based on meeting notes.