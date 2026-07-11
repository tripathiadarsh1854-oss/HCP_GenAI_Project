import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# In production, this comes from your .env file.
# We provide a default string here for local testing.
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:2204@127.0.0.1:5432/genai_hcp"
)

# Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our SQLAlchemy models
Base = declarative_base()

# FastAPI Dependency
# This ensures database connections are opened and closed cleanly per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()