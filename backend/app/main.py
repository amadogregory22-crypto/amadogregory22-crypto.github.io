from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.logging import logger
from app.models.database import init_db
from app.api.v1.images import router as images_router
from app.api.v1.projects import router as projects_router
from app.api.v1.documents import router as documents_router
from app.api.v1.render import router as render_router
from app.api.v1.assets import router as assets_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API REST pour Signature Studio - Vision par composants, OCR et génération Outlook pure",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static/uploads", StaticFiles(directory=settings.UPLOADS_DIR), name="uploads")
app.mount("/static/assets", StaticFiles(directory=settings.ASSETS_DIR), name="assets")

# Include Routers
app.include_router(images_router, prefix=settings.API_V1_STR)
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(documents_router, prefix=settings.API_V1_STR)
app.include_router(render_router, prefix=settings.API_V1_STR)
app.include_router(assets_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def on_startup():
    logger.info("Démarrage de Signature Studio Backend...")
    init_db()
    logger.info("Base de données initialisée avec succès.")

@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.PROJECT_NAME, "version": "1.0.0"}
