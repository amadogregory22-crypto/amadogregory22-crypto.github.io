from typing import Tuple, List
from app.schemas.document import SignatureDocumentSchema, DocumentElementSchema
from app.schemas.render import RenderResponse

class ModernOutlookRenderer:
    @staticmethod
    def resolve_content(element: DocumentElementSchema, fields: dict) -> str:
        if element.field_binding:
            # Snake case vs camel case field name mapping
            key = element.field_binding
            val = fields.get(key)
            if val is not None:
                return str(val)
        return element.static_content or ""

    @classmethod
    def render(cls, doc: SignatureDocumentSchema) -> RenderResponse:
        """Générateur HTML Pur pour New Outlook / OWA (Tables responsives et inline styles)."""
        fields = doc.fields.model_dump()
        warnings: List[str] = []

        primary_color = doc.theme.get("primary_color", "#005596")
        text_color = doc.theme.get("text_color", "#222222")
        font_family = doc.theme.get("font_family", "Segoe UI, Helvetica, Arial, sans-serif")

        # Organize elements by layout columns or rows
        # For pure email generation, construct a 2-column or structured table
        full_name = fields.get("full_name") or "Prénom Nom"
        job_title = fields.get("job_title") or ""
        company = fields.get("company") or ""
        email = fields.get("email") or ""
        phone = fields.get("phone") or ""
        mobile = fields.get("mobile") or ""
        website = fields.get("website") or ""
        address = fields.get("address") or ""
        slogan = fields.get("slogan") or ""

        # Build clean nested tables without CSS Grid or Flexbox
        html_lines = [
            f'<table cellpadding="0" cellspacing="0" border="0" style="font-family: {font_family}; font-size: 13px; line-height: 1.35; color: {text_color}; background-color: transparent; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">',
            '  <tr>',
            '    <td valign="top" style="padding-right: 16px; border-right: 2px solid ' + primary_color + ';">',
            '      <!-- Logo Column -->',
            '      <table cellpadding="0" cellspacing="0" border="0">',
            '        <tr>',
            '          <td>',
            '            <div style="font-weight: 700; font-size: 18px; color: ' + primary_color + '; letter-spacing: -0.5px;">' + (company or 'RAGT') + '</div>',
            '          </td>',
            '        </tr>',
            '      </table>',
            '    </td>',
            '    <td valign="top" style="padding-left: 16px;">',
            '      <!-- Identity & Contact Column -->',
            '      <table cellpadding="0" cellspacing="0" border="0">',
            '        <tr>',
            '          <td style="font-size: 15px; font-weight: 700; color: ' + primary_color + '; padding-bottom: 2px;">',
            f'            {full_name}',
            '          </td>',
            '        </tr>',
        ]

        if job_title or company:
            sub = f"{job_title} | {company}" if (job_title and company) else (job_title or company)
            html_lines.extend([
                '        <tr>',
                f'          <td style="font-size: 12px; color: #555555; padding-bottom: 8px; font-weight: 600;">{sub}</td>',
                '        </tr>'
            ])

        # Contacts list
        contacts = []
        if mobile:
            contacts.append(f'<strong>M:</strong> <a href="tel:{mobile.replace(" ", "")}" style="color: {text_color}; text-decoration: none;">{mobile}</a>')
        if phone:
            contacts.append(f'<strong>T:</strong> <a href="tel:{phone.replace(" ", "")}" style="color: {text_color}; text-decoration: none;">{phone}</a>')
        if email:
            contacts.append(f'<strong>E:</strong> <a href="mailto:{email}" style="color: {primary_color}; text-decoration: underline;">{email}</a>')
        if website:
            clean_web = website.replace("https://", "").replace("http://", "")
            contacts.append(f'<strong>W:</strong> <a href="https://{clean_web}" style="color: {primary_color}; text-decoration: none;">{clean_web}</a>')

        if contacts:
            html_lines.extend([
                '        <tr>',
                '          <td style="font-size: 12px; padding-bottom: 6px;">',
                '            ' + " &nbsp;|&nbsp; ".join(contacts),
                '          </td>',
                '        </tr>'
            ])

        if address:
            html_lines.extend([
                '        <tr>',
                f'          <td style="font-size: 11px; color: #777777; padding-bottom: 4px;">{address}</td>',
                '        </tr>'
            ])

        if slogan:
            html_lines.extend([
                '        <tr>',
                f'          <td style="font-size: 11px; font-style: italic; color: {primary_color}; padding-top: 4px;">{slogan}</td>',
                '        </tr>'
            ])

        html_lines.extend([
            '      </table>',
            '    </td>',
            '  </tr>',
            '</table>'
        ])

        final_html = "\n".join(html_lines)
        return RenderResponse(
            format="modern_outlook",
            html=final_html,
            warnings=warnings,
            metadata={"tableBased": True, "noFlexbox": True}
        )
