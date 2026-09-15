from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AssetSchema(BaseModel):
    id: str
    name: str
    category: str  # logos, icons, social, slogans, shapes
    sub_category: Optional[str] = None
    file_path: str
    url: str
    mime_type: str
    width: Optional[int] = None
    height: Optional[int] = None
    tags: List[str] = Field(default_factory=list)
    svg_content: Optional[str] = None

class RenderResponse(BaseModel):
    format: str
    html: str
    preview_url: Optional[str] = None
    warnings: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)

class ProjectSchema(BaseModel):
    id: str
    name: str
    source_image_id: Optional[str] = None
    source_image_url: Optional[str] = None
    current_document_id: Optional[str] = None
    created_at: str
    updated_at: str
