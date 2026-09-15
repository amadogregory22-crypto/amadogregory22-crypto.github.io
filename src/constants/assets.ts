export interface ClassifiedPngAsset {
  id: string;
  originalFileName: string;
  name: string;
  menuTarget: 'logos' | 'templates' | 'banner' | 'design';
  menuLabel: string;
  subCategory: string;
  url: string;
  fallbackUrls?: string[];
  width: number;
  height: number;
  description: string;
  badge: string;
}

// All PNG assets originally placed at project root or public root, classified into their application menus
export const CLASSIFIED_PNG_ASSETS: ClassifiedPngAsset[] = [
  {
    id: 'png-logo-ragt-embleme',
    originalFileName: 'Capture d’écran 2026-09-14 112409.png',
    name: 'Logo Officiel RAGT (Emblème Haute Résolution)',
    menuTarget: 'logos',
    menuLabel: 'Logos & Icônes',
    subCategory: 'Logos & Emblèmes RAGT',
    url: '/assets/uploads/logo_ragt.png',
    fallbackUrls: [
      '/assets/logos/logo_ragt.png',
      '/assets/logos/Capture d’écran 2026-09-14 112409.png'
    ],
    width: 957,
    height: 1005,
    description: 'Emblème corporate officiel RAGT Semences (Jaune or & Vert turquoise). Classé dans le menu « Logos & Icônes ».',
    badge: 'Menu Logos'
  },
  {
    id: 'png-signature-com-1',
    originalFileName: '6ddaec15-be56-451a-a316-6c8017a63885.png',
    name: 'Signature Graphique Communication — Variante 1',
    menuTarget: 'templates',
    menuLabel: 'Modèles & Sauvegardes / Signatures Com',
    subCategory: 'Signatures Communication',
    url: '/assets/uploads/6ddaec15-be56-451a-a316-6c8017a63885.png',
    fallbackUrls: [
      '/assets/signatures/6ddaec15-be56-451a-a316-6c8017a63885.png'
    ],
    width: 345,
    height: 173,
    description: 'Signature e-mail complète créée par le service communication (Format horizontal jaune). Classée dans « Modèles » et « Logos ».',
    badge: 'Menu Modèles'
  },
  {
    id: 'png-signature-com-2',
    originalFileName: 'a3d7dcd5-94b8-49e3-98d3-274cce590391.png',
    name: 'Signature Graphique Communication — Variante 2',
    menuTarget: 'templates',
    menuLabel: 'Modèles & Sauvegardes / Signatures Com',
    subCategory: 'Signatures Communication',
    url: '/assets/uploads/a3d7dcd5-94b8-49e3-98d3-274cce590391.png',
    fallbackUrls: [
      '/assets/signatures/a3d7dcd5-94b8-49e3-98d3-274cce590391.png'
    ],
    width: 344,
    height: 172,
    description: 'Variante visuelle communication avec mise en avant du bloc coordonnées. Classée dans « Modèles » et « Logos ».',
    badge: 'Menu Modèles'
  },
  {
    id: 'png-signature-com-3',
    originalFileName: 'e95bc73e-a651-4ba3-a84e-eb93ed1f20a2.png',
    name: 'Signature Graphique Communication — Variante 3',
    menuTarget: 'templates',
    menuLabel: 'Modèles & Sauvegardes / Signatures Com',
    subCategory: 'Signatures Communication',
    url: '/assets/uploads/e95bc73e-a651-4ba3-a84e-eb93ed1f20a2.png',
    fallbackUrls: [
      '/assets/signatures/e95bc73e-a651-4ba3-a84e-eb93ed1f20a2.png'
    ],
    width: 355,
    height: 179,
    description: 'Variante communication avec marges optimisées. Classée dans « Modèles » et « Logos ».',
    badge: 'Menu Modèles'
  },
  {
    id: 'png-banner-bags',
    originalFileName: 'bags_signature.png',
    name: 'Bannière Photo — Sacs de semences RAGT',
    menuTarget: 'banner',
    menuLabel: 'Bannière & Slogan',
    subCategory: 'Bandeaux & Fonds Photo',
    url: '/assets/bannieres/bags_signature.png',
    fallbackUrls: [
      '/bags_signature.png'
    ],
    width: 2232,
    height: 1504,
    description: 'Photographie institutionnelle des sacs de semences RAGT en haute définition. Classée dans le menu « Bannière & Slogan ».',
    badge: 'Menu Bannière'
  },
  {
    id: 'png-banner-field',
    originalFileName: 'image_signature.png',
    name: 'Bannière Photo — Champ & Culture agricole RAGT',
    menuTarget: 'banner',
    menuLabel: 'Bannière & Slogan',
    subCategory: 'Bandeaux & Fonds Photo',
    url: '/assets/bannieres/image_signature.png',
    fallbackUrls: [
      '/image_signature.png'
    ],
    width: 1247,
    height: 1057,
    description: 'Photographie panoramique de culture agricole RAGT. Classée dans le menu « Bannière & Slogan ».',
    badge: 'Menu Bannière'
  },
  {
    id: 'png-photo-carte-agronomes',
    originalFileName: 'photo_carte_ragt.png',
    name: 'Photo Officielle de la Carte (Agronomes & Tracteur)',
    menuTarget: 'banner',
    menuLabel: 'Bannière & Carte RAGT',
    subCategory: 'Bandeaux & Fonds Photo',
    url: '/assets/bannieres/photo_carte_ragt.png',
    fallbackUrls: [
      '/assets/uploads/photo_carte_ragt.png'
    ],
    width: 160,
    height: 77,
    description: 'Photo officielle de la carte de communication (Agronomes devant le tracteur vert). Positionnée à l’emplacement supérieur de la carte ou remplaçable par une autre photo.',
    badge: 'Photo de Carte'
  }
];

