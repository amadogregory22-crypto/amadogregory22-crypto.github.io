import uuid
import cv2
import numpy as np
from pathlib import Path
from typing import List
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.schemas.analysis import CandidateComponentSchema
from app.core.logging import logger

class LogoDetector:
    @staticmethod
    def detect_candidate_logos(image_path: Path | str, text_boxes: List[CandidateComponentSchema]) -> List[CandidateComponentSchema]:
        """Détecte les zones graphiques/logos en isolant les régions denses sans texte."""
        candidates = []
        try:
            img = cv2.imread(str(image_path))
            if img is None:
                return candidates

            h, w, _ = img.shape
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            # Edge detection & contours
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)
            edges = cv2.Canny(blurred, 50, 150)
            
            # Dilate to connect edges
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7))
            dilated = cv2.dilate(edges, kernel, iterations=2)
            
            contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            # Filter contours by aspect ratio and size
            for cnt in contours:
                x, y, cw, ch = cv2.boundingRect(cnt)
                area = cw * ch
                
                # Minimum size threshold (e.g. at least 40x40 and at most 60% of card)
                if area > 1600 and cw < w * 0.8 and ch < h * 0.8:
                    # Check overlap with existing text boxes
                    overlaps_text = False
                    for tb in text_boxes:
                        tx, ty, tw, th = tb.bounds.x, tb.bounds.y, tb.bounds.width, tb.bounds.height
                        # Intersection
                        ix = max(x, tx)
                        iy = max(y, ty)
                        iw = max(0, min(x + cw, tx + tw) - ix)
                        ih = max(0, min(y + ch, ty + th) - iy)
                        intersection_area = iw * ih
                        if intersection_area > (area * 0.3):
                            overlaps_text = True
                            break
                    
                    if not overlaps_text:
                        candidates.append(CandidateComponentSchema(
                            id=str(uuid.uuid4()),
                            type="image",
                            semantic_type=SemanticTypeEnum.LOGO,
                            value="Logo détecté",
                            bounds=BoundingBoxSchema(
                                x=float(x),
                                y=float(y),
                                width=float(cw),
                                height=float(ch)
                            ),
                            confidence=0.75,
                            status=ComponentStatusEnum.REVIEW, # Logo is ALWAYS review by default as per spec
                            source_engine="vision_logo",
                            metadata={"area": area, "aspectRatio": round(cw / ch, 2)}
                        ))
        except Exception as e:
            logger.warning(f"Erreur LogoDetector: {e}")
            
        return candidates[:3]  # Limit to top 3 candidates to avoid noise
