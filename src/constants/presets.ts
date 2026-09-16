import { SignatureState } from '../types/signature';
import { RAGT_MAIN_LOGO_SVG, ISO_9001_LOGO_SVG } from './logos';

export const APP_VERSION = '3.0.0';

export const RAGT_PALETTE = {
  primaryNavy: '#0C3866',
  accentYellow: '#F7BD00',
  secondaryTeal: '#004B87',
  darkGray: '#2D3748',
  mediumGray: '#718096',
  lightGray: '#EDF2F7',
  white: '#FFFFFF',
  linkBlue: '#0C3866',
  leafGreen: '#15803D'
};

export const DEFAULT_SIGNATURE_STATE: SignatureState = {
  appVersion: APP_VERSION,
  presetName: 'Corporate Officiel',
  layout: {
    preset: 'layout-a',
    dimensions: {
      totalWidth: 540,
      logoColumnWidth: 145,
      infoColumnWidth: 380,
      qrSize: 75,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      innerSpacing: 16
    },
    separator: {
      type: 'vertical',
      color: '#F7BD00',
      thickness: 2,
      style: 'solid',
      margin: 12
    },
    alignH: 'left',
    alignV: 'middle',
    blockOrder: [
      'logo',
      'identity',
      'job',
      'company',
      'coordinates',
      'social',
      'qr',
      'slogan',
      'banner'
    ]
  },
  personal: {
    civility: 'M.',
    firstName: 'Grégory',
    lastName: 'AMADO',
    jobTitle: 'Support informatique',
    department: 'Systèmes d’Information',
    service: 'Assistance Utilisateurs',
    company: 'RAGT Semences',
    subsidiary: 'Siège Social',
    phone: '05 65 73 41 66',
    mobile: '06 12 34 56 78',
    fax: '',
    directPhone: '05 65 73 41 66',
    standardPhone: '05 65 73 41 00',
    email: 'gregory.amado@ragt.com',
    addressLine1: 'Rue Emile Singla',
    addressLine2: 'Site de Bourran',
    postalCode: '12000',
    city: 'Rodez',
    country: 'France',
    website: 'https://www.ragt.fr'
  },
  labels: {
    phone: 'Tél.',
    mobile: 'Mob.',
    fax: 'Fax',
    standardPhone: 'Standard',
    directPhone: 'Direct',
    email: 'E-mail',
    address: 'Adr.',
    website: 'Web'
  },
  visibility: {
    civility: false,
    firstName: true,
    lastName: true,
    jobTitle: true,
    department: false,
    service: false,
    company: true,
    subsidiary: false,
    phone: true,
    mobile: true,
    fax: false,
    directPhone: false,
    standardPhone: false,
    email: true,
    address: true,
    website: true,
    logo: true,
    secondaryLogo: false,
    qr: false,
    socials: true,
    banner: false,
    campaign: false,
    slogan: true
  },
  design: {
    colors: {
      primary: '#0C3866',
      secondary: '#F7BD00',
      text: '#2D3748',
      muted: '#718096',
      links: '#0C3866',
      firstName: '#0C3866',
      lastName: '#0C3866',
      jobTitle: '#718096',
      company: '#0C3866',
      phone: '#2D3748',
      mobile: '#2D3748',
      email: '#0C3866',
      website: '#0C3866',
      address: '#718096',
      icons: '#F7BD00',
      separator: '#F7BD00',
      background: '#FFFFFF',
      slogan: '#0C3866',
      qrFg: '#0C3866',
      qrBg: '#FFFFFF'
    },
    typography: {
      baseFont: 'Arial, Helvetica, sans-serif',
      name: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: 1.2,
        letterSpacing: 0.5,
        color: '#0C3866'
      },
      jobTitle: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'italic',
        textDecoration: 'none',
        lineHeight: 1.3,
        letterSpacing: 0,
        color: '#718096'
      },
      company: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: '#0C3866'
      },
      coordinates: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 11,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: 1.4,
        letterSpacing: 0,
        color: '#2D3748'
      },
      slogan: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecoration: 'none',
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: '#0C3866'
      },
      legal: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 9,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: 1.2,
        letterSpacing: 0,
        color: '#A0AEC0'
      }
    },
    background: {
      type: 'none',
      color: '#FFFFFF',
      imageUrl: '',
      pattern: 'none',
      opacity: 0.05,
      size: 'auto'
    },
    border: {
      type: 'none',
      color: '#E2E8F0',
      thickness: 1,
      style: 'solid',
      radius: 6
    }
  },
  logos: {
    primary: {
      id: 'ragt-main',
      label: 'Logo RAGT Semences',
      url: RAGT_MAIN_LOGO_SVG,
      alt: 'Logo RAGT Semences',
      width: 145,
      height: 45,
      keepRatio: true,
      linkUrl: 'https://www.ragt.fr',
      align: 'center',
      visible: true
    },
    secondary: {
      id: 'iso-cert',
      label: 'Certification Qualité',
      url: ISO_9001_LOGO_SVG,
      alt: 'Certification ISO 9001',
      width: 90,
      height: 44,
      keepRatio: true,
      linkUrl: 'https://www.ragt.fr',
      align: 'center',
      visible: false
    },
    certification: {
      id: 'cert-empty',
      label: 'Logo Partenaire',
      url: '',
      alt: 'Partenaire',
      width: 80,
      height: 40,
      keepRatio: true,
      linkUrl: '',
      align: 'left',
      visible: false
    }
  },
  iconSettings: {
    style: 'circle',
    size: 13,
    color: '#F7BD00',
    spacing: 6
  },
  qr: {
    type: 'vcard',
    customText: '',
    position: 'right',
    size: 75,
    fgColor: '#0C3866',
    bgColor: '#FFFFFF',
    errorCorrectionLevel: 'M',
    margin: 1,
    visible: false
  },
  social: {
    style: 'icons-only',
    iconSize: 16,
    spacing: 8,
    align: 'left',
    items: [
      {
        id: 'website',
        name: 'Site Web RAGT',
        url: 'https://www.ragt-semences.fr',
        active: false,
        iconStyle: 'circle',
        color: '#0C3866'
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/ragt',
        active: true,
        iconStyle: 'circle',
        color: '#0077B5'
      },
      {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://www.facebook.com/ragt',
        active: true,
        iconStyle: 'circle',
        color: '#1877F2'
      },
      {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://www.instagram.com/ragt',
        active: true,
        iconStyle: 'circle',
        color: '#E4405F'
      },
      {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://www.youtube.com/user/ragt',
        active: true,
        iconStyle: 'circle',
        color: '#CD201F'
      },
      {
        id: 'x',
        name: 'X (Twitter)',
        url: 'https://twitter.com/ragt',
        active: false,
        iconStyle: 'circle',
        color: '#000000'
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        url: 'https://www.tiktok.com/@ragt',
        active: false,
        iconStyle: 'circle',
        color: '#000000'
      }
    ]
  },
  utm: {
    enabled: false,
    source: 'email_signature',
    medium: 'email',
    campaign: 'ragt_signature'
  },
  banner: {
    enabled: false,
    title: 'Campagne SPACE 2026',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    linkUrl: 'https://www.ragt-semences.com/evenements',
    altText: 'Retrouvez RAGT Semences au salon SPACE 2026',
    width: 480,
    height: 90,
    marginTop: 12,
    marginBottom: 4,
    position: 'bottom',
    buttonText: 'En savoir plus',
    campaignName: 'SPACE 2026 - Hall 4 Stand B22',
    startDate: '2026-09-15',
    endDate: '2026-09-18'
  },
  campaign: {
    enabled: false,
    title: 'Innovation variétale',
    campaignName: 'Génétique & performance',
    imageUrl: '/assets/bannieres/046806_BD.jpg',
    linkUrl: 'https://www.ragt-semences.fr',
    altText: 'Innovation variétale RAGT',
    width: 540,
    height: 90,
    startDate: '',
    endDate: ''
  },
  slogan: {
    enabled: true,
    text: 'Des semences pour demain',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#0C3866',
    align: 'left',
    marginTop: 8,
    marginBottom: 4,
    position: 'above-footer'
  }
};

