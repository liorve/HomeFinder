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
@router.get("/me", response_model=List[schemas.Listing])
def read_user_listings(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve current user's listings.
    """
    listings = (
        db.query(models.Listing)
        .filter(models.Listing.owner_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return listings

@router.put("/{id}", response_model=schemas.Listing)
def update_listing(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    listing_in: schemas.ListingUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a listing.
    """
    listing = db.query(models.Listing).filter(models.Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    update_data = listing_in.dict(exclude_unset=True)
    for field in update_data:
        setattr(listing, field, update_data[field])
    
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing

@router.delete("/{id}", response_model=schemas.Listing)
def delete_listing(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a listing.
    """
    listing = db.query(models.Listing).filter(models.Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    if listing.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    db.delete(listing)
    db.commit()
    return listing
