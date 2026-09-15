from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    PROJECT_NAME: str = "Signature Studio Backend"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./data/studio.db"
    DATA_DIR: Path = Path(__file__).resolve().parent.parent.parent / "data"
    UPLOADS_DIR: Path = Path(__file__).resolve().parent.parent.parent / "data" / "uploads"
    ASSETS_DIR: Path = Path(__file__).resolve().parent.parent.parent / "data" / "assets"
    EXPORTS_DIR: Path = Path(__file__).resolve().parent.parent.parent / "data" / "exports"
    TESSERACT_CMD: str = "tesseract"
    CORS_ORIGINS: list[str] = [
        "http://localhost:9292", "http://127.0.0.1:9292",
        "http://localhost:3000", "http://127.0.0.1:3000",
        "http://localhost:3030", "http://127.0.0.1:3030",
        "http://localhost:5173", "http://127.0.0.1:5173"
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Ensure directories exist
settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
settings.UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
settings.ASSETS_DIR.mkdir(parents=True, exist_ok=True)
settings.EXPORTS_DIR.mkdir(parents=True, exist_ok=True)
