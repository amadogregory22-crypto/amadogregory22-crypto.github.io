import { SignatureState } from '../types/signature';
import { SOCIAL_ICONS_SVG } from '../constants/logos';
import { svgDataUrlToPng, imageUrlToBase64Png } from './svgToPng';
import { isCampaignActive } from './campaignStatus';

/**
 * Escapes HTML entities to prevent injection
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Normalizes phone numbers for tel: links
 */
export function sanitizeTel(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Checks if a string is a valid web URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('javascript:')) return '#';
  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith('mailto:') && !trimmed.startsWith('tel:')) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function appendUtmParams(url: string, utm?: SignatureState['utm']): string {
  if (!url || !utm || !utm.enabled || url.startsWith('mailto:') || url.startsWith('tel:')) return url;
  
  try {
    const urlObj = new URL(url);
    if (utm.source) urlObj.searchParams.set('utm_source', utm.source);
    if (utm.medium) urlObj.searchParams.set('utm_medium', utm.medium);
    if (utm.campaign) urlObj.searchParams.set('utm_campaign', utm.campaign);
    return urlObj.toString();
  } catch (e) {
    // If invalid URL, return original
    return url;
  }
}

/**
 * Generates an SVG Data URL representation of a social icon with customized fill color
 */
export function getSocialIconDataUrl(
  networkId: string,
  color: string,
  style: 'circle' | 'square' | 'rounded' | 'mono' = 'circle',
  bgColor: string = '#FDC420'
): string {
  const svg = SOCIAL_ICONS_SVG[networkId] || SOCIAL_ICONS_SVG.custom;
  
  if (style === 'circle') {
    // White circular badge with cut-out icon in yellow/navy
    const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '%23ffffff' || color.toLowerCase() === 'white';
    const discBg = isWhite ? '#ffffff' : color;
    const glyphColor = isWhite ? (bgColor || '#FDC420') : '#ffffff';
    const coloredSvg = svg.replace(/fill="currentColor"/g, `fill="${glyphColor}"`);
    const pathContent = coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, '');
    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" fill="${discBg}"/><g transform="translate(4,4) scale(0.66)">${pathContent}</g></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
  }
  
  // Minimal / default
  const coloredSvg = svg.replace(/fill="currentColor"/g, `fill="${color}"`);
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">${coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

/**
 * SVG Data URL for contact icons (Phone, Mobile, Mail, Location, Web)
 */
export function getContactIconDataUrl(
  type: 'phone' | 'mobile' | 'email' | 'address' | 'web' | 'fax',
  color: string,
  style: 'outline' | 'filled' | 'circle' | 'square' | 'minimal' = 'minimal',
  bgColor: string = '#FDC420'
): string {
  let path = '';
  switch (type) {
    case 'phone':
      path = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
      break;
    case 'mobile':
      path = '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
      break;
    case 'email':
      path = '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>';
      break;
    case 'address':
      path = '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>';
      break;
    case 'web':
      path = '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>';
      break;
    case 'fax':
      path = '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>';
      break;
  }

  let wrapper = '';
  const isWhite = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '%23ffffff' || color.toLowerCase() === 'white';
  const encColor = encodeURIComponent(color);
  
  if (style === 'circle') {
    if (isWhite) {
      // White circular button disc with colored glyph inside
      const glyphStroke = encodeURIComponent(bgColor || '#FDC420');
      wrapper = `<circle cx="12" cy="12" r="11.5" fill="%23ffffff"/><g transform="translate(4,4) scale(0.66)" stroke="${glyphStroke}">${path}</g>`;
    } else {
      wrapper = `<circle cx="12" cy="12" r="12" fill="${encColor}"/><g transform="translate(4,4) scale(0.66)" stroke="%23ffffff">${path}</g>`;
    }
  } else if (style === 'square') {
    wrapper = `<rect x="0" y="0" width="24" height="24" rx="4" fill="${encColor}"/><g transform="translate(4,4) scale(0.66)" stroke="%23ffffff">${path}</g>`;
  } else if (style === 'filled') {
    wrapper = `<g fill="${encColor}" stroke="none">${path}</g>`;
  } else {
    wrapper = `<g stroke="${encColor}">${path}</g>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${wrapper}</svg>`;
  return `data:image/svg+xml;utf8,${svg.replace(/#/g, '%23')}`;
}

/**
 * Builds the HTML for the personal identity (name, title, company)
 */
function buildIdentityHtml(state: SignatureState): string {
  const { personal, visibility, design } = state;
  const tName = design.typography.name;
  const tJob = design.typography.jobTitle;
  const tComp = design.typography.company;

  const rows: string[] = [];

  // Name row
  const nameParts: string[] = [];
  if (visibility.civility && personal.civility) nameParts.push(escapeHtml(personal.civility));
  if (visibility.firstName && personal.firstName) nameParts.push(escapeHtml(personal.firstName));
  if (visibility.lastName && personal.lastName) {
    nameParts.push(`<span style="color:${design.colors.lastName}; font-weight:bold;">${escapeHtml(personal.lastName.toUpperCase())}</span>`);
  }

  if (nameParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tName.fontFamily}; font-size:${tName.fontSize}px; font-weight:${tName.fontWeight}; color:${design.colors.firstName}; line-height:${tName.lineHeight}; letter-spacing:${tName.letterSpacing}px; padding-bottom:3px;">
          ${nameParts.join(' ')}
        </td>
      </tr>
    `);
  }

  // Job Title & Service
  const jobParts: string[] = [];
  if (visibility.jobTitle && personal.jobTitle) jobParts.push(escapeHtml(personal.jobTitle));
  if (visibility.department && personal.department) jobParts.push(escapeHtml(personal.department));
  if (visibility.service && personal.service) jobParts.push(escapeHtml(personal.service));

  if (jobParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tJob.fontFamily}; font-size:${tJob.fontSize}px; font-style:${tJob.fontStyle}; color:${design.colors.jobTitle}; line-height:${tJob.lineHeight}; padding-bottom:3px;">
          ${jobParts.join(' &bull; ')}
        </td>
      </tr>
    `);
  }

  // Company row
  const compParts: string[] = [];
  if (visibility.company && personal.company) compParts.push(escapeHtml(personal.company));
  if (visibility.subsidiary && personal.subsidiary) compParts.push(escapeHtml(personal.subsidiary));

  if (compParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tComp.fontFamily}; font-size:${tComp.fontSize}px; font-weight:${tComp.fontWeight}; color:${design.colors.company}; line-height:${tComp.lineHeight}; padding-bottom:4px;">
          ${compParts.join(' - ')}
        </td>
      </tr>
    `);
  }

  return rows.length ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">${rows.join('')}</table>` : '';
}

