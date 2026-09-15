import uuid
import time
import shutil
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.config import settings
from app.api.deps import get_db
from app.schemas.analysis import ImageUploadResponse, AnalysisResultSchema
from app.services.image_processing.processor import ImageProcessor
from app.services.ocr.engine import OcrEngine
from app.services.qr.detector import QrDetector
from app.services.classification.heuristics import SemanticClassifier
from app.services.logos.detector import LogoDetector
from app.services.icons.spatial import IconSpatialMatcher
from app.services.social.aligner import SocialAligner
from app.services.fusion.deduplicator import GeometricFusionEngine

router = APIRouter(prefix="/images", tags=["Images & Analyse"])

@router.post("/upload", response_model=ImageUploadResponse)
async def upload_image(file: UploadFile = File(...)):
    """Upload d'une image source de carte de visite ou ancienne signature."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Le fichier fourni doit être une image.")

    image_id = str(uuid.uuid4())
    suffix = Path(file.filename or "image.png").suffix or ".png"
    target_filename = f"{image_id}{suffix}"
    target_path = settings.UPLOADS_DIR / target_filename

    with open(target_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    width, height = ImageProcessor.get_dimensions(target_path)

    return ImageUploadResponse(
        image_id=image_id,
        filename=target_filename,
        url=f"/static/uploads/{target_filename}",
        width=width,
        height=height
    )

@router.post("/{image_id}/analyze", response_model=AnalysisResultSchema)
def analyze_image(image_id: str):
    """Exécute l'analyse non destructive multi-détecteurs."""
    # Find image
    matches = list(settings.UPLOADS_DIR.glob(f"{image_id}.*"))
    if not matches:
        raise HTTPException(status_code=404, detail="Image non trouvée.")

    image_path = matches[0]
    start_time = time.time()

    # 1. OCR Engine
    ocr_engine = OcrEngine()
    raw_ocr_boxes = ocr_engine.extract_text_boxes(image_path)

    # 2. Semantic Classification
    classified_texts = [SemanticClassifier.classify(box) for box in raw_ocr_boxes]

    # 3. QR Code Detector
    qr_candidates = QrDetector.detect_and_decode(image_path)

    # 4. Logo Detector
    logo_candidates = LogoDetector.detect_candidate_logos(image_path, classified_texts)

    # 5. Icon Spatial Matcher
    icon_candidates = IconSpatialMatcher.match_icons_to_text(image_path, classified_texts)

    # 6. Social Aligner
    social_candidates = SocialAligner.detect_social_rows(image_path, classified_texts)

    # 7. Geometric Fusion & Deduplication
    all_raw = classified_texts + qr_candidates + logo_candidates + icon_candidates + social_candidates
    fused_candidates = GeometricFusionEngine.fuse_and_deduplicate(all_raw)

    # 8. Extract dominant colors
    dominant_colors = ImageProcessor.extract_dominant_colors(image_path)
    width, height = ImageProcessor.get_dimensions(image_path)

    execution_time = (time.time() - start_time) * 1000

    return AnalysisResultSchema(
        image_id=image_id,
        image_width=width,
        image_height=height,
        candidates=fused_candidates,
        dominant_colors=dominant_colors,
        execution_time_ms=round(execution_time, 2)
    )
