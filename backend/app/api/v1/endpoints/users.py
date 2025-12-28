from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from pydantic import ValidationError

from app import models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.schemas.token import TokenPayload

router = APIRouter()

# We need this strictly to give Swagger UI the "Authorize" button/header functionality
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login/access-token")

@router.get("/me", response_model=schemas.User)
def read_user_me(
    db: Session = Depends(deps.get_db),
    token: str = Depends(oauth2_scheme)
) -> Any:
    """
    Get current user (Manual implementation without nested dependencies).
    """
    # 1. Decode token
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
        
    # 2. Get user from DB
    user = db.query(models.User).filter(models.User.id == token_data.sub).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # 3. Check active
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    return user
