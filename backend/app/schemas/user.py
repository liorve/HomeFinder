from typing import Optional
from pydantic import BaseModel, EmailStr

# Base Schema
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

# Schema for creating a user (Password is required)
class UserCreate(UserBase):
    password: str

# Schema for login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for updating a user
class UserUpdate(UserBase):
    password: Optional[str] = None

# Schema for returning user data (Password excluded)
class User(UserBase):
    id: int

    class Config:
        from_attributes = True
