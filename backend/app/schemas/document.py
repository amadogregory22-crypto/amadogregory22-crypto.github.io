from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
from app.schemas.common import SemanticTypeEnum, BoundingBoxSchema

class ElementStyleSchema(BaseModel):
    font_family: Optional[str] = "Segoe UI, Arial, sans-serif"
    font_size: Optional[float] = 13.0
    font_weight: Optional[str] = "normal"
    font_style: Optional[str] = "normal"
    color: Optional[str] = "#333333"
    background_color: Optional[str] = "transparent"
    text_align: Optional[str] = "left"
    line_height: Optional[float] = 1.3
    letter_spacing: Optional[float] = 0.0
    border_color: Optional[str] = None
    border_width: Optional[float] = 0.0
    border_radius: Optional[float] = 0.0

class LinkSchema(BaseModel):
    url: str
    protocol: str = "https://"

class DocumentElementSchema(BaseModel):
    id: str
    type: str  # text, image, icon, qr, shape, divider
    semantic_type: SemanticTypeEnum
    field_binding: Optional[str] = None
    static_content: Optional[str] = None
    bounds: BoundingBoxSchema
    rotation: float = 0.0
    opacity: float = 1.0
    z_index: int = 0
    visible: bool = True
    locked: bool = False
    group_id: Optional[str] = None
    style: ElementStyleSchema = Field(default_factory=ElementStyleSchema)
    link: Optional[LinkSchema] = None
    asset_id: Optional[str] = None

class DocumentFieldsSchema(BaseModel):
    full_name: str = ""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None
    address: Optional[str] = None
    website: Optional[str] = None
    slogan: Optional[str] = None
    custom_fields: Dict[str, str] = Field(default_factory=dict)

class SignatureDocumentSchema(BaseModel):
    id: str
    project_id: str
    name: str = "Signature Standard"
    revision: int = 1
    width: float = 500.0
    height: float = 180.0
    fields: DocumentFieldsSchema = Field(default_factory=DocumentFieldsSchema)
    elements: List[DocumentElementSchema] = Field(default_factory=list)
    theme: Dict[str, str] = Field(default_factory=lambda: {
        "primary_color": "#005596",
        "secondary_color": "#7C878E",
        "text_color": "#222222",
        "background_color": "#FFFFFF",
        "font_family": "Segoe UI, Arial, sans-serif"
    })
    settings: Dict[str, Any] = Field(default_factory=lambda: {
        "outlook_compat_mode": "hybrid",
        "include_vcard": False,
        "table_align": "left"
    })

class BuildDocumentRequest(BaseModel):
    confirmed_candidate_ids: List[str]
    rejected_candidate_ids: List[str] = Field(default_factory=list)
    custom_overrides: Dict[str, Any] = Field(default_factory=dict)