export const FONDS_IMAGES = [
  '/assets/bannieres/photo_carte_ragt.png',
  '/assets/bannieres/bags_signature.png',
  '/assets/bannieres/image_signature.png',
  '/assets/uploads/fonds/046805_BD.jpg',
  '/assets/uploads/fonds/046806_BD.jpg',
  '/assets/uploads/fonds/046807_BD.jpg',
  '/assets/uploads/fonds/046808_BD.jpg',
  '/assets/uploads/fonds/046809_BD.jpg',
  '/assets/uploads/fonds/046810_BD.jpg',
  '/assets/uploads/fonds/046811_BD.jpg',
  '/assets/uploads/fonds/046812_BD.jpg',
  '/assets/uploads/fonds/046813_BD.jpg',
  '/assets/uploads/fonds/046814_BD.jpg',
  '/assets/uploads/fonds/046815_BD.jpg',
  '/assets/uploads/fonds/046816_BD.jpg',
  '/assets/uploads/fonds/046817_BD.jpg',
  '/assets/uploads/fonds/046818_BD.jpg',
  '/assets/uploads/fonds/046819_BD.jpg',
  '/assets/uploads/fonds/046820_BD.jpg',
  '/assets/uploads/fonds/046821_BD.jpg',
  '/assets/uploads/fonds/046822_BD.jpg',
  '/assets/uploads/fonds/046823_BD.jpg',
  '/assets/uploads/fonds/046824_BD.jpg',
  '/assets/uploads/fonds/046825_BD.jpg',
];

