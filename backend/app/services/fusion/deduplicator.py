from typing import List
from app.schemas.analysis import CandidateComponentSchema
from app.schemas.common import ComponentStatusEnum, SemanticTypeEnum

class GeometricFusionEngine:
    @staticmethod
    def calculate_iou(boxA, boxB) -> float:
        # Determine (x, y)-coordinates of intersection rectangle
        xA = max(boxA.x, boxB.x)
        yA = max(boxA.y, boxB.y)
        xB = min(boxA.x + boxA.width, boxB.x + boxB.width)
        yB = min(boxA.y + boxA.height, boxB.y + boxB.height)

        interArea = max(0.0, xB - xA) * max(0.0, yB - yA)
        if interArea <= 0.0:
            return 0.0

        boxAArea = boxA.width * boxA.height
        boxBArea = boxB.width * boxB.height
        iou = interArea / float(boxAArea + boxBArea - interArea)
        return iou

    @classmethod
    def fuse_and_deduplicate(cls, candidates: List[CandidateComponentSchema]) -> List[CandidateComponentSchema]:
        """Fusionne et dédoublonne les composants candidats issus des différents détecteurs spécialisés."""
        if not candidates:
            return []

        # Sort by priority: QR > Confirmed OCR > Icons > Logos > Low confidence Text
        def get_priority(c: CandidateComponentSchema) -> int:
            if c.type == "qr" and c.status == ComponentStatusEnum.CONFIRMED:
                return 100
            if c.semantic_type in [SemanticTypeEnum.EMAIL, SemanticTypeEnum.PHONE, SemanticTypeEnum.MOBILE, SemanticTypeEnum.WEBSITE]:
                return 80
            if c.semantic_type == SemanticTypeEnum.SOCIAL_NETWORK:
                return 70
            if c.semantic_type == SemanticTypeEnum.ICON_CONTACT:
                return 65
            if c.semantic_type == SemanticTypeEnum.LOGO:
                return 60
            if c.semantic_type in [SemanticTypeEnum.NAME, SemanticTypeEnum.JOB_TITLE, SemanticTypeEnum.COMPANY]:
                return 50
            return int(c.confidence * 40)

        sorted_candidates = sorted(candidates, key=get_priority, reverse=True)
        final_list: List[CandidateComponentSchema] = []

        for cand in sorted_candidates:
            is_duplicate = False
            for existing in final_list:
                iou = cls.calculate_iou(cand.bounds, existing.bounds)
                # If high overlap (> 50%) or identical normalized text
                if iou > 0.50:
                    is_duplicate = True
                    break
                if cand.type == "text" and existing.type == "text":
                    if cand.value.strip().lower() == existing.value.strip().lower() and iou > 0.20:
                        is_duplicate = True
                        break

            if not is_duplicate:
                final_list.append(cand)

        # Re-sort visually: top to bottom, left to right
        final_list.sort(key=lambda c: (round(c.bounds.y / 20.0) * 20, c.bounds.x))
        return final_list
