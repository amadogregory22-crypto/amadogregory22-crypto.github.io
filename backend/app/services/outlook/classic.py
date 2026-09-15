from typing import List
from app.schemas.document import SignatureDocumentSchema
from app.schemas.render import RenderResponse

class ClassicOutlookRenderer:
    @classmethod
    def render(cls, doc: SignatureDocumentSchema) -> RenderResponse:
        """Générateur HTML ultra-compatible pour le moteur Microsoft Word (Outlook 2013-2021)."""
        fields = doc.fields.model_dump()
        warnings: List[str] = []

        primary_color = doc.theme.get("primary_color", "#005596")
        text_color = doc.theme.get("text_color", "#222222")
        font_family = "Arial, Helvetica, sans-serif"  # Standard safe desktop font

        full_name = fields.get("full_name") or "Prénom Nom"
        job_title = fields.get("job_title") or ""
        company = fields.get("company") or "RAGT"
        email = fields.get("email") or ""
        phone = fields.get("phone") or ""
        mobile = fields.get("mobile") or ""
        website = fields.get("website") or ""
        address = fields.get("address") or ""
        slogan = fields.get("slogan") or ""

        html = f"""<!--[if mso]>
<table cellpadding="0" cellspacing="0" border="0" width="500" style="width: 500px; font-family: {font_family};">
<tr>
<td>
<![endif]-->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: {font_family}; font-size: 10pt; line-height: 14pt; color: {text_color}; border-collapse: collapse;">
  <tr>
    <td valign="middle" style="padding-right: 15px; border-right: 2px solid {primary_color};">
      <font face="{font_family}" size="4" color="{primary_color}"><strong>{company}</strong></font>
    </td>
    <td valign="top" style="padding-left: 15px;">
      <font face="{font_family}" size="3" color="{primary_color}"><strong>{full_name}</strong></font><br/>
      <font face="{font_family}" size="2" color="#555555"><em>{job_title}</em></font><br/>
      <font face="{font_family}" size="2" color="{text_color}">
        {f'T: {phone} &nbsp;|&nbsp; ' if phone else ''}{f'M: {mobile} &nbsp;|&nbsp; ' if mobile else ''}{f'<a href="mailto:{email}" style="color: {primary_color};">{email}</a>' if email else ''}
      </font><br/>
      {f'<font face="{font_family}" size="1" color="#777777">{address}</font><br/>' if address else ''}
      {f'<font face="{font_family}" size="1" color="{primary_color}"><em>{slogan}</em></font>' if slogan else ''}
    </td>
  </tr>
</table>
<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->"""

        return RenderResponse(
            format="classic_outlook",
            html=html,
            warnings=warnings,
            metadata={"msoConditionals": True, "wordEngineSafe": True}
        )
