import re
from typing import Tuple, Optional
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum
from app.schemas.analysis import CandidateComponentSchema

class SemanticClassifier:
    EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    PHONE_REGEX = re.compile(r'(?:(?:\+|00)33\s*(?:\(0\)\s*)?|0)\s*[1-9](?:[\s.-]*\d{2}){4}')
    MOBILE_REGEX = re.compile(r'(?:(?:\+|00)33\s*(?:\(0\)\s*)?|0)\s*[67](?:[\s.-]*\d{2}){4}')
    URL_REGEX = re.compile(r'^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$')
    
    # Slogan / corporate terms that must heavily penalize 'name' classification
    SLOGAN_KEYWORDS = [
        "POUR", "DEMAIN", "CULTIVONS", "AVENIR", "SOLUTIONS", "SÉLECTIONNER", 
        "SELECTIONNER", "INNOVER", "PRODUIRE", "RAGT", "SEMENICES", "SEMENCES", 
        "AGRICULTURE", "GROUPE", "ENSEMBLE", "PASSION", "ENGAGEMENT", "RECHERCHE"
    ]
    
    JOB_KEYWORDS = [
        "directeur", "directrice", "responsable", "manager", "ingénieur", "ingenieur",
        "assistant", "assistante", "chef de projet", "chargé", "chargee", "commercial",
        "développeur", "developpeur", "consultant", "coordinateur", "coordinatrice",
        "technicien", "technicienne", "président", "president", "ceo", "cto", "cfo", "head of"
    ]

    ADDRESS_KEYWORDS = [
        "rue", "avenue", "boulevard", "allée", "allee", "chemin", "route", "zone",
        "zi", "za", "cedex", "cs", "bp", "place", "square", "impasse"
    ]

    @classmethod
    def classify(cls, candidate: CandidateComponentSchema) -> CandidateComponentSchema:
        """Applique les heuristiques de classification sémantique sur le composant textuel."""
        if candidate.type != "text":
            return candidate

        raw_text = candidate.value.strip()
        text_lower = raw_text.lower()
        text_upper = raw_text.upper()

        # 1. Email check
        # Search anywhere in string or exact match
        email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', raw_text)
        if email_match:
            candidate.semantic_type = SemanticTypeEnum.EMAIL
            candidate.value = email_match.group(0)
            candidate.confidence = 0.98
            candidate.status = ComponentStatusEnum.CONFIRMED
            return candidate

        # 2. Mobile / Phone check
        if cls.MOBILE_REGEX.search(raw_text):
            candidate.semantic_type = SemanticTypeEnum.MOBILE
            candidate.confidence = 0.95
            candidate.status = ComponentStatusEnum.CONFIRMED
            return candidate
            
        if cls.PHONE_REGEX.search(raw_text) or any(k in text_lower for k in ["tél", "tel:", "phone", "tél."]):
            candidate.semantic_type = SemanticTypeEnum.PHONE
            candidate.confidence = 0.95
            candidate.status = ComponentStatusEnum.CONFIRMED
            return candidate

        # 3. URL check
        if cls.URL_REGEX.search(raw_text) or any(k in text_lower for k in ["www.", ".fr", ".com", ".org", "http://", "https://"]):
            candidate.semantic_type = SemanticTypeEnum.WEBSITE
            candidate.confidence = 0.92
            candidate.status = ComponentStatusEnum.CONFIRMED
            return candidate

        # 4. Slogan & Corporate keywords exclusion check
        slogan_hits = sum(1 for kw in cls.SLOGAN_KEYWORDS if kw in text_upper)
        if slogan_hits >= 2 or any(k in text_upper for k in ["CULTIVONS", "DEMAIN", "AVENIR"]):
            candidate.semantic_type = SemanticTypeEnum.SLOGAN
            candidate.confidence = 0.88
            candidate.status = ComponentStatusEnum.REVIEW
            return candidate

        # 5. Job Title check
        if any(job in text_lower for job in cls.JOB_KEYWORDS):
            candidate.semantic_type = SemanticTypeEnum.JOB_TITLE
            candidate.confidence = 0.85
            candidate.status = ComponentStatusEnum.REVIEW
            return candidate

        # 6. Address check (Postal code: 5 digits, or address keywords)
        has_postal_code = bool(re.search(r'\b\d{5}\b', raw_text))
        has_address_kw = any(addr in text_lower for addr in cls.ADDRESS_KEYWORDS)
        if has_postal_code or has_address_kw:
            candidate.semantic_type = SemanticTypeEnum.ADDRESS
            candidate.confidence = 0.82
            candidate.status = ComponentStatusEnum.REVIEW
            return candidate

        # 7. Name heuristic (2 or 3 capitalized words without slogan terms, short length)
        words = raw_text.split()
        if 2 <= len(words) <= 4 and slogan_hits == 0:
            is_capitalized = all(w[0].isupper() for w in words if len(w) > 0 and w.isalpha())
            if is_capitalized and len(raw_text) < 40:
                candidate.semantic_type = SemanticTypeEnum.NAME
                candidate.confidence = 0.80
                candidate.status = ComponentStatusEnum.REVIEW
                return candidate

        # 8. Company fallback
        if "RAGT" in text_upper or "SAS" in text_upper or "SA" in text_upper or "SARL" in text_upper:
            candidate.semantic_type = SemanticTypeEnum.COMPANY
            candidate.confidence = 0.85
            candidate.status = ComponentStatusEnum.REVIEW
            return candidate

        # Default fallback
        candidate.semantic_type = SemanticTypeEnum.UNKNOWN
        candidate.confidence = 0.50
        candidate.status = ComponentStatusEnum.REJECTED
        return candidate