/**
 * Builds the contact information block (phones, emails, address, website)
 */
function buildCoordinatesHtml(state: SignatureState, iconCache: Record<string, string>): string {
  const { personal, labels, visibility, design, iconSettings } = state;
  const t = design.typography.coordinates;
  const rows: string[] = [];

  const shouldUnderline = t.textDecoration === 'underline';
  const textDecor = shouldUnderline ? 'underline' : 'none';
  const msoUnderline = shouldUnderline ? 'single' : 'none';

  const makeLink = (href: string, text: string, color: string, isBold: boolean = false, targetBlank: boolean = false) => {
    const targetAttr = targetBlank ? ' target="_blank" rel="noopener noreferrer"' : '';
    const weightStyle = isBold ? ' font-weight:600;' : '';
    const linkStyle = `color:${color}; text-decoration:${textDecor} !important; text-decoration:${textDecor}; -webkit-text-decoration:${textDecor}; mso-text-underline:${msoUnderline}; text-underline-style:${msoUnderline}; border:none; outline:none; border-bottom:none; font-family:${t.fontFamily}; word-break:break-word; overflow-wrap:anywhere;${weightStyle}`;
    const spanStyle = `color:${color}; text-decoration:${textDecor} !important; text-decoration:${textDecor}; -webkit-text-decoration:${textDecor}; mso-text-underline:${msoUnderline}; text-underline-style:${msoUnderline}; border:none; outline:none; border-bottom:none; display:inline; word-break:break-word; overflow-wrap:anywhere;${weightStyle}`;
    return `<a href="${href}"${targetAttr} style="${linkStyle}"><span style="${spanStyle}">${escapeHtml(text)}</span></a>`;
  };

  const addCoordRow = (iconType: 'phone' | 'mobile' | 'email' | 'address' | 'web' | 'fax', label: string, valueHtml: string) => {
    const iconUrl = iconCache[`contact_${iconType}`] || getContactIconDataUrl(iconType, design.colors.icons || iconSettings.color, iconSettings.style, design.background.color || '#FDC420');
    rows.push(`
      <tr>
        <td style="vertical-align:middle; padding:1px 0;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
            <tr>
              <td style="vertical-align:middle; width:${iconSettings.size + 4}px; padding-right:${iconSettings.spacing}px;">
                <img src="${iconUrl}" width="${iconSettings.size}" height="${iconSettings.size}" alt="${iconType}" border="0" style="display:block; width:${iconSettings.size}px; height:${iconSettings.size}px;" />
              </td>
              <td style="font-family:${t.fontFamily}; font-size:${t.fontSize}px; line-height:${t.lineHeight}; color:${design.colors.text}; vertical-align:middle; word-break:break-word; overflow-wrap:anywhere;">
                ${label ? `<strong style="color:${design.colors.muted}; font-weight:600;">${escapeHtml(label)}:</strong> ` : ''}${valueHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `);
  };

  // Direct / Main Phone
  if (visibility.phone && personal.phone) {
    const telLink = `tel:${sanitizeTel(personal.phone)}`;
    addCoordRow('phone', labels.phone, makeLink(telLink, personal.phone, design.colors.phone, false, false));
  }

  // Standard Phone
  if (visibility.standardPhone && personal.standardPhone) {
    const telLink = `tel:${sanitizeTel(personal.standardPhone)}`;
    addCoordRow('phone', labels.standardPhone, makeLink(telLink, personal.standardPhone, design.colors.phone, false, false));
  }

  // Mobile
  if (visibility.mobile && personal.mobile) {
    const telLink = `tel:${sanitizeTel(personal.mobile)}`;
    addCoordRow('mobile', labels.mobile, makeLink(telLink, personal.mobile, design.colors.mobile, false, false));
  }

  // Standard or Direct extra
  if (visibility.directPhone && personal.directPhone && personal.directPhone !== personal.phone) {
    const telLink = `tel:${sanitizeTel(personal.directPhone)}`;
    addCoordRow('phone', labels.directPhone, makeLink(telLink, personal.directPhone, design.colors.phone, false, false));
  }

  // Fax
  if (visibility.fax && personal.fax) {
    addCoordRow(
      'fax',
      labels.fax,
      `<span style="color:${design.colors.phone}; font-family:${t.fontFamily};">${escapeHtml(personal.fax)}</span>`
    );
  }

  // Email
  if (visibility.email && personal.email) {
    const mailLink = `mailto:${encodeURIComponent(personal.email)}`;
    addCoordRow('email', labels.email, makeLink(mailLink, personal.email, design.colors.email, true, false));
  }

  // Website
  if (visibility.website && personal.website) {
    const webUrl = appendUtmParams(sanitizeUrl(personal.website), state.utm);
    const displayWeb = personal.website.replace(/^https?:\/\//i, '');
    addCoordRow('web', labels.website, makeLink(webUrl, displayWeb, design.colors.website, true, true));
  }

  // Address
  if (visibility.address && (personal.addressLine1 || personal.city)) {
    const fullAddr = [
      personal.addressLine1,
      personal.addressLine2,
      [personal.postalCode, personal.city].filter(Boolean).join(' ')
    ].filter(Boolean).join(' - ');

    const mapsLink = personal.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(fullAddr + (personal.country ? ', ' + personal.country : ''))}`;
    addCoordRow('address', labels.address, makeLink(mapsLink, fullAddr, design.colors.address, false, true));
  }

  return rows.length ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:4px;">${rows.join('')}</table>` : '';
}

/**
 * Builds social network links row
 */
function buildSocialsHtml(state: SignatureState, iconCache: Record<string, string>, layoutMode: 'horizontal' | 'vertical' = 'horizontal'): string {
  const { social, visibility, design } = state;
  if (!visibility.socials) return '';

  const activeItems = social.items.filter((item) => item.active && item.url);
  if (activeItems.length === 0) return '';

  const links = activeItems.map((item) => {
    const targetUrl = appendUtmParams(sanitizeUrl(item.url), state.utm);
    const iconDataUrl = iconCache[`social_${item.id}`] || getSocialIconDataUrl(item.id, item.color || '#0C3866', item.iconStyle || 'circle', state.design.background.color || '#FDC420');
    const displayLabel = social.style === 'icons-text' ? ` <span style="font-size:11px; font-family:${design.typography.baseFont}; color:${design.colors.muted}; vertical-align:middle; padding-left:3px;">${escapeHtml(item.name)}</span>` : '';

    if (layoutMode === 'vertical') {
      return `
        <tr>
          <td style="padding-bottom:${social.spacing}px; vertical-align:middle; white-space:nowrap;">
            <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-block; vertical-align:middle;">
              <img src="${iconDataUrl}" width="${social.iconSize}" height="${social.iconSize}" alt="${escapeHtml(item.name)}" border="0" style="display:inline-block; vertical-align:middle; width:${social.iconSize}px; height:${social.iconSize}px;" />
              ${displayLabel}
            </a>
          </td>
        </tr>
      `;
    }

    return `
      <td style="padding-right:${social.spacing}px; vertical-align:middle; white-space:nowrap;">
        <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-block; vertical-align:middle;">
          <img src="${iconDataUrl}" width="${social.iconSize}" height="${social.iconSize}" alt="${escapeHtml(item.name)}" border="0" style="display:inline-block; vertical-align:middle; width:${social.iconSize}px; height:${social.iconSize}px;" />
          ${displayLabel}
        </a>
      </td>
    `;
  });

  if (layoutMode === 'vertical') {
    return `
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:6px;">
        ${links.join('')}
      </table>
    `;
  }

  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:6px;">
      <tr>
        ${links.join('')}
      </tr>
    </table>
  `;
}

/**
 * Builds the slogan section
 */
function buildSloganHtml(state: SignatureState): string {
  const { slogan, visibility, design } = state;
  if (!visibility.slogan || !slogan.enabled || !slogan.text) return '';

  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; margin-top:${slogan.marginTop}px; margin-bottom:${slogan.marginBottom}px;">
      <tr>
        <td style="font-family:${slogan.fontFamily || design.typography.baseFont}; font-size:${slogan.fontSize}px; font-weight:${slogan.fontWeight}; font-style:${slogan.fontStyle}; color:${slogan.color || design.colors.slogan}; text-align:${slogan.align}; line-height:1.3; padding-top:4px;">
          &laquo; ${escapeHtml(slogan.text)} &raquo;
        </td>
      </tr>
    </table>
  `;
}

/**
 * Builds the primary logo element
 */
function buildLogoHtml(state: SignatureState, isSecondary = false, iconCache: Record<string, string> = {}): string {
  const { logos, visibility } = state;
  const logo = isSecondary ? logos.secondary : logos.primary;
  const isVisible = isSecondary ? visibility.secondaryLogo : visibility.logo;

  if (!isVisible || !logo.url) return '';

  const cacheKey = isSecondary ? 'logo_secondary' : 'logo_primary';
  const effectiveUrl = iconCache[cacheKey] || logo.url;

  const dropzoneId = isSecondary ? 'logo-secondary' : 'logo-primary';
  const imgTag = `
    <img data-ragt-dropzone="${dropzoneId}" src="${effectiveUrl}" width="${logo.width}" height="${logo.height}" alt="${escapeHtml(logo.alt || 'RAGT')}" border="0" style="display:block; width:${logo.width}px; height:${logo.height}px; max-width:${logo.width}px; outline:none; text-decoration:none;" />
  `;

  if (logo.linkUrl) {
    return `<a href="${sanitizeUrl(logo.linkUrl)}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none; border:0;">${imgTag}</a>`;
  }
  return imgTag;
}

/**
 * Builds QR Code element
 */
function buildQrHtml(state: SignatureState, qrDataUrl: string): string {
  const { qr, visibility } = state;
  if (!visibility.qr || !qrDataUrl) return '';

  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-table; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center;">
      <tr>
        <td style="padding:2px; background-color:${qr.bgColor || '#FFFFFF'}; border:1px solid #E2E8F0; border-radius:4px; text-align:center;" align="center">
          <img src="${qrDataUrl}" width="${qr.size}" height="${qr.size}" alt="QR Code vCard" border="0" style="display:block; width:${qr.size}px; height:${qr.size}px; margin:0 auto;" />
        </td>
      </tr>
      <tr>
        <td style="font-family:${state.design.typography.baseFont}; font-size:9px; color:#A0AEC0; text-align:center; padding-top:2px;" align="center">
          Scan contact
        </td>
      </tr>
    </table>
  `;
}

/**
 * Builds promotional or institutional campaign banner
 */
function buildBannerHtml(state: SignatureState, iconCache: Record<string, string> = {}): string {
  const { banner, visibility } = state;
  if (!visibility.banner || !isCampaignActive(banner)) return '';

  const effectiveBannerUrl = iconCache['banner_image'] || banner.imageUrl;

  // Fixed-height campaigns must remain a compact full-width strip. This cap
  // also protects older imported configurations that used taller values.
  const fixedHeight = Math.min(90, Math.max(20, banner.height));
  const renderedHeight = banner.maintainRatio === false ? fixedHeight : banner.height;
  const heightStyle = banner.maintainRatio === false
    ? `height:${renderedHeight}px; object-fit:cover;`
    : `height:auto;`;

  const bannerImg = `
    <img data-ragt-dropzone="banner" src="${effectiveBannerUrl}" width="${banner.width}" height="${renderedHeight}" alt="${escapeHtml(banner.altText || banner.title)}" border="0" style="display:block; width:${banner.width}px; max-width:100%; ${heightStyle} border-radius:4px;" />
  `;

  const content = banner.linkUrl
    ? `<a href="${appendUtmParams(sanitizeUrl(banner.linkUrl), state.utm)}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">${bannerImg}</a>`
    : bannerImg;

  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${banner.width}" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:${banner.width}px; max-width:100%; margin-top:${banner.marginTop}px; margin-bottom:${banner.marginBottom}px;">
      <tr>
        <td style="vertical-align:top; text-align:center;">
          ${content}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Builds promotional or institutional campaign banner (rendered below the signature card)
 */
function buildCampaignHtml(state: SignatureState, iconCache: Record<string, string> = {}): string {
  const { campaign, banner, visibility, layout } = state;
  const isDedicated = Boolean(campaign && campaign.enabled && campaign.imageUrl);
  const isLegacyBannerCampaign = Boolean(
    visibility.banner && banner.enabled && (banner.campaignName || banner.position === 'bottom') && banner.imageUrl
  );

  if (!isDedicated && !isLegacyBannerCampaign) return '';

  const active = isDedicated ? campaign! : banner;
  if (!isCampaignActive(active)) return '';

  const effectiveUrl = iconCache['campaign_image'] || iconCache['banner_image'] || active.imageUrl;
  const isMobilePreset = layout.preset === 'layout-c' || layout.preset === 'layout-d' || layout.preset === 'layout-g';
  const totalWidth = isMobilePreset ? Math.min(layout.dimensions.totalWidth, 340) : layout.dimensions.totalWidth;
  const height = Math.min(90, Math.max(20, active.height || 90));

  const imgHtml = `<img data-ragt-dropzone="campaign" src="${effectiveUrl}" width="${totalWidth}" height="${height}" alt="${escapeHtml(active.altText || active.title || 'Campagne RAGT')}" border="0" style="display:block; width:${totalWidth}px; max-width:100%; height:${height}px; object-fit:cover; border-radius:4px;" />`;

  const linkContent = active.linkUrl
    ? `<a href="${appendUtmParams(sanitizeUrl(active.linkUrl), state.utm)}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">${imgHtml}</a>`
    : imgHtml;

  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${totalWidth}" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:${totalWidth}px; max-width:100%; margin-top:12px; margin-bottom:4px;">
      <tr>
        <td style="vertical-align:top; text-align:center; padding:0;">
          ${linkContent}
        </td>
      </tr>
    </table>
  `;
}

export async function generateAllIconPngs(state: SignatureState): Promise<Record<string, string>> {
  const cache: Record<string, string> = {};
  const { design, iconSettings, social, logos, banner, visibility } = state;
  const contactColor = design.colors.icons || iconSettings.color;
  
  // Pre-convert primary and secondary logos to self-contained Base64 Data URLs so Outlook shows them offline
  if (visibility.logo && logos.primary?.url) {
    try {
      cache['logo_primary'] = await imageUrlToBase64Png(logos.primary.url, 250);
    } catch {
      cache['logo_primary'] = logos.primary.url;
    }
  }

  if (visibility.secondaryLogo && logos.secondary?.url) {
    try {
      cache['logo_secondary'] = await imageUrlToBase64Png(logos.secondary.url, 250);
    } catch {
      cache['logo_secondary'] = logos.secondary.url;
    }
  }

  // Pre-convert campaign photo banner to Base64 Data URL
  if (visibility.banner && banner.enabled && banner.imageUrl) {
    try {
      cache['banner_image'] = await imageUrlToBase64Png(banner.imageUrl, 400);
    } catch {
      cache['banner_image'] = banner.imageUrl;
    }
  }

  if (state.campaign && state.campaign.enabled && state.campaign.imageUrl) {
    try {
      cache['campaign_image'] = await imageUrlToBase64Png(state.campaign.imageUrl, 540);
    } catch {
      cache['campaign_image'] = state.campaign.imageUrl;
    }
  }

  const contactTypes = ['phone', 'mobile', 'email', 'address', 'web', 'fax'] as const;
  for (const t of contactTypes) {
    const svgUrl = getContactIconDataUrl(t, contactColor, iconSettings.style, design.background.color || '#FDC420');
    try {
      cache[`contact_${t}`] = await svgDataUrlToPng(svgUrl, iconSettings.size * 2, iconSettings.size * 2);
    } catch (e) {
      cache[`contact_${t}`] = svgUrl;
    }
  }

  const activeSocials = social.items.filter(i => i.active && i.url);
  for (const s of activeSocials) {
    const color = s.color || '#0C3866';
    const svgUrl = getSocialIconDataUrl(s.id, color, s.iconStyle || 'circle', design.background.color || '#FDC420');
    try {
      cache[`social_${s.id}`] = await svgDataUrlToPng(svgUrl, social.iconSize * 2, social.iconSize * 2);
    } catch (e) {
      cache[`social_${s.id}`] = svgUrl;
    }
  }
  
  return cache;
}

/**
 * MASTER GENERATOR: Assembles the complete Outlook-compatible e-mail signature HTML
 */
export function generateEmailHTML(state: SignatureState, qrDataUrl = '', iconCache: Record<string, string> = {}): string {
  const { layout, design } = state;
  const p = layout.dimensions;
  const sep = layout.separator;

  const identityHtml = buildIdentityHtml(state);
  const coordsHtml = buildCoordinatesHtml(state, iconCache);
  const socialsHtml = buildSocialsHtml(state, iconCache);
  const sloganHtml = buildSloganHtml(state);
  const logoHtml = buildLogoHtml(state, false, iconCache);
  const secondaryLogoHtml = buildLogoHtml(state, true, iconCache);
  const qrHtml = buildQrHtml(state, qrDataUrl);
  const bannerHtml = buildBannerHtml(state, iconCache);
  const campaignHtml = buildCampaignHtml(state, iconCache);
  const topBannerHtml = state.banner.position === 'top' ? bannerHtml : '';
  const bottomBannerHtml = (!campaignHtml && state.banner.position === 'bottom') ? bannerHtml : '';
  const rightBannerHtml = state.banner.position === 'right' ? bannerHtml : '';
  const leftBannerHtml = state.banner.position === 'left' ? bannerHtml : '';
  const centerBannerHtml = (state.banner.position === 'center' || !state.banner.position) ? bannerHtml : '';

  // Layout D is the free, centered composition. It uses the persisted block
  // order so a designer can change the reading order without turning content
  // into a flat image. Job and company are part of the identity block.
  const orderedBlockKeys = Array.from(new Set(
    layout.blockOrder
      .map((key) => (key === 'job' || key === 'company' ? 'identity' : key))
      .filter((key): key is 'logo' | 'identity' | 'coordinates' | 'social' | 'qr' | 'slogan' | 'banner' =>
        ['logo', 'identity', 'coordinates', 'social', 'qr', 'slogan', 'banner'].includes(key)
      )
  ));
  for (const key of ['logo', 'identity', 'coordinates', 'social', 'qr', 'slogan', 'banner'] as const) {
    if (!orderedBlockKeys.includes(key)) orderedBlockKeys.push(key);
  }
  const orderedCenterBlocks: Record<(typeof orderedBlockKeys)[number], string> = {
    logo: `${logoHtml}${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ''}`,
    identity: identityHtml,
    coordinates: coordsHtml,
    social: socialsHtml,
    qr: qrHtml,
    slogan: sloganHtml,
    // Top and bottom campaigns retain their dedicated Outlook-safe wrappers.
    // Only a centered image becomes part of the freely ordered composition.
    banner: centerBannerHtml
  };
  const orderedCenterRows = orderedBlockKeys
    .map((key) => orderedCenterBlocks[key] ? `<tr><td align="center" style="text-align:center; padding-top:4px;">${orderedCenterBlocks[key]}</td></tr>` : '')
    .join('');

  // All layouts share this ordered information column. The free centered
  // layout also moves the logo; horizontal layouts keep their logo/QR columns
  // intact for Outlook, while identity, contact, social, slogan and a centered
  // image can be reordered by the same persisted blockOrder.
  const defaultBlockOrder = ['logo', 'identity', 'coordinates', 'social', 'qr', 'slogan', 'banner'];
  const usesDefaultBlockOrder = orderedBlockKeys.every((key, index) => key === defaultBlockOrder[index]);
  const buildOrderedInfoHtml = (options: { includeSocial?: boolean; includeCenterBanner?: boolean } = {}) => {
    const includeSocial = options.includeSocial !== false;
    const includeCenterBanner = options.includeCenterBanner !== false;
    const blocks: Partial<Record<(typeof orderedBlockKeys)[number], string>> = {
      identity: identityHtml,
      coordinates: coordsHtml,
      social: includeSocial ? socialsHtml : '',
      slogan: sloganHtml,
      qr: state.qr.position === 'bottom' ? qrHtml : '',
      banner: includeCenterBanner ? centerBannerHtml : ''
    };
    const legacyOrder = ['banner', 'identity', 'coordinates', 'social', 'slogan', 'qr'] as const;
    const order = usesDefaultBlockOrder ? legacyOrder : orderedBlockKeys;
    const rows = order
      .filter((key) => key !== 'logo')
      .map((key) => blocks[key] ? `<tr><td style="padding-top:4px;">${blocks[key]}</td></tr>` : '')
      .join('');
    return rows ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">${rows}</table>` : '';
  };

  // Border style logic
  let borderStyle = '';
  if (design.border.type === 'all') {
    borderStyle = `border:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === 'top') {
    borderStyle = `border-top:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === 'bottom') {
    borderStyle = `border-bottom:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === 'left') {
    borderStyle = `border-left:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === 'right') {
    borderStyle = `border-right:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  }

  if (design.border.radius && design.border.radius > 0) {
    borderStyle += ` border-radius:${design.border.radius}px; overflow:hidden;`;
  }

  const bgStyle = (() => {
    if (design.background.type === 'color' && design.background.color) {
      return `background-color:${design.background.color};`;
    }
    if (design.background.type === 'image' && design.background.imageUrl) {
      // In emails, background-image is tricky, but often supported if kept simple on a table or td
      return `background-image:url('${design.background.imageUrl}'); background-repeat:repeat; background-size:cover;`;
    }
    return '';
  })();

  const tableBgColorAttr = (design.background.type === 'color' && design.background.color) ? `bgcolor="${design.background.color}"` : '';

  // Separator rendering for horizontal / vertical
  const verticalSeparatorTd = sep.type === 'vertical'
    ? `<td style="width:${sep.thickness}px; background-color:${sep.color}; font-size:1px; line-height:1px; padding:0; margin:0;" width="${sep.thickness}">&nbsp;</td>`
    : '';

  const horizontalSeparatorTr = sep.type === 'horizontal'
    ? `<tr><td colspan="3" style="height:${sep.thickness}px; background-color:${sep.color}; font-size:1px; line-height:1px; padding:0; margin:${sep.margin}px 0;" height="${sep.thickness}">&nbsp;</td></tr>`
    : '';

  // Assemble based on selected Layout Preset
  let innerStructure = '';

  switch (layout.preset) {
    case 'layout-b': // Info Left, Logo Right
      innerStructure = `
        <tr>
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px;">
            ${(state.qr.position === 'left' && qrHtml) ? `<div style="padding-bottom:10px;">${qrHtml}</div>` : ''}
            ${buildOrderedInfoHtml()}
          </td>
          ${verticalSeparatorTd}
          <!-- Logo & QR Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; text-align:${layout.alignH}; padding-left:${p.innerSpacing}px;" width="${p.logoColumnWidth}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ''}
            ${(state.qr.position === 'right' && qrHtml) ? `<div style="padding-top:10px;">${qrHtml}</div>` : ''}
          </td>
        </tr>
      `;
      break;

    case 'layout-c': // Logo Top, Info Bottom (Format Vertical Mobile)
      innerStructure = `
        <tr>
          <td style="vertical-align:top; text-align:${layout.alignH}; padding-bottom:${p.innerSpacing}px;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; ${layout.alignH === 'center' ? 'margin:0 auto;' : ''}">
              <tr>
                ${(state.qr.position === 'left' && qrHtml) ? `<td style="vertical-align:middle; padding-right:12px;">${qrHtml}</td>` : ''}
                <td style="vertical-align:middle;">${logoHtml}</td>
                ${secondaryLogoHtml ? `<td style="vertical-align:middle; padding-left:12px;">${secondaryLogoHtml}</td>` : ''}
                ${(state.qr.position === 'right' && qrHtml) ? `<td style="vertical-align:middle; padding-left:12px;">${qrHtml}</td>` : ''}
              </tr>
            </table>
          </td>
        </tr>
        ${horizontalSeparatorTr}
        <tr>
          <td style="vertical-align:top; text-align:${layout.alignH}; padding-top:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml()}
          </td>
        </tr>
      `;
      break;

    case 'layout-d': // Centered Info (Format Centré Mobile Institutionnel)
      innerStructure = `
        <tr>
          <td style="vertical-align:middle; text-align:center;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin:0 auto; border-collapse:collapse; text-align:center;">
              ${orderedCenterRows}
            </table>
          </td>
        </tr>
      `;
      break;

    case 'layout-e': // 3-Column: Logo Left | Info Center | QR Code Right
      innerStructure = `
        <tr>
          <!-- Logo Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ''}
            ${(state.qr.position === 'left' && qrHtml) ? `<div style="padding-top:10px;">${qrHtml}</div>` : ''}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px; padding-right:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml()}
          </td>
          <!-- QR Column -->
          ${(state.qr.position === 'right' && qrHtml) ? `
            <td style="width:${p.qrSize + 20}px; vertical-align:${layout.alignV}; text-align:center; padding-left:${p.innerSpacing}px; border-left:1px solid #E2E8F0;" width="${p.qrSize + 20}">
              ${qrHtml}
            </td>
          ` : ''}
        </tr>
      `;
      break;

    case 'layout-f': // Horizontal Compact
      innerStructure = `
        <tr>
          <td style="width:120px; vertical-align:middle; padding-right:12px;" width="120">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:6px;">${secondaryLogoHtml}</div>` : ''}
            ${(state.qr.position === 'left' && qrHtml) ? `<div style="padding-top:8px;">${qrHtml}</div>` : ''}
          </td>
          ${verticalSeparatorTd}
          <td style="vertical-align:middle; padding-left:12px;">
            ${buildOrderedInfoHtml()}
          </td>
          ${(state.qr.position === 'right' && qrHtml) ? `
            <td style="vertical-align:middle; text-align:center; padding-left:12px;">
              ${qrHtml}
            </td>
          ` : ''}
        </tr>
      `;
      break;

    case 'layout-g': // Vertical Mobile-First Card (Refait à neuf sans déformation)
      innerStructure = `
        <tr>
          <td style="text-align:left; padding-bottom:8px; vertical-align:top;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                ${(state.qr.position === 'left' && qrHtml) ? `<td style="vertical-align:middle; padding-right:10px;">${qrHtml}</td>` : ''}
                <td style="vertical-align:middle;">${logoHtml}</td>
                ${secondaryLogoHtml ? `<td style="vertical-align:middle; padding-left:10px;">${secondaryLogoHtml}</td>` : ''}
                ${(state.qr.position === 'right' && qrHtml) ? `<td style="vertical-align:middle; padding-left:10px;">${qrHtml}</td>` : ''}
              </tr>
            </table>
          </td>
        </tr>
        ${horizontalSeparatorTr}
        <tr>
          <td style="text-align:left; padding-top:8px; vertical-align:top;">
            ${buildOrderedInfoHtml()}
          </td>
        </tr>
      `;
      break;

    case 'layout-i': // 3-Column: Logo Left | Info Center | Socials & QR Right (Carte RAGT Officielle)
      const rightSocialsHtml = state.visibility.socials ? buildSocialsHtml(state, iconCache, 'vertical') : '';
      const rightQrHtml = (state.qr.position === 'right' && qrHtml)
        ? `<tr><td style="text-align:center; padding-bottom:8px;" align="center">${qrHtml}</td></tr>`
        : '';
      const rightColumnHtml = `
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-table; text-align:center;">
          ${rightQrHtml}
          ${rightSocialsHtml ? `<tr><td style="text-align:center; vertical-align:middle;" align="center">${rightSocialsHtml}</td></tr>` : ''}
        </table>
      `;

      innerStructure = `
        <tr>
          <!-- Logo Column Left -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:middle; text-align:center; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}" align="center">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ''}
            ${(state.qr.position === 'left' && qrHtml) ? `<div style="padding-top:10px; text-align:center;">${qrHtml}</div>` : ''}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column Center: Photo on top, then Name & Title, then Coordinates -->
          <td style="vertical-align:middle; text-align:left; padding-left:${p.innerSpacing}px; padding-right:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml({ includeSocial: false })}
          </td>
          <!-- Socials Column Right: 4 white circular discs stacked vertically (and QR code if position is right) -->
          <td style="width:46px; vertical-align:middle; text-align:center; padding-left:${p.innerSpacing}px;" width="46" align="center">
             ${rightColumnHtml}
          </td>
        </tr>
        ${(state.qr.position === 'bottom' && qrHtml) ? `
          <tr>
            <td colspan="${verticalSeparatorTd ? 4 : 3}" align="center" style="text-align:center; padding-top:12px;">
              ${qrHtml}
            </td>
          </tr>
        ` : ''}
      `;
      break;
    case 'layout-h': // Layout with prominent banner
    case 'layout-a': // Default Layout A: Logo Left, Info Right
    default:
      innerStructure = `
        <tr>
          <!-- Left Banner Column if left position -->
          ${leftBannerHtml ? `
            <td style="vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px; text-align:left;">
              ${leftBannerHtml}
            </td>
          ` : ''}
          <!-- Logo Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ''}
            ${(state.qr.position === 'left' && qrHtml) ? `<div style="padding-top:10px;">${qrHtml}</div>` : ''}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml()}
          </td>
          <!-- Right QR if configured -->
          ${(state.qr.position === 'right' && qrHtml) ? `
            <td style="vertical-align:${layout.alignV}; text-align:right; padding-left:${p.innerSpacing}px;">
              ${qrHtml}
            </td>
          ` : ''}
          <!-- Right Banner Column if right position -->
          ${rightBannerHtml ? `
            <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px; text-align:right;">
              ${rightBannerHtml}
            </td>
          ` : ''}
        </tr>
      `;
      break;
  }

  const isMobilePreset = layout.preset === 'layout-c' || layout.preset === 'layout-d' || layout.preset === 'layout-g';
  const effectiveTotalWidth = isMobilePreset ? Math.min(p.totalWidth, 340) : p.totalWidth;
  const padLeft = isMobilePreset ? Math.min(p.paddingLeft, 12) : p.paddingLeft;
  const padRight = isMobilePreset ? Math.min(p.paddingRight, 12) : p.paddingRight;
  const padTop = isMobilePreset ? Math.min(p.paddingTop, 10) : p.paddingTop;
  const padBottom = isMobilePreset ? Math.min(p.paddingBottom, 10) : p.paddingBottom;

  // Complete wrapper with Microsoft Office conditional formatting comments and strict standard tables
  return `<!-- RAGT Semences Outlook Email Signature V3 -->
