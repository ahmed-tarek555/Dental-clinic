from database import SessionLocal
from sqlalchemy.orm import Session
from models import Admin
from routers.auth import hash_password
import sys

username = "ahmed"
password = "010"

db: Session = SessionLocal()

admin = db.query(Admin).filter(Admin.username == username).first()
if admin:
    print("Admin already exist")
    sys.exit()
hashed_password = hash_password(password)
new_admin = Admin(username=username,
                password=hashed_password)
db.add(new_admin)
db.commit()
db.refresh(new_admin)
print(f"Admin {new_admin.username} added successfully")
db.close()
