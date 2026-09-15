from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.repositories.document_repo import DocumentRepository
from app.schemas.render import RenderResponse
from app.services.outlook.modern import ModernOutlookRenderer
from app.services.outlook.classic import ClassicOutlookRenderer
from app.services.outlook.packaging import OutlookPackager

router = APIRouter(prefix="/documents", tags=["Rendu & Export Outlook"])

@router.post("/{document_id}/render/modern", response_model=RenderResponse)
def render_modern_outlook(document_id: str, db: Session = Depends(get_db)):
    repo = DocumentRepository(db)
    doc_model = repo.get_by_id(document_id)
    if not doc_model:
        raise HTTPException(status_code=404, detail="Document introuvable.")
    doc_schema = repo.to_schema(doc_model)
    return ModernOutlookRenderer.render(doc_schema)

@router.post("/{document_id}/render/classic", response_model=RenderResponse)
def render_classic_outlook(document_id: str, db: Session = Depends(get_db)):
    repo = DocumentRepository(db)
    doc_model = repo.get_by_id(document_id)
    if not doc_model:
        raise HTTPException(status_code=404, detail="Document introuvable.")
    doc_schema = repo.to_schema(doc_model)
    return ClassicOutlookRenderer.render(doc_schema)

@router.get("/{document_id}/export/package")
def export_outlook_package(document_id: str, db: Session = Depends(get_db)):
    repo = DocumentRepository(db)
    doc_model = repo.get_by_id(document_id)
    if not doc_model:
        raise HTTPException(status_code=404, detail="Document introuvable.")
    doc_schema = repo.to_schema(doc_model)
    zip_bytes = OutlookPackager.generate_zip_package(doc_schema)

    safe_name = doc_schema.name.replace(" ", "_").lower()
    return Response(
        content=zip_bytes,
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename=signature_{safe_name}_package.zip"}
    )
