from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.repositories.asset_repo import AssetRepository
from app.schemas.asset import AssetSchema

router = APIRouter(prefix="/assets", tags=["Bibliothèque d'Assets"])

@router.get("", response_model=List[AssetSchema])
def list_assets(category: Optional[str] = None, db: Session = Depends(get_db)):
    repo = AssetRepository(db)
    assets = repo.list_by_category(category)
    return [
        AssetSchema(
            id=a.id,
            name=a.name,
            category=a.category,
            sub_category=a.sub_category,
            file_path=a.file_path,
            url=a.url,
            mime_type=a.mime_type,
            width=a.width,
            height=a.height,
            tags=a.tags or [],
            svg_content=a.svg_content
        )
        for a in assets
    ]
