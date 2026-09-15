import { imageUrlToBase64Png } from './svgToPng';
import { SignatureState } from '../types/signature';
import { generateStandaloneSignatureAppHtml } from './standaloneHtmlGenerator';

/**
 * Ensures all image sources inside HTML are self-contained Base64 Data URLs,
 * preventing broken images when pasted into Outlook or saved offline.
 */
export async function inlineAllImagesInHtml(html: string): Promise<string> {
  const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
  const matches = [...html.matchAll(imgRegex)];
  if (matches.length === 0) return html;

  let processedHtml = html;
  for (const match of matches) {
    const fullMatch = match[0];
    const beforeSrc = match[1];
    const src = match[2];
    const afterSrc = match[3];

    if (src.startsWith('data:')) continue;

    try {
      const base64 = await imageUrlToBase64Png(src);
      if (base64 && base64.startsWith('data:')) {
        const replacement = `<img ${beforeSrc}src="${base64}"${afterSrc}>`;
        processedHtml = processedHtml.replace(fullMatch, replacement);
      } else {
        try {
          const absoluteUrl = new URL(src, window.location.href).href;
          const replacement = `<img ${beforeSrc}src="${absoluteUrl}"${afterSrc}>`;
          processedHtml = processedHtml.replace(fullMatch, replacement);
        } catch {
          // keep original
        }
      }
    } catch {
      // keep original
    }
  }

  return processedHtml;
}

/**
 * Copies formatted signature directly to clipboard for pasting into Outlook / webmail
 */
export async function copyRichSignature(html: string): Promise<{ success: boolean; message: string }> {
  try {
    const finalHtml = await inlineAllImagesInHtml(html);
    if (navigator.clipboard && window.ClipboardItem) {
      // Strip outer wrapper comments for clean clipboard item
      const plainText = finalHtml.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
      const htmlBlob = new Blob([finalHtml], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });

      const item = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob
      });

      await navigator.clipboard.write([item]);
      return {
        success: true,
        message: 'Signature copiée avec succès ! Vous pouvez la coller directement (Ctrl+V) dans les paramètres Outlook.'
      };
    } else {
      // Fallback using execCommand
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = finalHtml;
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      document.body.appendChild(tempDiv);

      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      document.body.removeChild(tempDiv);

      return {
        success: true,
        message: 'Signature copiée dans le presse-papier ! Prête à coller dans Outlook.'
      };
    }
  } catch (err) {
    console.error('Erreur lors de la copie de la signature :', err);
    return {
      success: false,
      message: 'Impossible d’accéder au presse-papier. Utilisez l’option "Copier le HTML".'
    };
  }
}

/**
 * Copies raw HTML string to clipboard
 */
export async function copyRawHtml(html: string): Promise<{ success: boolean; message: string }> {
  try {
    const finalHtml = await inlineAllImagesInHtml(html);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(finalHtml);
      return {
        success: true,
        message: 'Code HTML copié dans le presse-papier !'
      };
    }
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = finalHtml;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    return {
      success: true,
      message: 'Code HTML copié dans le presse-papier !'
    };
  } catch (err) {
    console.error('Erreur copie code HTML :', err);
    return {
      success: false,
      message: 'Erreur lors de la copie du code HTML.'
    };
  }
}

/**
 * Generates and downloads signature.html file.
 * If state is passed, exports a complete standalone interactive web app (matching signature (21).html).
 */
export async function downloadHtmlFile(
  html: string,
  filename = 'signature.html',
  state?: SignatureState
): Promise<void> {
  let fullDocument = '';
  if (state) {
    fullDocument = generateStandaloneSignatureAppHtml(state);
  } else {
    const finalHtml = await inlineAllImagesInHtml(html);
    fullDocument = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signature RAGT Semences</title>
  <!-- Compatible Microsoft Outlook 2013-2024 / New Outlook / Web -->
</head>
<body style="margin:0; padding:20px; font-family:Arial, sans-serif; background-color:#FAFAFA;">
  ${finalHtml}
</body>
</html>`;
  }

  const blob = new Blob([fullDocument], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
