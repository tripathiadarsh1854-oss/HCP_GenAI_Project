from app.database import SessionLocal
from sqlalchemy import text

def seed_database():
    db = SessionLocal()
    
    try:
        # Inserting data using your exact schema columns: name, specialty, and region
        db.execute(text("""
            INSERT INTO hcps (name, specialty, region) 
            VALUES 
            ('Dr. John Smith', 'Cardiology', 'Northeast'),
            ('Dr. Sarah Jenkins', 'Neurology', 'Southwest');
        """))
        
        db.commit()
        print("Database successfully seeded with Dr. Smith and Dr. Jenkins!")
    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()