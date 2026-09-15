import uuid
import cv2
import numpy as np
from pathlib import Path
from typing import List
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.schemas.analysis import CandidateComponentSchema
from app.core.logging import logger

class QrDetector:
    @staticmethod
    def detect_and_decode(image_path: Path | str) -> List[CandidateComponentSchema]:
        candidates = []
        try:
            img = cv2.imread(str(image_path))
            if img is None:
                return candidates

            h, w, _ = img.shape
            detector = cv2.QRCodeDetector()

            # 1. Multi-detection on original image
            retval, decoded_info, points, _ = detector.detectAndDecodeMulti(img)
            
            if retval and points is not None:
                for idx, text in enumerate(decoded_info):
                    pts = points[idx]
                    x_min = max(0.0, float(min(pts[:, 0])))
                    y_min = max(0.0, float(min(pts[:, 1])))
                    x_max = min(float(w), float(max(pts[:, 0])))
                    y_max = min(float(h), float(max(pts[:, 1])))

                    payload = text.strip() if text else ""
                    
                    # If naive decode didn't get text (e.g. because of central logo), try enhanced cropped decoding
                    if not payload and (x_max - x_min > 20) and (y_max - y_min > 20):
                        payload = QrDetector._try_enhanced_crop_decode(img, int(x_min), int(y_min), int(x_max - x_min), int(y_max - y_min))

                    decoded = bool(payload and len(payload) > 0)
                    confidence = 1.0 if decoded else 0.80
                    status = ComponentStatusEnum.CONFIRMED if decoded else ComponentStatusEnum.REVIEW
                    
                    candidates.append(CandidateComponentSchema(
                        id=str(uuid.uuid4()),
                        type="qr",
                        semantic_type=SemanticTypeEnum.QR_CODE,
                        value=payload if decoded else "QR Code (Logo central)",
                        bounds=BoundingBoxSchema(
                            x=x_min,
                            y=y_min,
                            width=x_max - x_min,
                            height=y_max - y_min
                        ),
                        confidence=confidence,
                        status=status,
                        source_engine="qr_detector",
                        metadata={
                            "decoded": decoded,
                            "payload": payload,
                            "points": pts.tolist()
                        }
                    ))
            else:
                # 2. Single detection fallback
                text, points, _ = detector.detectAndDecode(img)
                if points is not None and len(points) > 0:
                    pts = points[0]
                    x_min = max(0.0, float(min(pts[:, 0])))
                    y_min = max(0.0, float(min(pts[:, 1])))
                    x_max = min(float(w), float(max(pts[:, 0])))
                    y_max = min(float(h), float(max(pts[:, 1])))
                    
                    payload = text.strip() if text else ""
                    if not payload:
                        payload = QrDetector._try_enhanced_crop_decode(img, int(x_min), int(y_min), int(x_max - x_min), int(y_max - y_min))

                    decoded = bool(payload and len(payload) > 0)
                    candidates.append(CandidateComponentSchema(
                        id=str(uuid.uuid4()),
                        type="qr",
                        semantic_type=SemanticTypeEnum.QR_CODE,
                        value=payload if decoded else "QR Code (Logo central)",
                        bounds=BoundingBoxSchema(
                            x=x_min,
                            y=y_min,
                            width=x_max - x_min,
                            height=y_max - y_min
                        ),
                        confidence=1.0 if decoded else 0.80,
                        status=ComponentStatusEnum.CONFIRMED if decoded else ComponentStatusEnum.REVIEW,
                        source_engine="qr_detector",
                        metadata={"decoded": decoded, "payload": payload}
                    ))
        except Exception as e:
            logger.warning(f"Erreur Détecteur QR Code: {e}")
            
        return candidates

    @staticmethod
    def _try_enhanced_crop_decode(img: np.ndarray, x: int, y: int, w: int, h: int) -> str:
        """Tente un décodage multi-passes sur la région rognée du QR Code."""
        try:
            pad = int(min(w, h) * 0.1)
            img_h, img_w, _ = img.shape
            x1 = max(0, x - pad)
            y1 = max(0, y - pad)
            x2 = min(img_w, x + w + pad)
            y2 = min(img_h, y + h + pad)

            crop = img[y1:y2, x1:x2]
            if crop.size == 0:
                return ""

            gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
            detector = cv2.QRCodeDetector()

            # Attempt 1: Resize x2 for resolution
            resized = cv2.resize(gray, (w * 2, h * 2), interpolation=cv2.INTER_CUBIC)
            res1, _ = detector.decode(resized)
            if res1:
                return res1

            # Attempt 2: Otsu threshold
            _, otsu = cv2.threshold(resized, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            res2, _ = detector.decode(otsu)
            if res2:
                return res2

            # Attempt 3: Adaptive threshold
            adaptive = cv2.adaptiveThreshold(resized, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 2)
            res3, _ = detector.decode(adaptive)
            if res3:
                return res3

        except Exception:
            pass
        return ""
