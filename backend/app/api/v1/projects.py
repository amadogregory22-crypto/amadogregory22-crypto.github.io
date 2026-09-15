import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.repositories.project_repo import ProjectRepository
from app.repositories.document_repo import DocumentRepository
from app.schemas.asset import ProjectSchema
from app.schemas.document import SignatureDocumentSchema, BuildDocumentRequest, DocumentFieldsSchema, DocumentElementSchema, BoundingBoxSchema
from app.schemas.common import SemanticTypeEnum

router = APIRouter(prefix="/projects", tags=["Projets"])

@router.post("", response_model=ProjectSchema)
def create_project(name: str, source_image_id: str = None, source_image_url: str = None, db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    proj = repo.create(name=name, source_image_id=source_image_id, source_image_url=source_image_url)
    return ProjectSchema(
        id=proj.id,
        name=proj.name,
        source_image_id=proj.source_image_id,
        source_image_url=proj.source_image_url,
        current_document_id=None,
        created_at=proj.created_at.isoformat(),
        updated_at=proj.updated_at.isoformat()
    )

@router.get("", response_model=List[ProjectSchema])
def list_projects(db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    projects = repo.list_all()
    return [
        ProjectSchema(
            id=p.id,
            name=p.name,
            source_image_id=p.source_image_id,
            source_image_url=p.source_image_url,
            current_document_id=p.documents[0].id if p.documents else None,
            created_at=p.created_at.isoformat(),
            updated_at=p.updated_at.isoformat()
        )
        for p in projects
    ]

@router.get("/{project_id}")
def get_project(project_id: str, db: Session = Depends(get_db)):
    repo = ProjectRepository(db)
    doc_repo = DocumentRepository(db)
    proj = repo.get_by_id(project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Projet introuvable.")
    
    doc = doc_repo.get_by_project_id(project_id)
    analysis = repo.get_latest_analysis(project_id)

    return {
        "project": ProjectSchema(
            id=proj.id,
            name=proj.name,
            source_image_id=proj.source_image_id,
            source_image_url=proj.source_image_url,
            current_document_id=doc.id if doc else None,
            created_at=proj.created_at.isoformat(),
            updated_at=proj.updated_at.isoformat()
        ),
        "document": doc_repo.to_schema(doc) if doc else None,
        "latest_analysis": analysis.data if analysis else None
    }

@router.post("/{project_id}/build-document", response_model=SignatureDocumentSchema)
def build_document_from_candidates(project_id: str, req: BuildDocumentRequest, db: Session = Depends(get_db)):
    """Construit un document propre et éditable UNIQUEMENT à partir des composants validés."""
    proj_repo = ProjectRepository(db)
    doc_repo = DocumentRepository(db)
    
    proj = proj_repo.get_by_id(project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Projet introuvable.")

    analysis = proj_repo.get_latest_analysis(project_id)
    if not analysis:
        raise HTTPException(status_code=400, detail="Aucune analyse disponible pour ce projet.")

    candidates_dict = {c["id"]: c for c in analysis.data.get("candidates", [])}
    
    # Construct DocumentFields (Single source of truth)
    fields_data = DocumentFieldsSchema()
    elements: List[DocumentElementSchema] = []
    
    current_y = 20.0
    for cand_id in req.confirmed_candidate_ids:
        if cand_id not in candidates_dict:
            continue
        c = candidates_dict[cand_id]
        sem_type = c.get("semantic_type")
        val = c.get("value", "")
        
        # Populate fields
        if sem_type == "name" or sem_type == "first_name" or sem_type == "last_name":
            fields_data.full_name = val
        elif sem_type == "job_title":
            fields_data.job_title = val
        elif sem_type == "company":
            fields_data.company = val
        elif sem_type == "email":
            fields_data.email = val
        elif sem_type == "phone":
            fields_data.phone = val
        elif sem_type == "mobile":
            fields_data.mobile = val
        elif sem_type == "address":
            fields_data.address = val
        elif sem_type == "website":
            fields_data.website = val
        elif sem_type == "slogan":
            fields_data.slogan = val

        # Add corresponding element linked via fieldBinding
        binding = sem_type if sem_type in ["full_name", "job_title", "company", "email", "phone", "mobile", "address", "website", "slogan"] else None
        
        elements.append(DocumentElementSchema(
            id=str(uuid.uuid4()),
            type="text" if c.get("type") == "text" else ("image" if c.get("type") == "image" else "icon"),
            semantic_type=SemanticTypeEnum(sem_type),
            field_binding=binding,
            static_content=val if not binding else None,
            bounds=BoundingBoxSchema(
                x=float(c.get("bounds", {}).get("x", 20)),
                y=float(c.get("bounds", {}).get("y", current_y)),
                width=float(c.get("bounds", {}).get("width", 200)),
                height=float(c.get("bounds", {}).get("height", 24))
            ),
            rotation=0.0,
            opacity=1.0,
            z_index=len(elements) + 1,
            visible=True,
            locked=False
        ))
        current_y += 28.0

    # Build Document
    new_doc_schema = SignatureDocumentSchema(
        id=str(uuid.uuid4()),
        project_id=project_id,
        name=f"Signature {proj.name}",
        revision=1,
        width=500.0,
        height=max(180.0, current_y + 20.0),
        fields=fields_data,
        elements=elements
    )

    created_doc = doc_repo.create(new_doc_schema)
    return doc_repo.to_schema(created_doc)
