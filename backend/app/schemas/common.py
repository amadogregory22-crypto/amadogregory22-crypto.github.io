from enum import Enum
from pydantic import BaseModel, Field

class SemanticTypeEnum(str, Enum):
    NAME = "name"
    FIRST_NAME = "first_name"
    LAST_NAME = "last_name"
    JOB_TITLE = "job_title"
    COMPANY = "company"
    EMAIL = "email"
    PHONE = "phone"
    MOBILE = "mobile"
    ADDRESS = "address"
    WEBSITE = "website"
    LOGO = "logo"
    ICON_CONTACT = "icon_contact"
    SOCIAL_NETWORK = "social_network"
    QR_CODE = "qr_code"
    SLOGAN = "slogan"
    GRAPHIC_SHAPE = "graphic_shape"
    UNKNOWN = "unknown"

class ComponentStatusEnum(str, Enum):
    CONFIRMED = "confirmed"
    REVIEW = "review"
    REJECTED = "rejected"

class BoundingBoxSchema(BaseModel):
    x: float
    y: float
    width: float
    height: float
