from typing import Optional
from pydantic import BaseModel

class ListingBase(BaseModel):
    title: str
    location: str
    price: str
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

class ListingCreate(ListingBase):
    pass

class Listing(ListingBase):
    id: int
    
    class Config:
        from_attributes = True