export const MOTIFS_IMAGES = [
  '/assets/uploads/motifs/047022_BD.jpg',
  '/assets/uploads/motifs/047023_BD.jpg',
  '/assets/uploads/motifs/047024_BD.jpg',
  '/assets/uploads/motifs/047025_BD.jpg',
  '/assets/uploads/motifs/047026_BD.jpg',
  '/assets/uploads/motifs/047027_BD.jpg',
  '/assets/uploads/motifs/047028_BD.jpg',
  '/assets/uploads/motifs/047029_BD.jpg',
  '/assets/uploads/motifs/047030_BD.jpg',
  '/assets/uploads/motifs/047031_BD.jpg',
  '/assets/uploads/motifs/047032_BD.jpg',
  '/assets/uploads/motifs/047033_BD.jpg',
  '/assets/uploads/motifs/047034_BD.jpg',
  '/assets/uploads/motifs/047036_BD.jpg',
  '/assets/uploads/motifs/047037_BD.jpg',
  '/assets/uploads/motifs/047040_BD.jpg',
  '/assets/uploads/motifs/047041_BD.jpg',
  '/assets/uploads/motifs/047042_BD.jpg',
  '/assets/uploads/motifs/047043_BD.jpg',
  '/assets/uploads/motifs/047044_BD.jpg',
  '/assets/uploads/motifs/047045_BD.jpg',
  '/assets/uploads/motifs/047046_BD.jpg',
  '/assets/uploads/motifs/047047_BD.jpg',
  '/assets/uploads/motifs/047048_BD.jpg',
  '/assets/uploads/motifs/047049_BD.jpg',
  '/assets/uploads/motifs/047050_BD.jpg',
  '/assets/uploads/motifs/047054_BD.jpg',
  '/assets/uploads/motifs/047055_BD.jpg',
  '/assets/uploads/motifs/047056_BD.jpg',
  '/assets/uploads/motifs/047057_BD.jpg',
  '/assets/uploads/motifs/047058_BD.jpg',
  '/assets/uploads/motifs/047059_BD.jpg',
  '/assets/uploads/motifs/047536_BD.jpg',
  '/assets/uploads/motifs/047537_BD.jpg',
];

export const SIGNATURES_COM = [
  '/assets/bannieres/046805_BD.jpg',
  '/assets/bannieres/046806_BD.jpg',
  '/assets/bannieres/046807_BD.jpg',
  '/assets/bannieres/046808_BD.jpg',
  '/assets/bannieres/046809_BD.jpg',
  '/assets/bannieres/046810_BD.jpg',
  '/assets/bannieres/046811_BD.jpg',
  '/assets/bannieres/046812_BD.jpg',
  '/assets/bannieres/046813_BD.jpg',
  '/assets/bannieres/046814_BD.jpg',
  '/assets/bannieres/046815_BD.jpg',
  '/assets/bannieres/046816_BD.jpg',
  '/assets/bannieres/046817_BD.jpg',
  '/assets/bannieres/046818_BD.jpg',
  '/assets/bannieres/046819_BD.jpg',
  '/assets/bannieres/046820_BD.jpg',
  '/assets/bannieres/046821_BD.jpg',
  '/assets/bannieres/046822_BD.jpg',
  '/assets/bannieres/046823_BD.jpg',
  '/assets/bannieres/046824_BD.jpg',
  '/assets/bannieres/046825_BD.jpg',
  '/assets/bannieres/046826_BD.jpg',
  '/assets/bannieres/046827_BD.jpg',
  '/assets/bannieres/046828_BD.jpg',
  '/assets/bannieres/046829_BD.jpg',
  '/assets/bannieres/046830_BD.jpg',
  '/assets/bannieres/046831_BD.jpg',
  '/assets/bannieres/046832_BD.jpg',
  '/assets/bannieres/046833_BD.jpg',
  '/assets/bannieres/046834_BD.jpg',
  '/assets/bannieres/046835_BD.jpg',
  '/assets/bannieres/046836_BD.jpg',
  '/assets/bannieres/046837_BD.jpg',
  '/assets/bannieres/046838_BD.jpg',
  '/assets/bannieres/046839_BD.jpg',
  '/assets/bannieres/046840_BD.jpg'
];

export const BANNER_IMAGES = [
  ...FONDS_IMAGES.map(path => path.replace('/uploads/fonds/', '/bannieres/')),
  ...MOTIFS_IMAGES.map(path => path.replace('/uploads/motifs/', '/bannieres/')),
  ...SIGNATURES_COM
];
