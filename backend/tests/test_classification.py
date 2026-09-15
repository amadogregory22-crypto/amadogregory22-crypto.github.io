import pytest
from app.schemas.analysis import CandidateComponentSchema
from app.schemas.common import SemanticTypeEnum, ComponentStatusEnum, BoundingBoxSchema
from app.services.classification.heuristics import SemanticClassifier

def make_text_candidate(text: str) -> CandidateComponentSchema:
    return CandidateComponentSchema(
        id="test-id",
        type="text",
        semantic_type=SemanticTypeEnum.UNKNOWN,
        value=text,
        bounds=BoundingBoxSchema(x=10, y=10, width=100, height=20),
        confidence=0.5,
        status=ComponentStatusEnum.REVIEW,
        source_engine="test"
    )

def test_email_classification():
    cand = make_text_candidate("jean.dupont@ragt.fr")
    res = SemanticClassifier.classify(cand)
    assert res.semantic_type == SemanticTypeEnum.EMAIL
    assert res.confidence >= 0.95
    assert res.status == ComponentStatusEnum.CONFIRMED

def test_mobile_classification():
    cand = make_text_candidate("06 12 34 56 78")
    res = SemanticClassifier.classify(cand)
    assert res.semantic_type == SemanticTypeEnum.MOBILE
    assert res.status == ComponentStatusEnum.CONFIRMED

def test_phone_classification():
    cand = make_text_candidate("+33 (0)5 65 73 41 00")
    res = SemanticClassifier.classify(cand)
    assert res.semantic_type == SemanticTypeEnum.PHONE
    assert res.status == ComponentStatusEnum.CONFIRMED

def test_slogan_penalization_for_name():
    # Terms like CULTIVONS L'AVENIR or RAGT SEMENCES must NOT be classified as NAME
    cand = make_text_candidate("CULTIVONS L'AVENIR ENSEMBLE")
    res = SemanticClassifier.classify(cand)
    assert res.semantic_type == SemanticTypeEnum.SLOGAN
    assert res.semantic_type != SemanticTypeEnum.NAME

def test_name_classification():
    cand = make_text_candidate("Jean Dupont")
    res = SemanticClassifier.classify(cand)
    assert res.semantic_type == SemanticTypeEnum.NAME
    assert res.status == ComponentStatusEnum.REVIEW
