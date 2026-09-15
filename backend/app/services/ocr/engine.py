import uuid
import pytesseract
from PIL import Image
from pathlib import Path
from typing import List
from app.core.config import settings
from app.core.logging import logger
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.schemas.analysis import CandidateComponentSchema

class OcrEngine:
    def __init__(self):
        if settings.TESSERACT_CMD:
            pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_CMD

    def extract_text_boxes(self, image_path: Path | str) -> List[CandidateComponentSchema]:
        """Extrait les blocs textuels avec leurs bounding boxes et scores de confiance via Tesseract."""
        candidates = []
        try:
            img = Image.open(image_path)
            # data structure: level, page_num, block_num, par_num, line_num, word_num, left, top, width, height, conf, text
            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT, lang='fra+eng')
            
            n_boxes = len(data['text'])
            # Group words by line_num & block_num to reconstruct continuous sentences/lines
            lines: dict[tuple[int, int], list[int]] = {}
            for i in range(n_boxes):
                text = data['text'][i].strip()
                conf = float(data['conf'][i])
                if text and conf > 20:
                    key = (data['block_num'][i], data['line_num'][i])
                    if key not in lines:
                        lines[key] = []
                    lines[key].append(i)

            for key, indices in lines.items():
                words = [data['text'][idx].strip() for idx in indices]
                confs = [float(data['conf'][idx]) / 100.0 for idx in indices]
                full_line = " ".join(words).strip()
                if not full_line:
                    continue

                x_min = min(data['left'][idx] for idx in indices)
                y_min = min(data['top'][idx] for idx in indices)
                x_max = max(data['left'][idx] + data['width'][idx] for idx in indices)
                y_max = max(data['top'][idx] + data['height'][idx] for idx in indices)
                avg_conf = sum(confs) / len(confs)

                candidates.append(CandidateComponentSchema(
                    id=str(uuid.uuid4()),
                    type="text",
                    semantic_type=SemanticTypeEnum.UNKNOWN,
                    value=full_line,
                    bounds=BoundingBoxSchema(
                        x=float(x_min),
                        y=float(y_min),
                        width=float(x_max - x_min),
                        height=float(y_max - y_min)
                    ),
                    confidence=round(avg_conf, 2),
                    status=ComponentStatusEnum.REVIEW,
                    source_engine="ocr",
                    metadata={"rawOcrText": full_line, "wordCount": len(words)}
                ))
        except Exception as e:
            logger.warning(f"Erreur OCR Tesseract: {e}")
            
        return candidates
