import { SignatureState } from '../types/signature';

/**
 * Builds standard vCard 3.0 string from personal info
 */
export function buildVCardString(state: SignatureState): string {
  const { personal } = state;
  const parts: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${personal.lastName || ''};${personal.firstName || ''};;;`,
    `FN:${personal.firstName || ''} ${personal.lastName || ''}`.trim(),
    personal.company ? `ORG:${personal.company}` : '',
    personal.jobTitle ? `TITLE:${personal.jobTitle}` : '',
    personal.phone ? `TEL;TYPE=WORK,VOICE:${personal.phone}` : '',
    personal.mobile ? `TEL;TYPE=CELL,VOICE:${personal.mobile}` : '',
    personal.email ? `EMAIL;TYPE=PREF,INTERNET:${personal.email}` : '',
    personal.website ? `URL:${personal.website}` : '',
    (personal.addressLine1 || personal.city)
      ? `ADR;TYPE=WORK:;;${personal.addressLine1 || ''}${personal.addressLine2 ? ' ' + personal.addressLine2 : ''};${personal.city || ''};;${personal.postalCode || ''};${personal.country || 'France'}`
      : '',
    'END:VCARD'
  ];

  return parts.filter(Boolean).join('\n');
}

/**
 * Returns the exact raw content encoded into the QR code based on config
 */
export function getQrRawContent(state: SignatureState): string {
  const { qr, personal } = state;
  switch (qr.type) {
    case 'vcard':
      return buildVCardString(state);
    case 'url':
      return personal.website || 'https://www.ragt.fr';
    case 'email':
      return personal.email ? `mailto:${personal.email}` : 'mailto:contact@ragt.fr';
    case 'phone':
      return personal.mobile || personal.phone ? `tel:${(personal.mobile || personal.phone).replace(/\s+/g, '')}` : 'tel:+33565734100';
    case 'custom':
    default:
      return qr.customText || `https://www.ragt.fr/contact?source=signature&name=${encodeURIComponent(personal.lastName || 'RAGT')}`;
  }
}

/**
 * Generates an actual data URL (PNG) of the QR code using the mathematical QR algorithm
 */
export async function generateQrSvgString(state: SignatureState): Promise<string> {
  const content = getQrRawContent(state);
  const { qr } = state;
  try {
    const QRCode = (await import('qrcode')).default;
    const svgString = await QRCode.toString(content, {
      type: 'svg',
      width: Math.max(60, qr.size || 80),
      margin: qr.margin ?? 1,
      color: {
        dark: qr.fgColor || '#0C3866',
        light: qr.bgColor || '#FFFFFF'
      },
      errorCorrectionLevel: qr.errorCorrectionLevel || 'M'
    });
    return svgString;
  } catch (err) {
    console.error('Error generating SVG QR code:', err);
    return '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="none"/></svg>';
  }
}

export async function generateQrDataUrl(state: SignatureState): Promise<string> {
  const content = getQrRawContent(state);
  const { qr } = state;

  try {
    const QRCode = (await import('qrcode')).default;
    const dataUrl = await QRCode.toDataURL(content, {
      width: Math.max(60, qr.size || 80),
      margin: qr.margin ?? 1,
      color: {
        dark: qr.fgColor || '#0C3866',
        light: qr.bgColor || '#FFFFFF'
      },
      errorCorrectionLevel: qr.errorCorrectionLevel || 'M'
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Fallback simple 1x1 transparent
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}
