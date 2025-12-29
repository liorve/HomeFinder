from typing import List
from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
import uuid
import shutil

router = APIRouter()

UPLOAD_DIR = Path("uploads/listings")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@router.post("/", response_model=List[str])
async def upload_images(files: List[UploadFile] = File(...)):
    """
    Upload images for listings.
    Returns a list of URLs to the uploaded images.
    """
    uploaded_urls = []
    
    for file in files:
        # Validate file extension
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400, 
                detail=f"File type {file_ext} not allowed. Allowed types: {ALLOWED_EXTENSIONS}"
            )
        
        # Generate unique filename
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        try:
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
        finally:
            file.file.close()
        
        # Return URL path (relative to server)
        uploaded_urls.append(f"/uploads/listings/{unique_filename}")
    
    return uploaded_urls
