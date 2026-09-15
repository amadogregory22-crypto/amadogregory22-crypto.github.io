import uuid
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.models import AssetModel
from app.schemas.asset import AssetSchema

class AssetRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, asset: AssetSchema) -> AssetModel:
        record = AssetModel(
            id=asset.id or str(uuid.uuid4()),
            name=asset.name,
            category=asset.category,
            sub_category=asset.sub_category,
            file_path=asset.file_path,
            url=asset.url,
            mime_type=asset.mime_type,
            width=asset.width,
            height=asset.height,
            tags=asset.tags,
            svg_content=asset.svg_content
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def list_by_category(self, category: Optional[str] = None) -> List[AssetModel]:
        query = self.db.query(AssetModel)
        if category:
            query = query.filter(AssetModel.category == category)
        return query.order_by(AssetModel.name.asc()).all()

    def get_by_id(self, asset_id: str) -> Optional[AssetModel]:
        return self.db.query(AssetModel).filter(AssetModel.id == asset_id).first()
