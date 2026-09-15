import datetime
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base

class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    source_image_id = Column(String(255), nullable=True)
    source_image_url = Column(String(1024), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    documents = relationship("DocumentModel", back_populates="project", cascade="all, delete-orphan")
    analysis_results = relationship("AnalysisResultModel", back_populates="project", cascade="all, delete-orphan")

class AnalysisResultModel(Base):
    __tablename__ = "analysis_results"

    id = Column(String(36), primary_key=True, index=True)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    image_id = Column(String(255), nullable=False)
    data = Column(JSON, nullable=False)  # Stores serialized AnalysisResultSchema
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    project = relationship("ProjectModel", back_populates="analysis_results")

class DocumentModel(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, index=True)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), default="Signature Standard")
    revision = Column(Integer, default=1)
    width = Column(Float, default=500.0)
    height = Column(Float, default=180.0)
    fields_data = Column(JSON, nullable=False)  # Stores DocumentFields
    elements_data = Column(JSON, nullable=False)  # Stores DocumentElements list
    theme_data = Column(JSON, nullable=False)
    settings_data = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    project = relationship("ProjectModel", back_populates="documents")

class AssetModel(Base):
    __tablename__ = "assets"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False, index=True)
    sub_category = Column(String(64), nullable=True)
    file_path = Column(String(1024), nullable=False)
    url = Column(String(1024), nullable=False)
    mime_type = Column(String(64), nullable=False)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    tags = Column(JSON, default=list)
    svg_content = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
