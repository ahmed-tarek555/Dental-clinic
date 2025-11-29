from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    name: str
    email: str
    password: constr(min_length=1, max_length=72)
    date: str
    time: str
    reason: str | None = None

class LoginData(BaseModel):
    email: str
    password: str

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str