export const CARTE_RAGT_SAMPLE_DATA = {
  civility: 'Mme',
  firstName: 'Angela',
  lastName: 'DIAZ MARTINEZ',
  jobTitle: 'Marketing manager',
  company: 'RAGT Semences',
  phone: '+33 679 29 30 07',
  mobile: '',
  email: 'angela.diaz-martinez@ragt.com',
  addressLine1: '123 Anywhere ST.',
  addressLine2: '',
  postalCode: '12345',
  city: 'Any City, ST',
  country: 'France',
  website: 'https://www.ragt-semences.fr'
};

export interface SignaturePresetDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  apply: (base: SignatureState) => SignatureState;
}

export const SIGNATURE_PRESETS: SignaturePresetDefinition[] = [
  {
    id: 'carte-ragt-officielle',
    name: 'Carte RAGT',
    category: 'Institutionnel',
    description: 'Format officiel fidèle à la carte : fond jaune RAGT (#FDC420), logo à gauche, photo agronomique au centre avec votre signature, 4 réseaux sociaux en pastilles blanches à droite.',
    apply: (base) => ({
      ...base,
      presetName: 'Carte RAGT',
      layout: {
        ...base.layout,
        preset: 'layout-i',
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 540,
          logoColumnWidth: 125,
          infoColumnWidth: 320,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 16,
          paddingRight: 16,
          innerSpacing: 14
        },
        separator: { ...base.layout.separator, type: 'none' },
        alignV: 'middle'
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: '#0C3866',
          secondary: '#1E4143',
          text: '#0C3866',
          firstName: '#0C3866',
          lastName: '#0C3866',
          jobTitle: '#1E4143',
          phone: '#0C3866',
          mobile: '#0C3866',
          email: '#0C3866',
          address: '#0C3866',
          website: '#0C3866',
          icons: '#ffffff',
          background: '#FDC420'
        },
        background: {
          type: 'color',
          color: '#FDC420',
          imageUrl: '',
          pattern: 'none',
          opacity: 1,
          size: 'cover'
        },
        border: {
          ...base.design.border,
          type: 'none',
          radius: 10
        },
        typography: {
          ...base.design.typography,
          name: {
            ...base.design.typography.name,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 16,
            fontWeight: 'bold',
            color: '#0C3866',
            letterSpacing: 0.5
          },
          jobTitle: {
            ...base.design.typography.jobTitle,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'normal',
            color: '#1E4143'
          },
          coordinates: {
            ...base.design.typography.coordinates,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 11,
            color: '#0C3866'
          }
        }
      },
      logos: {
        ...base.logos,
        primary: {
          ...base.logos.primary,
          url: '/assets/logos/logo_ragt.png',
          width: 95,
          height: 100,
          visible: true
        },
        secondary: {
          ...base.logos.secondary,
          visible: false
        }
      },
      iconSettings: {
        style: 'circle',
        size: 16,
        color: '#ffffff',
        spacing: 8
      },
      labels: {
        phone: '',
        mobile: '',
        fax: '',
        standardPhone: '',
        directPhone: '',
        email: '',
        address: '',
        website: ''
      },
      banner: {
        ...base.banner,
        enabled: true,
        imageUrl: '/assets/bannieres/photo_carte_ragt.png',
        altText: 'Photo agronomie RAGT',
        position: 'center',
        width: 175,
        height: 84,
        marginTop: 0,
        marginBottom: 8
      },
      social: {
        ...base.social,
        style: 'icons-only',
        iconSize: 20,
        spacing: 8,
        align: 'right',
        items: [
          {
            id: 'website',
            name: 'Site Web RAGT',
            url: 'https://www.ragt-semences.fr',
            active: true,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'youtube',
            name: 'YouTube',
            url: 'https://www.youtube.com/user/ragt',
            active: true,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'facebook',
            name: 'Facebook',
            url: 'https://www.facebook.com/ragt',
            active: true,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'instagram',
            name: 'Instagram',
            url: 'https://www.instagram.com/ragt',
            active: true,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'linkedin',
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/ragt',
            active: false,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'x',
            name: 'X (Twitter)',
            url: 'https://twitter.com/ragt',
            active: false,
            iconStyle: 'circle',
            color: '#ffffff'
          },
          {
            id: 'tiktok',
            name: 'TikTok',
            url: 'https://www.tiktok.com/@ragt',
            active: false,
            iconStyle: 'circle',
            color: '#ffffff'
          }
        ]
      },
      visibility: {
        ...base.visibility,
        logo: true,
        secondaryLogo: false,
        banner: true,
        socials: true,
        slogan: false,
        company: false,
        qr: false,
        phone: true,
        mobile: !!base.personal.mobile,
        email: true,
        address: true,
        website: false
      }
    })
  },
  {
    id: 'corporate',
    name: 'Corporate Officiel',
    category: 'Institutionnel',
    description: 'Structure équilibrée standard RAGT Semences, logo à gauche avec filet jaune vertical.',
    apply: (base) => ({
      ...base,
      presetName: 'Corporate Officiel',
      layout: {
        ...base.layout,
        preset: 'layout-a',
        separator: { ...base.layout.separator, type: 'vertical', color: '#F7BD00', thickness: 2 }
      },
      visibility: {
        ...base.visibility,
        logo: true,
        qr: false,
        banner: false,
        slogan: true
      }
    })
  },
  {
    id: 'carte-visite-ragt',
    name: 'Carte de visite RAGT',
    category: 'Institutionnel',
    description: 'Carte claire et compacte : logo, coordonnées, QR vCard et réseaux RAGT dans un format de prise de contact.',
    apply: (base) => ({
      ...base,
      presetName: 'Carte de visite RAGT',
      layout: {
        ...base.layout,
        preset: 'layout-e',
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 520,
          logoColumnWidth: 110,
          qrSize: 84,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 16,
          paddingRight: 16,
          innerSpacing: 14
        },
        separator: { ...base.layout.separator, type: 'vertical', color: '#F7BD00', thickness: 3 },
        alignV: 'middle'
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: '#0C3866',
          text: '#0C3866',
          firstName: '#0C3866',
          lastName: '#0C3866',
          jobTitle: '#285D63',
          phone: '#0C3866',
          mobile: '#0C3866',
          email: '#0C3866',
          address: '#0C3866',
          icons: '#0C3866',
          background: '#FFFFFF'
        },
        background: { ...base.design.background, type: 'color', color: '#FFFFFF', imageUrl: '', pattern: 'none', opacity: 1 },
        border: { ...base.design.border, type: 'all', color: '#E2E8F0', thickness: 1, style: 'solid', radius: 10 }
      },
      logos: {
        ...base.logos,
        primary: {
          ...base.logos.primary,
          id: 'ragt-business-card-logo',
          label: 'Logo officiel RAGT Semences',
          url: '/assets/logos/logo_ragt.png',
          alt: 'Logo RAGT Semences',
          width: 88,
          height: 88,
          visible: true
        }
      },
      iconSettings: { ...base.iconSettings, style: 'circle', size: 14, color: '#0C3866', spacing: 6 },
      qr: { ...base.qr, type: 'vcard', position: 'right', size: 84, fgColor: '#0C3866', bgColor: '#FFFFFF', visible: true },
      social: { ...base.social, style: 'icons-only', iconSize: 15, spacing: 6, align: 'left' },
      visibility: {
        ...base.visibility,
        logo: true,
        secondaryLogo: false,
        company: true,
        phone: true,
        mobile: true,
        email: true,
        address: true,
        website: false,
        qr: true,
        socials: true,
        banner: false,
        slogan: false
      }
    })
  },
  {
    id: 'premium-ragt',
    name: 'Premium RAGT',
    category: 'Premium',
    description: 'Carte de contact haut de gamme : composition trois colonnes, QR vCard, filet doré et cadre bleu RAGT.',
    apply: (base) => ({
      ...base,
      presetName: 'Premium RAGT',
      layout: {
        ...base.layout,
        preset: 'layout-e',
        dimensions: { ...base.layout.dimensions, totalWidth: 540, logoColumnWidth: 120, qrSize: 86, innerSpacing: 16 },
        separator: { ...base.layout.separator, type: 'vertical', color: '#F7BD00', thickness: 3, style: 'solid', margin: 12 },
        alignV: 'middle'
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: '#0C3866',
          secondary: '#F7BD00',
          text: '#2D3748',
          firstName: '#0C3866',
          lastName: '#0C3866',
          jobTitle: '#285D63',
          phone: '#2D3748',
          mobile: '#2D3748',
          email: '#0C3866',
          website: '#0C3866',
          address: '#718096',
          icons: '#0C3866',
          background: '#FFFFFF'
        },
        background: { ...base.design.background, type: 'color', color: '#FFFFFF', imageUrl: '', pattern: 'none', opacity: 1 },
        border: { ...base.design.border, type: 'all', color: '#0C3866', thickness: 2, style: 'solid', radius: 10 },
        typography: {
          ...base.design.typography,
          name: { ...base.design.typography.name, fontSize: 17, fontWeight: 'bold', color: '#0C3866' },
          jobTitle: { ...base.design.typography.jobTitle, fontSize: 12, fontWeight: '500', fontStyle: 'normal', color: '#285D63' },
          coordinates: { ...base.design.typography.coordinates, fontSize: 11, color: '#2D3748' }
        }
      },
      logos: {
        ...base.logos,
        primary: { ...base.logos.primary, width: 105, height: 33, keepRatio: true, visible: true },
        secondary: { ...base.logos.secondary, visible: true }
      },
      iconSettings: { ...base.iconSettings, style: 'minimal', size: 13, color: '#0C3866', spacing: 6 },
      qr: { ...base.qr, type: 'vcard', position: 'right', size: 86, fgColor: '#0C3866', bgColor: '#FFFFFF', errorCorrectionLevel: 'M', visible: true },
      social: { ...base.social, style: 'icons-only', iconSize: 15, spacing: 6, align: 'left' },
      slogan: { ...base.slogan, enabled: true, text: 'Des semences pour demain', fontSize: 11, color: '#0C3866', align: 'left' },
      visibility: { ...base.visibility, logo: true, secondaryLogo: true, company: true, phone: true, mobile: true, email: true, address: true, website: true, qr: true, socials: true, banner: false, slogan: true }
    })
  },
  {
    id: 'commercial',
    name: 'Commercial & Terroir',
    category: 'Métier',
    description: 'Coordonnées directes mises en valeur, QR code vCard intégré pour prise de contact rapide.',
    apply: (base) => ({
      ...base,
      presetName: 'Commercial & Terroir',
      layout: {
        ...base.layout,
        preset: 'layout-e',
        separator: { ...base.layout.separator, type: 'vertical', color: '#0C3866', thickness: 2 }
      },
      visibility: {
        ...base.visibility,
        phone: true,
        mobile: true,
        qr: true,
        slogan: true,
        banner: false
      },
      qr: {
        ...base.qr,
        visible: true,
        type: 'vcard',
        position: 'right'
      }
    })
  },
  {
    id: 'salon-space',
    name: 'Salon SPACE & Événement',
    category: 'Campagne',
    description: 'Intègre une bannière événementielle inférieure avec slogan de campagne.',
    apply: (base) => ({
      ...base,
      presetName: 'Salon SPACE & Événement',
      layout: {
        ...base.layout,
        preset: 'layout-h'
      },
      visibility: {
        ...base.visibility,
        banner: true,
        slogan: true
      },
      banner: {
        ...base.banner,
        enabled: true,
        title: 'Retrouvez-nous au SPACE 2026',
        campaignName: 'SPACE 2026'
      }
    })
  },
  {
    id: 'minimalist',
    name: 'Minimaliste Express',
    category: 'Épuré',
    description: 'Signature ultra légère, idéale pour échanges rapides et réponses fréquentes.',
    apply: (base) => ({
      ...base,
      presetName: 'Minimaliste Express',
      layout: {
        ...base.layout,
        preset: 'layout-f',
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 460,
          paddingTop: 6,
          paddingBottom: 6
        },
        separator: { ...base.layout.separator, type: 'none' }
      },
      visibility: {
        ...base.visibility,
        address: false,
        socials: false,
        qr: false,
        banner: false,
        slogan: false
      }
    })
  },
  {
    id: 'recrutement',
    name: 'RH & Recrutement',
    category: 'Institutionnel',
    description: 'Met en avant la marque employeur et les réseaux sociaux professionnels.',
    apply: (base) => ({
      ...base,
      presetName: 'RH & Recrutement',
      layout: {
        ...base.layout,
        preset: 'layout-a'
      },
      slogan: {
        ...base.slogan,
        enabled: true,
        text: 'Rejoignez nos équipes — ragt.fr/carrieres'
      },
      visibility: {
        ...base.visibility,
        slogan: true,
        socials: true
      }
    })
  },
  {
    id: 'mobile-friendly',
    name: 'Mobile Compact',
    category: 'Responsive',
    description: 'Format vertical empilé ultra compatible sur petits écrans et smartphones.',
    apply: (base) => ({
      ...base,
      presetName: 'Mobile Compact',
      layout: {
        ...base.layout,
        preset: 'layout-g',
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 360
        },
        separator: { ...base.layout.separator, type: 'horizontal', color: '#F7BD00', thickness: 2 }
      },
      visibility: {
        ...base.visibility,
        qr: false
      }
    })
  }
];
