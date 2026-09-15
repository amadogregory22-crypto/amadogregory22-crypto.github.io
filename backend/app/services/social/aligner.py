import uuid
import cv2
import numpy as np
from pathlib import Path
from typing import List, Optional
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.schemas.analysis import CandidateComponentSchema
from app.core.logging import logger

class SocialAligner:
    # Known icon patterns / colors / aspect ratios
    KNOWN_NETWORKS = ["LinkedIn", "Instagram", "Facebook", "YouTube", "WhatsApp", "X (Twitter)"]

    @classmethod
    def detect_social_rows(
        cls,
        image_path: Path | str,
        text_boxes: Optional[List[CandidateComponentSchema]] = None
    ) -> List[CandidateComponentSchema]:
        """Détecte les rangées réelles d'icônes de réseaux sociaux avec régularité spatiale stricte."""
        social_candidates = []
        try:
            img = cv2.imread(str(image_path))
            if img is None:
                return social_candidates

            h, w, _ = img.shape
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Use thresholding to find solid icons/circles
            _, thresh = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY_INV)
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            candidate_icons = []
            for cnt in contours:
                x, y, cw, ch = cv2.boundingRect(cnt)
                area = cv2.contourArea(cnt)
                if area < 80:
                    continue

                # 1. Size range: between 14px and 45px
                if not (14 <= cw <= 50 and 14 <= ch <= 50):
                    continue

                # 2. Strict aspect ratio: nearly square or circular (0.80 to 1.25)
                ratio = cw / float(ch)
                if not (0.80 <= ratio <= 1.25):
                    continue

                # 3. Shape compactness: solidity or circularity
                hull = cv2.convexHull(cnt)
                hull_area = cv2.contourArea(hull)
                solidity = float(area) / hull_area if hull_area > 0 else 0
                if solidity < 0.65:
                    continue

                # 4. Check that this icon does NOT overlap any existing text box
                overlaps_text = False
                if text_boxes:
                    for tb in text_boxes:
                        tx, ty, tw, th = tb.bounds.x, tb.bounds.y, tb.bounds.width, tb.bounds.height
                        ix = max(x, tx)
                        iy = max(y, ty)
                        iw = max(0, min(x + cw, tx + tw) - ix)
                        ih = max(0, min(y + ch, ty + th) - iy)
                        if (iw * ih) > (cw * ch * 0.2):
                            overlaps_text = True
                            break

                if not overlaps_text:
                    candidate_icons.append((x, y, cw, ch, area))

            if len(candidate_icons) < 2:
                return social_candidates

            # Sort by Y position
            candidate_icons.sort(key=lambda b: (b[1], b[0]))

            # Group into horizontal rows (within 6px Y variance and 4px height variance)
            rows: list[list[tuple[int, int, int, int, float]]] = []
            for box in candidate_icons:
                placed = False
                for row in rows:
                    y_diff = abs(row[0][1] - box[1])
                    h_diff = abs(row[0][3] - box[3])
                    w_diff = abs(row[0][2] - box[2])
                    if y_diff <= 6 and h_diff <= 5 and w_diff <= 5:
                        row.append(box)
                        placed = True
                        break
                if not placed:
                    rows.append([box])

            # Filter valid social rows:
            # Must have at least 3 aligned icons OR 2 icons with very clean regular spacing
            for row in rows:
                if len(row) >= 3:
                    # Sort left to right
                    row.sort(key=lambda b: b[0])
                    
                    # Check spacing regularity
                    spacings = [row[i+1][0] - (row[i][0] + row[i][2]) for i in range(len(row)-1)]
                    avg_spacing = sum(spacings) / len(spacings)
                    
                    # Spacing between icons must be reasonable (between 2px and 35px)
                    if not (2 <= avg_spacing <= 35):
                        continue
                    
                    # Variance in spacing
                    spacing_variance = max(abs(s - avg_spacing) for s in spacings) if spacings else 0
                    if spacing_variance > 15:
                        continue

                    row_id = str(uuid.uuid4())
                    for idx, (x, y, cw, ch, _) in enumerate(row):
                        # Name guessing by standard position if available
                        guessed_name = cls.KNOWN_NETWORKS[idx] if idx < len(cls.KNOWN_NETWORKS) else f"Réseau #{idx+1}"

                        social_candidates.append(CandidateComponentSchema(
                            id=str(uuid.uuid4()),
                            type="icon",
                            semantic_type=SemanticTypeEnum.SOCIAL_NETWORK,
                            value=guessed_name,
                            bounds=BoundingBoxSchema(
                                x=float(x),
                                y=float(y),
                                width=float(cw),
                                height=float(ch)
                            ),
                            confidence=0.90,
                            status=ComponentStatusEnum.REVIEW,
                            source_engine="vision_social_aligner",
                            metadata={
                                "isRowMember": True,
                                "rowGroupId": row_id,
                                "rowIndex": idx,
                                "socialNetworkName": guessed_name
                            }
                        ))
        except Exception as e:
            logger.warning(f"Erreur SocialAligner: {e}")

        return social_candidates
