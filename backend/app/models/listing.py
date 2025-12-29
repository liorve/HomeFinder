from sqlalchemy import Column, Integer, String, Boolean, Float, Text, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Listing(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    location = Column(String, index=True)
    price = Column(Integer)  
    type = Column(String)   # 'rent' or 'sale'
    rooms = Column(Integer) 
    sqm = Column(Integer)
    
    # Amenities
    ac = Column(Boolean, default=False)
    mamad = Column(Boolean, default=False)
    parking = Column(Boolean, default=False)
    balcony = Column(Boolean, default=False)
    furnished = Column(Boolean, default=False)
    
    # Location details
    lat = Column(Float)
    lng = Column(Float)
    
    description = Column(Text)
    images = Column(ARRAY(String), default=[])

    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="listings")
