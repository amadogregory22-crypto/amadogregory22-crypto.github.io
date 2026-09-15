import uuid
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.models import DocumentModel
from app.schemas.document import SignatureDocumentSchema

class DocumentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, doc_schema: SignatureDocumentSchema) -> DocumentModel:
        doc = DocumentModel(
            id=doc_schema.id or str(uuid.uuid4()),
            project_id=doc_schema.project_id,
            name=doc_schema.name,
            revision=doc_schema.revision,
            width=doc_schema.width,
            height=doc_schema.height,
            fields_data=doc_schema.fields.model_dump(),
            elements_data=[el.model_dump() for el in doc_schema.elements],
            theme_data=doc_schema.theme,
            settings_data=doc_schema.settings
        )
        self.db.add(doc)
        self.db.commit()
        self.db.refresh(doc)
        return doc

    def get_by_id(self, document_id: str) -> Optional[DocumentModel]:
        return self.db.query(DocumentModel).filter(DocumentModel.id == document_id).first()

    def get_by_project_id(self, project_id: str) -> Optional[DocumentModel]:
        return self.db.query(DocumentModel)\
            .filter(DocumentModel.project_id == project_id)\
            .order_by(DocumentModel.revision.desc())\
            .first()

    def update(self, doc_schema: SignatureDocumentSchema) -> DocumentModel:
        doc = self.get_by_id(doc_schema.id)
        if not doc:
            return self.create(doc_schema)
        
        doc.name = doc_schema.name
        doc.revision = doc.revision + 1
        doc.width = doc_schema.width
        doc.height = doc_schema.height
        doc.fields_data = doc_schema.fields.model_dump()
        doc.elements_data = [el.model_dump() for el in doc_schema.elements]
        doc.theme_data = doc_schema.theme
        doc.settings_data = doc_schema.settings
        
        self.db.commit()
        self.db.refresh(doc)
        return doc

    def to_schema(self, doc: DocumentModel) -> SignatureDocumentSchema:
        return SignatureDocumentSchema(
            id=doc.id,
            project_id=doc.project_id,
            name=doc.name,
            revision=doc.revision,
            width=doc.width,
            height=doc.height,
            fields=doc.fields_data,
            elements=doc.elements_data,
            theme=doc.theme_data,
            settings=doc.settings_data
        )
