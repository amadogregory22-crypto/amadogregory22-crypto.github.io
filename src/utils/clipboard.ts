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
        const copied = document.execCommand('copy');
        sel.removeAllRanges();
        if (!copied) {
          document.body.removeChild(tempDiv);
          return { success: false, message: 'La copie a été refusée par ce navigateur. Utilisez l’option « Copier le HTML ».' };
        }
      } else {
        document.body.removeChild(tempDiv);
        return { success: false, message: 'La sélection de la signature a échoué. Utilisez l’option « Copier le HTML ».' };
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
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (!copied) {
      return { success: false, message: 'La copie du code HTML a été refusée par ce navigateur.' };
    }

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
 * Downloads the exact signature HTML currently shown in the Studio.
 */
export async function downloadSignatureHtmlFile(
  html: string,
  filename = 'signature.html'
): Promise<void> {
  const finalHtml = await inlineAllImagesInHtml(html);
  const fullDocument = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signature RAGT Semences</title>
  <!-- Signature HTML : vérifier le collage dans le client de messagerie cible -->
</head>
<body style="margin:0; padding:20px; font-family:Arial, sans-serif; background-color:#FAFAFA;">
  ${finalHtml}
</body>
</html>`;

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

export interface PortalExportResult {
  embeddedImages: number;
  unresolvedImages: number;
}

async function embedPortalImage(url: string): Promise<{ value: string; embedded: boolean }> {
  if (!url || url.startsWith('data:image/')) return { value: url, embedded: Boolean(url) };
  try {
    const value = await imageUrlToBase64Png(url);
    return { value, embedded: value.startsWith('data:image/') };
  } catch {
    return { value: url, embedded: false };
  }
}

function getImageSources(html: string): string[] {
  return [...html.matchAll(/<img\s+[^>]*?src=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

/** Downloads the editable collaborator portal with all available image assets embedded. */
export async function downloadCollaboratorPortalFile(
  html: string,
  state: SignatureState,
  filename = 'portail-signature-ragt.html'
): Promise<PortalExportResult> {
  const [primary, secondary, banner] = await Promise.all([
    embedPortalImage(state.logos.primary.url),
    embedPortalImage(state.logos.secondary.url),
    embedPortalImage(state.banner.imageUrl)
  ]);
  const embeddedHtml = await inlineAllImagesInHtml(html);
  const clonedState: SignatureState = {
    ...state,
    logos: {
      ...state.logos,
      primary: { ...state.logos.primary, url: primary.value },
      secondary: { ...state.logos.secondary, url: secondary.value }
    },
    banner: { ...state.banner, imageUrl: banner.value }
  };
  const fullDocument = generateStandaloneSignatureAppHtml(clonedState, embeddedHtml);
  const blob = new Blob([fullDocument], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  const imageSources = [...new Set(getImageSources(embeddedHtml))];
  return {
    embeddedImages: imageSources.filter((source) => source.startsWith('data:image/')).length,
    unresolvedImages: imageSources.filter((source) => !source.startsWith('data:image/')).length
  };
}
