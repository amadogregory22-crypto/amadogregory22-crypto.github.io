// Official RAGT Logos & Assets Library

export interface PresetLogoItem {
  id: string;
  name: string;
  category: 'ragt' | 'certification' | 'partner';
  url: string;
  defaultWidth: number;
  defaultHeight: number;
  description: string;
}

// Crisp inline SVG data URLs for perfect rendering and standalone operation
export const RAGT_MAIN_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" width="320" height="100">
  <rect width="320" height="100" fill="none"/>
  <!-- RAGT Yellow Oval / Arc Background Emblem -->
  <path d="M22 64 C22 36, 42 16, 70 16 C98 16, 118 36, 118 64 C118 72, 114 78, 106 78 C98 78, 94 72, 94 64 C94 48, 83 34, 70 34 C57 34, 46 48, 46 64 C46 72, 42 78, 34 78 C26 78, 22 72, 22 64 Z" fill="#F7BD00"/>
  <circle cx="70" cy="54" r="14" fill="#0C3866"/>
  <!-- Main Bold Typography RAGT in RAGT Navy -->
  <text x="135" y="66" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="52" fill="#0C3866" letter-spacing="1">RAGT</text>
  <!-- Subtitle SEMENCES in Dark Teal / Yellow Accent Line -->
  <text x="137" y="86" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#666666" letter-spacing="4">SEMENCES</text>
  <rect x="136" y="70" width="168" height="2.5" fill="#F7BD00" />
</svg>
`)}`;

export const RAGT_2N_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90" width="300" height="90">
  <text x="10" y="58" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="48" fill="#0C3866">RAGT</text>
  <text x="155" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="28" fill="#F7BD00">2n</text>
  <text x="12" y="78" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="12" fill="#007A3D" letter-spacing="2">RECHERCHE &amp; INNOVATION</text>
</svg>
`)}`;

export const RAGT_PLATEAU_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90">
  <text x="10" y="54" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="44" fill="#0C3866">RAGT</text>
  <text x="10" y="76" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="#0C3866" letter-spacing="2">PLATEAU CENTRAL</text>
</svg>
`)}`;

export const ISO_9001_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <rect x="4" y="4" width="152" height="72" rx="6" fill="#F8FAFC" stroke="#0C3866" stroke-width="2"/>
  <text x="80" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="16" fill="#0C3866" text-anchor="middle">AFAQ ISO 9001</text>
  <text x="80" y="52" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="11" fill="#475569" text-anchor="middle">Qualité Certifiée</text>
  <line x1="20" y1="58" x2="140" y2="58" stroke="#F7BD00" stroke-width="2"/>
</svg>
`)}`;

export const HVE_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <rect x="4" y="4" width="152" height="72" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
  <text x="80" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="15" fill="#15803D" text-anchor="middle">CERTIFICATION HVE</text>
  <text x="80" y="50" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="10" fill="#166534" text-anchor="middle">Haute Valeur Environnementale</text>
  <circle cx="80" cy="62" r="4" fill="#F7BD00"/>
</svg>
`)}`;

export interface CommunicationSignatureGraphic {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  description: string;
  badge: string;
}

// Full graphic signatures designed by the Communication department (Cleaned of example coordinates)
export const COMMUNICATION_SIGNATURES: CommunicationSignatureGraphic[] = [
  {
    id: 'ragt-com-signature-1',
    name: 'Carte RAGT Officielle — Variante 1',
    url: '/assets/signatures/6ddaec15-be56-451a-a316-6c8017a63885.png',
    width: 345,
    height: 173,
    description: 'Carte corporate fond jaune : coordonnées d’exemple vidées pour intégrer votre signature personnalisée. Emplacement photo supérieur personnalisable.',
    badge: 'Coordonnées Personnalisables'
  },
  {
    id: 'ragt-com-signature-2',
    name: 'Carte RAGT Officielle — Variante 2',
    url: '/assets/signatures/a3d7dcd5-94b8-49e3-98d3-274cce590391.png',
    width: 344,
    height: 172,
    description: 'Variante carte corporate : coordonnées d’exemple vidées, prête à recevoir vos données et votre photo choisie.',
    badge: 'Coordonnées Personnalisables'
  },
  {
    id: 'ragt-com-signature-3',
    name: 'Carte RAGT Officielle — Variante 3',
    url: '/assets/signatures/e95bc73e-a651-4ba3-a84e-eb93ed1f20a2.png',
    width: 355,
    height: 179,
    description: 'Variante carte corporate : espace coordonnées épuré pour votre signature et image supérieure modifiable.',
    badge: 'Coordonnées Personnalisables'
  }
];

