import uuid
import cv2
import numpy as np
from pathlib import Path
from typing import List
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.schemas.analysis import CandidateComponentSchema
from app.core.logging import logger

class IconSpatialMatcher:
    @staticmethod
    def match_icons_to_text(image_path: Path | str, text_candidates: List[CandidateComponentSchema]) -> List[CandidateComponentSchema]:
        """Détecte les petits pictogrammes situés immédiatement à gauche des éléments de contact."""
        icon_candidates = []
        try:
            img = cv2.imread(str(image_path))
            if img is None:
                return icon_candidates

            for tc in text_candidates:
                # If component is email, phone, mobile, website, address
                if tc.semantic_type in [SemanticTypeEnum.EMAIL, SemanticTypeEnum.PHONE, SemanticTypeEnum.MOBILE, SemanticTypeEnum.WEBSITE, SemanticTypeEnum.ADDRESS]:
                    tx, ty, tw, th = tc.bounds.x, tc.bounds.y, tc.bounds.width, tc.bounds.height
                    
                    # Search area immediately to the left: [tx - th*2, ty, th*1.5, th]
                    search_x = max(0, int(tx - th * 2.5))
                    search_w = int(tx - search_x)
                    search_y = max(0, int(ty - 4))
                    search_h = int(th + 8)

                    if search_w > 10 and search_h > 10:
                        roi = img[search_y:search_y+search_h, search_x:search_x+search_w]
                        if roi.size > 0:
                            gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
                            _, thresh = cv2.threshold(gray_roi, 200, 255, cv2.THRESH_BINARY_INV)
                            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                            
                            for cnt in contours:
                                cx, cy, cw, ch = cv2.boundingRect(cnt)
                                # Square-ish icon ratio
                                if 8 <= cw <= 35 and 8 <= ch <= 35 and 0.5 <= cw/ch <= 2.0:
                                    icon_candidates.append(CandidateComponentSchema(
                                        id=str(uuid.uuid4()),
                                        type="icon",
                                        semantic_type=SemanticTypeEnum.ICON_CONTACT,
                                        value=f"Icône {tc.semantic_type.value}",
                                        bounds=BoundingBoxSchema(
                                            x=float(search_x + cx),
                                            y=float(search_y + cy),
                                            width=float(cw),
                                            height=float(ch)
                                        ),
                                        confidence=0.88,
                                        status=ComponentStatusEnum.REVIEW,
                                        source_engine="vision_icon",
                                        metadata={"associatedTo": tc.id, "contactType": tc.semantic_type.value}
                                    ))
                                    break
        except Exception as e:
            logger.warning(f"Erreur IconSpatialMatcher: {e}")
            
        return icon_candidates
