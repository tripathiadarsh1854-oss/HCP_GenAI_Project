from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, Enum as SQLEnum, DateTime, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from .database import Base
from .schemas import Sentiment, TaskStatus # Importing the strict Enums we made earlier

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    specialty = Column(String(100))
    region = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # One-to-Many relationship: One HCP has many interaction logs
    interaction_logs = relationship(
        "InteractionLog", 
        back_populates="hcp", 
        cascade="all, delete-orphan"
    )


class InteractionLog(Base):
    __tablename__ = "interaction_logs"

    id = Column(Integer, primary_key=True, index=True)
    hcp_id = Column(Integer, ForeignKey("hcps.id", ondelete="CASCADE"), index=True, nullable=False)
    interaction_date = Column(Date, nullable=False)
    narrative_notes = Column(Text, nullable=False)
    
    # Using Postgres-specific ARRAY type for clean tagging
    topics = Column(ARRAY(String), server_default='{}')
    sentiment = Column(SQLEnum(Sentiment), nullable=False)
    summary = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    hcp = relationship("HCP", back_populates="interaction_logs")
    action_items = relationship(
        "ActionItem", 
        back_populates="interaction_log", 
        cascade="all, delete-orphan"
    )


class ActionItem(Base):
    __tablename__ = "action_items"

    id = Column(Integer, primary_key=True, index=True)
    interaction_log_id = Column(Integer, ForeignKey("interaction_logs.id", ondelete="CASCADE"), index=True, nullable=False)
    task_description = Column(Text, nullable=False)
    due_date = Column(Date)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.PENDING, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    interaction_log = relationship("InteractionLog", back_populates="action_items")