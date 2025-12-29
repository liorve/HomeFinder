from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Listing])
def read_listings(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve listings.
    """
    listings = db.query(models.Listing).offset(skip).limit(limit).all()
    return listings

@router.post("/", response_model=schemas.Listing)
def create_listing(
    *,
    db: Session = Depends(deps.get_db),
    listing_in: schemas.ListingCreate,
    current_user: models.User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Create new listing.
    """
    listing = models.Listing(**listing_in.dict(), owner_id=current_user.id)
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing
