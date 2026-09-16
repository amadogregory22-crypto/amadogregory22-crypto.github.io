import { SignatureState, ValidationItem, ClientCompatibilityScore } from '../types/signature';

export interface SignatureDiagnostic {
  items: ValidationItem[];
  scorePercent: number;
  htmlSizeKb: number;
  imagesCount: number;
  linksCount: number;
  clientScores: ClientCompatibilityScore[];
  summary: {
    errorsCount: number;
    warningsCount: number;
    okCount: number;
  };
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrast(color1: string, color2: string) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const l1 = getLuminance(c1.r, c1.g, c1.b);
  const l2 = getLuminance(c2.r, c2.g, c2.b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function validateSignature(state: SignatureState, rawHtml: string): SignatureDiagnostic {
  const items: ValidationItem[] = [];
  const { personal, visibility, logos, banner, qr, layout } = state;

  // 1. Identity Check
  if (!personal.lastName || !personal.firstName) {
    items.push({
      id: 'name-missing',
      category: 'personal',
      label: 'Identité complète',
      status: 'error',
      message: 'Le prénom et le nom de famille doivent être renseignés.'
    });
  } else {
    items.push({
      id: 'name-ok',
      category: 'personal',
      label: 'Identité complète',
      status: 'ok',
      message: `Collaborateur : ${personal.firstName} ${personal.lastName}`
    });
  }

  if (visibility.jobTitle && !personal.jobTitle) {
    items.push({
      id: 'job-missing',
      category: 'personal',
      label: 'Fonction du collaborateur',
      status: 'warning',
      message: 'La fonction est vide. Elle aide le destinataire à comprendre immédiatement le rôle de la personne.'
    });
  }

  // 2. Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!personal.email) {
    items.push({
      id: 'email-missing',
      category: 'personal',
      label: 'Adresse e-mail',
      status: 'error',
      message: 'L’adresse e-mail professionnelle est obligatoire.'
    });
  } else if (!emailRegex.test(personal.email)) {
    items.push({
      id: 'email-invalid',
      category: 'personal',
      label: 'Adresse e-mail',
      status: 'warning',
      message: 'Format d’adresse e-mail suspect ou incomplet.'
    });
  } else {
    items.push({
      id: 'email-ok',
      category: 'personal',
      label: 'Adresse e-mail professionnelle',
      status: 'ok',
      message: `${personal.email} est valide`
    });
  }

  if (visibility.logo && logos.primary.url && !logos.primary.keepRatio) {
    items.push({
      id: 'logo-ratio',
      category: 'images',
      label: 'Proportions du logo',
      status: 'warning',
      message: 'La conservation des proportions du logo est désactivée. Réactivez-la pour éviter une déformation.'
    });
  }

  // 3. Phone checks
  if (visibility.phone && !personal.phone && visibility.mobile && !personal.mobile) {
    items.push({
      id: 'phone-empty',
      category: 'personal',
      label: 'Numéros de contact',
      status: 'warning',
      message: 'Aucun téléphone ni portable renseigné alors que le bloc est visible.'
    });
  } else {
    items.push({
      id: 'phone-ok',
      category: 'personal',
      label: 'Téléphonie & Mobilité',
      status: 'ok',
      message: 'Numéro de téléphone direct ou mobile actif'
    });
  }

  // 4. Logo validation
  if (visibility.logo && !logos.primary.url) {
    items.push({
      id: 'logo-missing',
      category: 'images',
      label: 'Logo principal',
      status: 'error',
      message: 'Le logo est activé mais aucune source d’image n’a été fournie.'
    });
  } else {
    items.push({
      id: 'logo-ok',
      category: 'images',
      label: 'Logo institutionnel',
      status: 'ok',
      message: `Logo présent (${logos.primary.width}×${logos.primary.height} px)`
    });
  }

  // 5. Width checks (Responsive & Outlook layout)
  if (layout.dimensions.totalWidth > 650) {
    items.push({
      id: 'width-excessive',
      category: 'outlook',
      label: 'Largeur totale',
      status: 'warning',
      message: `La largeur (${layout.dimensions.totalWidth}px) dépasse les 650px recommandés pour Outlook.`
    });
  } else {
    items.push({
      id: 'width-ok',
      category: 'outlook',
      label: 'Largeur standard e-mail',
      status: 'ok',
      message: `Largeur ${layout.dimensions.totalWidth}px compatible avec la règle automatique du Studio.`
    });
  }

  // 6. QR Code validation
  if (visibility.qr) {
    if (qr.type === 'vcard' && (!personal.email && !personal.phone)) {
      items.push({
        id: 'qr-incomplete',
        category: 'qr',
        label: 'Contenu QR vCard',
        status: 'warning',
        message: 'Le QR Code vCard manque de données de contact.'
      });
    } else {
      items.push({
        id: 'qr-ok',
        category: 'qr',
        label: 'Génération QR Code',
        status: 'ok',
        message: `QR actif encodant un format ${qr.type.toUpperCase()}`
      });
    }
    if (qr.size < 60) {
      items.push({
        id: 'qr-size',
        category: 'qr',
        label: 'Taille du QR Code',
        status: 'warning',
        message: `Le QR Code mesure ${qr.size}px. Prévoyez au moins 60px pour un scan fiable.`
      });
    }
    const qrContrast = getContrast(qr.fgColor || '#0C3866', qr.bgColor || '#FFFFFF');
    if (qrContrast < 4.5) {
      items.push({
        id: 'qr-contrast',
        category: 'qr',
        label: 'Contraste du QR Code',
        status: 'warning',
        message: `Le contraste du QR Code (${qrContrast.toFixed(1)}:1) est faible. Utilisez un premier plan sombre sur fond clair.`
      });
    }
  }

  const inactiveLinks = state.social.items.filter((item) => item.active && !item.url);
  if (visibility.socials && inactiveLinks.length > 0) {
    items.push({
      id: 'social-link-missing',
      category: 'links',
      label: 'Liens des réseaux sociaux',
      status: 'warning',
      message: `${inactiveLinks.length} réseau(x) actif(s) sans lien. Ajoutez une URL ou désactivez-les.`
    });
  }

  // 7. Banner validation
  if (visibility.banner && banner.enabled) {
    if (!banner.imageUrl) {
      items.push({
        id: 'banner-empty',
        category: 'images',
        label: 'Bannière de campagne',
        status: 'warning',
        message: 'Bannière activée sans image fournie.'
      });
    } else {
      items.push({
        id: 'banner-ok',
        category: 'images',
        label: 'Bannière de campagne',
        status: 'ok',
        message: `Bannière configurée avec lien de redirection`
      });
    }
    if (!banner.altText?.trim()) {
      items.push({
        id: 'banner-alt-missing',
        category: 'a11y',
        label: 'Texte alternatif de l’image',
        status: 'warning',
        message: 'Ajoutez une description de l’image pour les images bloquées et les lecteurs d’écran.'
      });
    }
  }

  // 8. Security & HTML checks
  if (rawHtml.includes('javascript:')) {
    items.push({
      id: 'sec-js',
      category: 'security',
      label: 'Sécurité du code',
      status: 'error',
      message: 'Un protocole non autorisé javascript: a été détecté.'
    });
  } else {
    items.push({
      id: 'sec-ok',
      category: 'security',
      label: 'Sécurité et conformité HTML',
      status: 'ok',
      message: 'Aucun protocole javascript: n’a été détecté dans le HTML généré.'
    });
  }

  // 9. Data URI warning for old Outlook versions
  if (logos.primary.url.startsWith('data:image')) {
    items.push({
      id: 'img-datauri',
      category: 'outlook',
      label: 'Format des images',
      status: 'warning',
      message: 'Data URI détecté. Fonctionne dans l’éditeur et OWA/Gmail. En production Outlook Windows classique, privilégier des URLs HTTPS hébergées.'
    });
  }

  // 10. Real-time Outlook CSS compatibility checks
  const flexMatch = rawHtml.match(/display:\s*flex/i);
  const gridMatch = rawHtml.match(/display:\s*grid/i);
  const absoluteMatch = rawHtml.match(/position:\s*absolute/i);
  const marginAutoMatch = rawHtml.match(/margin:\s*auto/i);

  if (flexMatch || gridMatch || absoluteMatch || marginAutoMatch) {
    items.push({
      id: 'css-outlook-unsupported',
      category: 'outlook',
      label: 'CSS non supporté par Outlook',
      status: 'error',
      message: 'Propriétés CSS modernes détectées (flex, grid, absolute ou margin: auto). Utilisez exclusivement des tableaux (<table>) pour la mise en page sous Outlook.'
    });
  } else {
    items.push({
      id: 'css-outlook-ok',
      category: 'outlook',
      label: 'Compatibilité CSS Outlook',
      status: 'ok',
      message: 'Aucune propriété CSS bloquante de la règle automatique n’a été détectée. Une recette Outlook reste nécessaire.'
    });
  }

  items.push({
    id: 'outlook-manual-review',
    category: 'outlook',
    label: 'Recette clients e-mail',
    status: 'warning',
    message: 'Contrôles automatiques terminés. Tester et consigner Outlook classique, New Outlook et Outlook Web avant de déclarer la signature validée.'
  });

  // 9. Accessibility (WCAG Contrast)
  const bgColor = state.design.background.type === 'color' && state.design.background.color
    ? state.design.background.color
    : '#FFFFFF';
  
  const textContrast = getContrast(state.design.colors.text, bgColor);
  if (textContrast < 4.5) {
    items.push({
      id: 'a11y-text-contrast',
      category: 'a11y',
      label: 'Contraste du texte',
      status: 'warning',
      message: `Le contraste du texte principal (${textContrast.toFixed(1)}:1) est inférieur au standard WCAG AA (4.5:1). Recommandé: assombrir le texte ou éclaircir le fond.`
    });
  } else {
    items.push({
      id: 'a11y-text-contrast',
      category: 'a11y',
      label: 'Contraste du texte',
      status: 'ok',
      message: `Le contraste texte/fond est excellent (${textContrast.toFixed(1)}:1).`
    });
  }

  const linkContrast = getContrast(state.design.colors.links, bgColor);
  if (linkContrast < 4.5) {
    items.push({
      id: 'a11y-link-contrast',
      category: 'a11y',
      label: 'Contraste des liens',
      status: 'warning',
      message: `Le contraste des liens (${linkContrast.toFixed(1)}:1) est faible. Recommandé: > 4.5:1 pour une bonne lisibilité.`
    });
  }

  // Calculate stats
  const htmlSizeKb = Number((new Blob([rawHtml]).size / 1024).toFixed(1));
  const imagesMatches = rawHtml.match(/<img\s/gi);
  const imagesCount = imagesMatches ? imagesMatches.length : 0;
  const linksMatches = rawHtml.match(/<a\s/gi);
  const linksCount = linksMatches ? linksMatches.length : 0;

  const errorsCount = items.filter((i) => i.status === 'error').length;
  const warningsCount = items.filter((i) => i.status === 'warning').length;
  const okCount = items.filter((i) => i.status === 'ok').length;

  const totalPoints = items.length * 2;
  const earnedPoints = okCount * 2 + warningsCount * 1;
  const scorePercent = Math.round((earnedPoints / (totalPoints || 1)) * 100);

  // Generated HTML can be checked automatically, but no client is declared
  // compatible until a dated manual recipe has been documented.
  const clientScores: ClientCompatibilityScore[] = [
    {
      client: 'Outlook Windows (Classique / 365)',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner avec la version exacte du client.'
    },
    {
      client: 'New Outlook (Windows / Mac)',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner avec la version exacte du client.'
    },
    {
      client: 'Outlook Web (OWA / Office 365)',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner avec le navigateur et la version utilisés.'
    },
    {
      client: 'Outlook mobile',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner sur les appareils réellement utilisés.'
    },
    {
      client: 'Gmail Web',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner après collage et envoi de contrôle.'
    },
    {
      client: 'Outlook.com',
      stars: 0,
      status: 'unverified',
      notes: 'Recette manuelle à consigner après collage et envoi de contrôle.'
    }
  ];

  return {
    items,
    scorePercent,
    htmlSizeKb,
    imagesCount,
    linksCount,
    clientScores,
    summary: {
      errorsCount,
      warningsCount,
      okCount
    }
  };
}