<!--[if mso]>
<style type="text/css">
  a, a:link, a:visited {
    text-decoration: none !important;
    mso-text-underline: none !important;
    text-underline-style: none !important;
  }
  span.MsoHyperlink, span.MsoHyperlinkFollowed {
    color: inherit !important;
    text-decoration: none !important;
    mso-text-underline: none !important;
    text-underline-style: none !important;
    mso-style-priority: 99 !important;
  }
</style>
<![endif]-->
<style type="text/css">
  /* Force email clients and Outlook not to underline links */
  a, a:link, a:visited, a:hover, a:active {
    text-decoration: none !important;
    text-underline-style: none !important;
    mso-text-underline: none !important;
  }
  span.MsoHyperlink, span.MsoHyperlinkFollowed {
    mso-style-priority: 99 !important;
    color: inherit !important;
    text-decoration: none !important;
    text-underline-style: none !important;
    mso-text-underline: none !important;
  }
  a[x-apple-data-detectors],
  .x-apple-data-detectors,
  .x-apple-data-detectors * {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }
  u + #body a {
    text-decoration: none !important;
  }
  #MessageViewBody a {
    color: inherit;
    text-decoration: none !important;
  }
</style>
<div style="font-family:${design.typography.baseFont}; max-width:100%;">
  ${topBannerHtml}
  ${state.renderMode === 'flattened-card' ? '' : `
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${effectiveTotalWidth}" ${tableBgColorAttr} style="width:${isMobilePreset ? '100%' : `${effectiveTotalWidth}px`}; max-width:${effectiveTotalWidth}px; ${bgStyle} ${borderStyle} border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tbody>
      <tr>
        <td ${tableBgColorAttr} style="padding:${padTop}px ${padRight}px ${padBottom}px ${padLeft}px;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
            <tbody>
              ${innerStructure}
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  `}
  ${campaignHtml || bottomBannerHtml}
</div>
<!-- End RAGT Signature -->`;
}
