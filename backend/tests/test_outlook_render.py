from app.schemas.document import SignatureDocumentSchema, DocumentFieldsSchema
from app.services.outlook.modern import ModernOutlookRenderer
from app.services.outlook.classic import ClassicOutlookRenderer

def test_modern_outlook_render():
    doc = SignatureDocumentSchema(
        id="doc-1",
        project_id="proj-1",
        name="Test Modern",
        fields=DocumentFieldsSchema(
            full_name="Alice Martin",
            job_title="Responsable Communication",
            company="RAGT",
            email="alice.martin@ragt.fr",
            phone="05 65 73 41 00",
            mobile="06 11 22 33 44",
            website="www.ragt.fr",
            slogan="Cultivons l'avenir"
        )
    )
    res = ModernOutlookRenderer.render(doc)
    assert res.format == "modern_outlook"
    assert "<table" in res.html
    assert "alice.martin@ragt.fr" in res.html
    assert "06 11 22 33 44" in res.html
    # Must NOT contain forbidden CSS
    assert "display: flex" not in res.html
    assert "display: grid" not in res.html
    assert "position: absolute" not in res.html

def test_classic_outlook_render():
    doc = SignatureDocumentSchema(
        id="doc-2",
        project_id="proj-1",
        name="Test Classic",
        fields=DocumentFieldsSchema(
            full_name="Bob Dupont",
            company="RAGT",
            email="bob.dupont@ragt.fr"
        )
    )
    res = ClassicOutlookRenderer.render(doc)
    assert res.format == "classic_outlook"
    assert "<!--[if mso]>" in res.html
    assert "bob.dupont@ragt.fr" in res.html
