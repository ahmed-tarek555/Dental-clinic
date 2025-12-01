from database import SessionLocal
from models import User, ContactMessage, UploadedImage, Admin

db = SessionLocal()
db.query(User).delete()
db.query(ContactMessage).delete()
db.query(UploadedImage).delete()
db.query(Admin).delete()
db.commit()
db.close()

print("Database cleared")
