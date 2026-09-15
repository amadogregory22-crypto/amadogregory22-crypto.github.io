import uuid
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.models import ProjectModel, AnalysisResultModel
from app.schemas.asset import ProjectSchema

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, name: str, source_image_id: Optional[str] = None, source_image_url: Optional[str] = None) -> ProjectModel:
        project_id = str(uuid.uuid4())
        project = ProjectModel(
            id=project_id,
            name=name,
            source_image_id=source_image_id,
            source_image_url=source_image_url
        )
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def get_by_id(self, project_id: str) -> Optional[ProjectModel]:
        return self.db.query(ProjectModel).filter(ProjectModel.id == project_id).first()

    def list_all(self, limit: int = 50, skip: int = 0) -> List[ProjectModel]:
        return self.db.query(ProjectModel).order_by(ProjectModel.updated_at.desc()).offset(skip).limit(limit).all()

    def save_analysis(self, project_id: str, image_id: str, analysis_data: dict) -> AnalysisResultModel:
        analysis_id = str(uuid.uuid4())
        record = AnalysisResultModel(
            id=analysis_id,
            project_id=project_id,
            image_id=image_id,
            data=analysis_data
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def get_latest_analysis(self, project_id: str) -> Optional[AnalysisResultModel]:
        return self.db.query(AnalysisResultModel)\
            .filter(AnalysisResultModel.project_id == project_id)\
            .order_by(AnalysisResultModel.created_at.desc())\
            .first()
