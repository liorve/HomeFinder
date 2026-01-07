from typing import Optional, List
from pydantic import BaseModel

class ListingBase(BaseModel):
    title: str
    location: str
    price: int
    type: str  # rent/sale
    rooms: int
    sqm: int
    
    # Amenities
    ac: bool = False
    mamad: bool = False
    parking: bool = False
    balcony: bool = False
    furnished: bool = False
    
    # Location
    lat: float
    lng: float
    
    description: Optional[str] = None
    images: List[str] = []

class ListingCreate(ListingBase):
    pass

class ListingUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    price: Optional[int] = None
    type: Optional[str] = None
    rooms: Optional[int] = None
    sqm: Optional[int] = None
    ac: Optional[bool] = None
    mamad: Optional[bool] = None
    parking: Optional[bool] = None
    balcony: Optional[bool] = None
    furnished: Optional[bool] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None

class Listing(ListingBase):
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True
