from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.repositories.document_repo import DocumentRepository
from app.schemas.document import SignatureDocumentSchema

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.get("/{document_id}", response_model=SignatureDocumentSchema)
def get_document(document_id: str, db: Session = Depends(get_db)):
    repo = DocumentRepository(db)
    doc = repo.get_by_id(document_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document introuvable.")
    return repo.to_schema(doc)

@router.put("/{document_id}", response_model=SignatureDocumentSchema)
def update_document(document_id: str, doc_data: SignatureDocumentSchema, db: Session = Depends(get_db)):
    repo = DocumentRepository(db)
    doc_data.id = document_id
    updated = repo.update(doc_data)
    return repo.to_schema(updated)
