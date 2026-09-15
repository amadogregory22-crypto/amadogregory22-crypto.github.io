from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema

class CandidateComponentSchema(BaseModel):
    id: str
    type: str  # 'text' | 'image' | 'qr' | 'shape' | 'icon'
    semantic_type: SemanticTypeEnum
    value: str
    bounds: BoundingBoxSchema
    confidence: float = Field(ge=0.0, le=1.0)
    status: ComponentStatusEnum
    source_engine: str
    metadata: Dict[str, Any] = Field(default_factory=dict)

class AnalysisResultSchema(BaseModel):
    image_id: str
    image_width: int
    image_height: int
    candidates: List[CandidateComponentSchema]
    dominant_colors: List[str]
    execution_time_ms: float

class ImageUploadResponse(BaseModel):
    image_id: str
    filename: str
    url: str
    width: int
    height: int
