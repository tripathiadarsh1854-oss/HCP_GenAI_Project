from ...database import SessionLocal

def get_db_context():
    """Safely opens and closes a database context for standalone tool execution."""
    db = SessionLocal()
    try:
        return db
    except Exception as e:
        db.close()
        raise e