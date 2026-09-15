import zipfile
import io
from pathlib import Path
from app.schemas.document import SignatureDocumentSchema
from app.services.outlook.modern import ModernOutlookRenderer
from app.services.outlook.classic import ClassicOutlookRenderer

class OutlookPackager:
    @classmethod
    def generate_zip_package(cls, doc: SignatureDocumentSchema) -> bytes:
        """Génère un package ZIP complet d'installation de signature pour Microsoft Outlook."""
        buffer = io.BytesIO()
        modern_res = ModernOutlookRenderer.render(doc)
        classic_res = ClassicOutlookRenderer.render(doc)

        safe_name = doc.name.replace(" ", "_").lower()

        with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
            # 1. HTML file for modern Outlook & Web
            zf.writestr(f"{safe_name}_modern.htm", modern_res.html.encode('utf-8'))
            
            # 2. HTM file for classic Outlook (%appdata%/Microsoft/Signatures)
            zf.writestr(f"{safe_name}_classic.htm", classic_res.html.encode('utf-8'))
            
            # 3. Plain text fallback
            fields = doc.fields.model_dump()
            txt_content = f"{fields.get('full_name', '')}\n{fields.get('job_title', '')} | {fields.get('company', '')}\nTel: {fields.get('phone', '')} | Mobile: {fields.get('mobile', '')}\nEmail: {fields.get('email', '')}\n{fields.get('address', '')}"
            zf.writestr(f"{safe_name}.txt", txt_content.encode('utf-8'))

            # 4. Installation Instructions Readme
            readme = f"""=== Guide d'installation de la signature Outlook ===
Projet : {doc.name}
Révision : {doc.revision}

1. Pour Outlook sur le Web (OWA) ou New Outlook :
   - Ouvrez {safe_name}_modern.htm dans un navigateur.
   - Sélectionnez tout (Ctrl+A), copiez (Ctrl+C).
   - Collez dans les paramètres de signature de votre messagerie.

2. Pour Outlook Classique (Desktop Windows) :
   - Copiez le fichier {safe_name}_classic.htm dans le dossier :
     %APPDATA%\\Microsoft\\Signatures\\
   - Redémarrez Outlook et sélectionnez la signature par défaut dans Fichier > Options > Courrier > Signatures.
"""
            zf.writestr("INSTRUCTIONS_INSTALLATION.txt", readme.encode('utf-8'))

        buffer.seek(0)
        return buffer.getvalue()