export const isCommunicationSignatureUrl = (url?: string): boolean => {
  if (!url) return false;
  return (
    COMMUNICATION_SIGNATURES.some((item) => item.url === url) ||
    url.includes('6ddaec15-be56') ||
    url.includes('a3d7dcd5-94b8') ||
    url.includes('e95bc73e-a651')
  );
};

export const PRESET_LOGOS: PresetLogoItem[] = [
  {
    id: 'ragt-new-logo',
    name: 'Logo Officiel RAGT (Emblème)',
    category: 'ragt',
    url: '/assets/logos/logo_ragt.png',
    defaultWidth: 95,
    defaultHeight: 100,
    description: 'Emblème officiel RAGT Semences (Format carré haute résolution)'
  },
  {
    id: 'ragt-charte-logo',
    name: 'RAGT Charte Graphique (PNG)',
    category: 'ragt',
    url: '/assets/logos/Capture d’écran 2026-09-14 112409.png',
    defaultWidth: 140,
    defaultHeight: 50,
    description: 'Logo institutionnel avec signature typographique charte RAGT'
  },
  {
    id: 'ragt-semences',
    name: 'RAGT Semences (Bandeau Officiel)',
    category: 'ragt',
    url: RAGT_MAIN_LOGO_SVG,
    defaultWidth: 150,
    defaultHeight: 46,
    description: 'Logo corporate principal avec signature typographique'
  },
  {
    id: 'ragt-2n',
    name: 'RAGT 2n Recherche',
    category: 'ragt',
    url: RAGT_2N_LOGO_SVG,
    defaultWidth: 140,
    defaultHeight: 42,
    description: 'Logo département R&D et génétique végétale'
  },
  {
    id: 'ragt-plateau',
    name: 'RAGT Plateau Central',
    category: 'ragt',
    url: RAGT_PLATEAU_LOGO_SVG,
    defaultWidth: 145,
    defaultHeight: 40,
    description: 'Logo filiale régionale distribution'
  },
  {
    id: 'iso-9001',
    name: 'Certification ISO 9001',
    category: 'certification',
    url: ISO_9001_LOGO_SVG,
    defaultWidth: 105,
    defaultHeight: 52,
    description: 'Certification management qualité'
  },
  {
    id: 'hve',
    name: 'Haute Valeur Environnementale (HVE)',
    category: 'certification',
    url: HVE_LOGO_SVG,
    defaultWidth: 105,
    defaultHeight: 52,
    description: 'Label éco-responsable et biodiversité'
  }
];

// High-fidelity vector icons for social networks
export const SOCIAL_ICONS_SVG: Record<string, string> = {
  linkedin: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.07v8.37h2.78z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  website: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  web: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  x: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.86c0 1.57-.4 3.12-1.22 4.43-.8 1.3-1.99 2.34-3.41 2.94-1.41.6-3 .73-4.52.39-1.52-.33-2.9-1.18-3.92-2.38-1.02-1.2-1.58-2.73-1.6-4.31-.02-1.58.5-3.13 1.49-4.36.99-1.22 2.39-2.05 3.94-2.34 1.54-.29 3.15-.08 4.57.61v4.18c-.7-.34-1.49-.5-2.28-.46-.78.04-1.54.3-2.15.77-.61.47-1.04 1.13-1.21 1.89-.17.76-.07 1.56.28 2.25.35.69.93 1.23 1.65 1.54.72.31 1.53.33 2.27.06.74-.27 1.36-.82 1.74-1.53.38-.72.56-1.53.53-2.35l.02-14.39z"/></svg>`,
  custom: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-2.82c-.41-.39-.41-1.03 0-1.42.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24"/></svg>`
};
