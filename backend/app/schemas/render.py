from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class RenderResponse(BaseModel):
    format: str
    html: str
    preview_url: Optional[str] = None
    warnings: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
