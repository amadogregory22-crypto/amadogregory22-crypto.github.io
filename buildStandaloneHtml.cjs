var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/buildStandaloneHtml.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/constants/logos.ts
var RAGT_MAIN_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
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
var RAGT_2N_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90" width="300" height="90">
  <text x="10" y="58" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="48" fill="#0C3866">RAGT</text>
  <text x="155" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="28" fill="#F7BD00">2n</text>
  <text x="12" y="78" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="12" fill="#007A3D" letter-spacing="2">RECHERCHE &amp; INNOVATION</text>
</svg>
`)}`;
var RAGT_PLATEAU_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90">
  <text x="10" y="54" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="44" fill="#0C3866">RAGT</text>
  <text x="10" y="76" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="#0C3866" letter-spacing="2">PLATEAU CENTRAL</text>
</svg>
`)}`;
var ISO_9001_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <rect x="4" y="4" width="152" height="72" rx="6" fill="#F8FAFC" stroke="#0C3866" stroke-width="2"/>
  <text x="80" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="16" fill="#0C3866" text-anchor="middle">AFAQ ISO 9001</text>
  <text x="80" y="52" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="11" fill="#475569" text-anchor="middle">Qualit\xE9 Certifi\xE9e</text>
  <line x1="20" y1="58" x2="140" y2="58" stroke="#F7BD00" stroke-width="2"/>
</svg>
`)}`;
var HVE_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <rect x="4" y="4" width="152" height="72" rx="6" fill="#F0FDF4" stroke="#16A34A" stroke-width="2"/>
  <text x="80" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="15" fill="#15803D" text-anchor="middle">CERTIFICATION HVE</text>
  <text x="80" y="50" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="10" fill="#166534" text-anchor="middle">Haute Valeur Environnementale</text>
  <circle cx="80" cy="62" r="4" fill="#F7BD00"/>
</svg>
`)}`;
var SOCIAL_ICONS_SVG = {
  linkedin: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.07v8.37h2.78z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  website: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  web: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  x: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.86c0 1.57-.4 3.12-1.22 4.43-.8 1.3-1.99 2.34-3.41 2.94-1.41.6-3 .73-4.52.39-1.52-.33-2.9-1.18-3.92-2.38-1.02-1.2-1.58-2.73-1.6-4.31-.02-1.58.5-3.13 1.49-4.36.99-1.22 2.39-2.05 3.94-2.34 1.54-.29 3.15-.08 4.57.61v4.18c-.7-.34-1.49-.5-2.28-.46-.78.04-1.54.3-2.15.77-.61.47-1.04 1.13-1.21 1.89-.17.76-.07 1.56.28 2.25.35.69.93 1.23 1.65 1.54.72.31 1.53.33 2.27.06.74-.27 1.36-.82 1.74-1.53.38-.72.56-1.53.53-2.35l.02-14.39z"/></svg>`,
  custom: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-2.82c-.41-.39-.41-1.03 0-1.42.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24"/></svg>`
};

// src/constants/presets.ts
var APP_VERSION = "3.0.0";
var DEFAULT_SIGNATURE_STATE = {
  appVersion: APP_VERSION,
  presetName: "Corporate Officiel",
  layout: {
    preset: "layout-a",
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
      type: "vertical",
      color: "#F7BD00",
      thickness: 2,
      style: "solid",
      margin: 12
    },
    alignH: "left",
    alignV: "middle",
    blockOrder: [
      "logo",
      "identity",
      "job",
      "company",
      "coordinates",
      "social",
      "qr",
      "slogan",
      "banner"
    ]
  },
  personal: {
    civility: "M.",
    firstName: "Pr\xE9nom",
    lastName: "NOM",
    jobTitle: "Fonction / Poste",
    department: "D\xE9partement",
    service: "Service",
    company: "RAGT Semences",
    subsidiary: "Si\xE8ge Social",
    phone: "05 65 00 00 00",
    mobile: "06 00 00 00 00",
    fax: "",
    directPhone: "05 65 00 00 00",
    standardPhone: "05 65 00 00 00",
    email: "prenom.nom@ragt.fr",
    addressLine1: "Rue Emile Singla",
    addressLine2: "Site de Bourran",
    postalCode: "12000",
    city: "Rodez",
    country: "France",
    website: "https://www.ragt-semences.fr"
  },
  labels: {
    phone: "T\xE9l.",
    mobile: "Mob.",
    fax: "Fax",
    standardPhone: "Standard",
    directPhone: "Direct",
    email: "E-mail",
    address: "Adr.",
    website: "Web"
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
      primary: "#0C3866",
      secondary: "#F7BD00",
      text: "#2D3748",
      muted: "#718096",
      links: "#0C3866",
      firstName: "#0C3866",
      lastName: "#0C3866",
      jobTitle: "#718096",
      company: "#0C3866",
      phone: "#2D3748",
      mobile: "#2D3748",
      email: "#0C3866",
      website: "#0C3866",
      address: "#718096",
      icons: "#F7BD00",
      separator: "#F7BD00",
      background: "#FFFFFF",
      slogan: "#0C3866",
      qrFg: "#0C3866",
      qrBg: "#FFFFFF"
    },
    typography: {
      baseFont: "Arial, Helvetica, sans-serif",
      name: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "normal",
        textDecoration: "none",
        lineHeight: 1.2,
        letterSpacing: 0.5,
        color: "#0C3866"
      },
      jobTitle: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "italic",
        textDecoration: "none",
        lineHeight: 1.3,
        letterSpacing: 0,
        color: "#718096"
      },
      company: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: "normal",
        textDecoration: "none",
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: "#0C3866"
      },
      coordinates: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 11,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        lineHeight: 1.4,
        letterSpacing: 0,
        color: "#2D3748"
      },
      slogan: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 11,
        fontWeight: "bold",
        fontStyle: "italic",
        textDecoration: "none",
        lineHeight: 1.3,
        letterSpacing: 0.5,
        color: "#0C3866"
      },
      legal: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 9,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        lineHeight: 1.2,
        letterSpacing: 0,
        color: "#A0AEC0"
      }
    },
    background: {
      type: "none",
      color: "#FFFFFF",
      imageUrl: "",
      pattern: "none",
      opacity: 0.05,
      size: "auto"
    },
    border: {
      type: "none",
      color: "#E2E8F0",
      thickness: 1,
      style: "solid",
      radius: 6
    }
  },
  logos: {
    primary: {
      id: "ragt-main",
      label: "Logo RAGT Semences",
      url: RAGT_MAIN_LOGO_SVG,
      alt: "Logo RAGT Semences",
      width: 145,
      height: 45,
      keepRatio: true,
      linkUrl: "https://www.ragt.fr",
      align: "center",
      visible: true
    },
    secondary: {
      id: "iso-cert",
      label: "Certification Qualit\xE9",
      url: ISO_9001_LOGO_SVG,
      alt: "Certification ISO 9001",
      width: 90,
      height: 44,
      keepRatio: true,
      linkUrl: "https://www.ragt.fr",
      align: "center",
      visible: false
    },
    certification: {
      id: "cert-empty",
      label: "Logo Partenaire",
      url: "",
      alt: "Partenaire",
      width: 80,
      height: 40,
      keepRatio: true,
      linkUrl: "",
      align: "left",
      visible: false
    }
  },
  iconSettings: {
    style: "circle",
    size: 13,
    color: "#F7BD00",
    spacing: 6
  },
  qr: {
    type: "vcard",
    customText: "",
    position: "right",
    size: 75,
    fgColor: "#0C3866",
    bgColor: "#FFFFFF",
    errorCorrectionLevel: "M",
    margin: 1,
    visible: false
  },
  social: {
    style: "icons-only",
    iconStyle: "circle",
    color: "#FFFFFF",
    useBrandColors: false,
    iconSize: 16,
    spacing: 8,
    align: "left",
    items: [
      {
        id: "website",
        name: "Site Web RAGT",
        url: "https://www.ragt-semences.fr",
        active: false,
        iconStyle: "circle",
        color: "#0C3866"
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/ragt",
        active: true,
        iconStyle: "circle",
        color: "#0077B5"
      },
      {
        id: "facebook",
        name: "Facebook",
        url: "https://www.facebook.com/ragt",
        active: true,
        iconStyle: "circle",
        color: "#1877F2"
      },
      {
        id: "instagram",
        name: "Instagram",
        url: "https://www.instagram.com/ragt",
        active: true,
        iconStyle: "circle",
        color: "#E4405F"
      },
      {
        id: "youtube",
        name: "YouTube",
        url: "https://www.youtube.com/user/ragt",
        active: true,
        iconStyle: "circle",
        color: "#CD201F"
      },
      {
        id: "x",
        name: "X (Twitter)",
        url: "https://twitter.com/ragt",
        active: false,
        iconStyle: "circle",
        color: "#000000"
      },
      {
        id: "tiktok",
        name: "TikTok",
        url: "https://www.tiktok.com/@ragt",
        active: false,
        iconStyle: "circle",
        color: "#000000"
      }
    ]
  },
  utm: {
    enabled: false,
    source: "email_signature",
    medium: "email",
    campaign: "ragt_signature"
  },
  banner: {
    enabled: false,
    title: "Campagne SPACE 2026",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
    linkUrl: "https://www.ragt-semences.com/evenements",
    altText: "Retrouvez RAGT Semences au salon SPACE 2026",
    width: 480,
    height: 90,
    marginTop: 12,
    marginBottom: 4,
    position: "bottom",
    align: "center",
    buttonText: "En savoir plus",
    campaignName: "SPACE 2026 - Hall 4 Stand B22",
    startDate: "2026-09-15",
    endDate: "2026-09-18"
  },
  campaign: {
    enabled: false,
    title: "Innovation vari\xE9tale",
    campaignName: "G\xE9n\xE9tique & performance",
    imageUrl: "/assets/bannieres/046806_BD.jpg",
    linkUrl: "https://www.ragt-semences.fr",
    altText: "Innovation vari\xE9tale RAGT",
    width: 540,
    height: 90,
    startDate: "",
    endDate: ""
  },
  slogan: {
    enabled: true,
    text: "Des semences pour demain",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 11,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#0C3866",
    align: "left",
    marginTop: 8,
    marginBottom: 4,
    position: "above-footer"
  }
};
var SIGNATURE_PRESETS = [
  {
    id: "carte-ragt-officielle",
    name: "Carte RAGT",
    category: "Institutionnel",
    description: "Format officiel fid\xE8le \xE0 la carte : fond jaune RAGT (#FDC420), logo \xE0 gauche, photo agronomique au centre avec votre signature, 4 r\xE9seaux sociaux en pastilles blanches \xE0 droite.",
    apply: (base) => ({
      ...base,
      presetName: "Carte RAGT",
      layout: {
        ...base.layout,
        preset: "layout-i",
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
        separator: { ...base.layout.separator, type: "none" },
        alignV: "middle"
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: "#0C3866",
          secondary: "#1E4143",
          text: "#0C3866",
          firstName: "#0C3866",
          lastName: "#0C3866",
          jobTitle: "#1E4143",
          phone: "#0C3866",
          mobile: "#0C3866",
          email: "#0C3866",
          address: "#0C3866",
          website: "#0C3866",
          icons: "#ffffff",
          background: "#FDC420"
        },
        background: {
          type: "image",
          color: "#FDC420",
          imageUrl: "/assets/patterns/ragt-jaune-pale.png",
          pattern: "none",
          opacity: 1,
          size: "cover"
        },
        border: {
          ...base.design.border,
          type: "none",
          radius: 10
        },
        typography: {
          ...base.design.typography,
          name: {
            ...base.design.typography.name,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 16,
            fontWeight: "bold",
            color: "#0C3866",
            letterSpacing: 0.5
          },
          jobTitle: {
            ...base.design.typography.jobTitle,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 12,
            fontStyle: "italic",
            fontWeight: "normal",
            color: "#1E4143"
          },
          coordinates: {
            ...base.design.typography.coordinates,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 11,
            color: "#0C3866"
          }
        }
      },
      logos: {
        ...base.logos,
        primary: {
          ...base.logos.primary,
          url: "/assets/logos/logo_ragt.png",
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
        style: "circle",
        size: 16,
        color: "#ffffff",
        spacing: 8
      },
      labels: {
        phone: "",
        mobile: "",
        fax: "",
        standardPhone: "",
        directPhone: "",
        email: "",
        address: "",
        website: ""
      },
      banner: {
        ...base.banner,
        enabled: true,
        imageUrl: "/assets/bannieres/photo_carte_ragt.png",
        altText: "Photo agronomie RAGT",
        position: "center",
        align: "center",
        width: 175,
        height: 84,
        marginTop: 0,
        marginBottom: 8
      },
      social: {
        ...base.social,
        style: "icons-only",
        iconSize: 20,
        spacing: 8,
        align: "right",
        items: [
          {
            id: "website",
            name: "Site Web RAGT",
            url: "https://www.ragt-semences.fr",
            active: true,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "youtube",
            name: "YouTube",
            url: "https://www.youtube.com/user/ragt",
            active: true,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "facebook",
            name: "Facebook",
            url: "https://www.facebook.com/ragt",
            active: true,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "instagram",
            name: "Instagram",
            url: "https://www.instagram.com/ragt",
            active: true,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "linkedin",
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/ragt",
            active: false,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "x",
            name: "X (Twitter)",
            url: "https://twitter.com/ragt",
            active: false,
            iconStyle: "circle",
            color: "#ffffff"
          },
          {
            id: "tiktok",
            name: "TikTok",
            url: "https://www.tiktok.com/@ragt",
            active: false,
            iconStyle: "circle",
            color: "#ffffff"
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
    id: "corporate",
    name: "Corporate Officiel",
    category: "Institutionnel",
    description: "Structure \xE9quilibr\xE9e standard RAGT Semences, logo \xE0 gauche avec filet jaune vertical.",
    apply: (base) => ({
      ...base,
      presetName: "Corporate Officiel",
      layout: {
        ...base.layout,
        preset: "layout-a",
        separator: { ...base.layout.separator, type: "vertical", color: "#F7BD00", thickness: 2 }
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
    id: "carte-visite-ragt",
    name: "Carte de visite RAGT",
    category: "Institutionnel",
    description: "Carte claire et compacte : logo, coordonn\xE9es, QR vCard et r\xE9seaux RAGT dans un format de prise de contact.",
    apply: (base) => ({
      ...base,
      presetName: "Carte de visite RAGT",
      layout: {
        ...base.layout,
        preset: "layout-e",
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
        separator: { ...base.layout.separator, type: "vertical", color: "#F7BD00", thickness: 3 },
        alignV: "middle"
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: "#0C3866",
          text: "#0C3866",
          firstName: "#0C3866",
          lastName: "#0C3866",
          jobTitle: "#285D63",
          phone: "#0C3866",
          mobile: "#0C3866",
          email: "#0C3866",
          address: "#0C3866",
          icons: "#0C3866",
          background: "#FFFFFF"
        },
        background: { ...base.design.background, type: "color", color: "#FFFFFF", imageUrl: "", pattern: "none", opacity: 1 },
        border: { ...base.design.border, type: "all", color: "#E2E8F0", thickness: 1, style: "solid", radius: 10 }
      },
      logos: {
        ...base.logos,
        primary: {
          ...base.logos.primary,
          id: "ragt-business-card-logo",
          label: "Logo officiel RAGT Semences",
          url: "/assets/logos/logo_ragt.png",
          alt: "Logo RAGT Semences",
          width: 88,
          height: 88,
          visible: true
        }
      },
      iconSettings: { ...base.iconSettings, style: "circle", size: 14, color: "#0C3866", spacing: 6 },
      qr: { ...base.qr, type: "vcard", position: "right", size: 84, fgColor: "#0C3866", bgColor: "#FFFFFF", visible: true },
      social: { ...base.social, style: "icons-only", iconSize: 15, spacing: 6, align: "left" },
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
    id: "premium-ragt",
    name: "Premium RAGT",
    category: "Premium",
    description: "Carte de contact haut de gamme : composition trois colonnes, QR vCard, filet dor\xE9 et cadre bleu RAGT.",
    apply: (base) => ({
      ...base,
      presetName: "Premium RAGT",
      layout: {
        ...base.layout,
        preset: "layout-e",
        dimensions: { ...base.layout.dimensions, totalWidth: 540, logoColumnWidth: 120, qrSize: 86, innerSpacing: 16 },
        separator: { ...base.layout.separator, type: "vertical", color: "#F7BD00", thickness: 3, style: "solid", margin: 12 },
        alignV: "middle"
      },
      design: {
        ...base.design,
        colors: {
          ...base.design.colors,
          primary: "#0C3866",
          secondary: "#F7BD00",
          text: "#2D3748",
          firstName: "#0C3866",
          lastName: "#0C3866",
          jobTitle: "#285D63",
          phone: "#2D3748",
          mobile: "#2D3748",
          email: "#0C3866",
          website: "#0C3866",
          address: "#718096",
          icons: "#0C3866",
          background: "#FFFFFF"
        },
        background: { ...base.design.background, type: "color", color: "#FFFFFF", imageUrl: "", pattern: "none", opacity: 1 },
        border: { ...base.design.border, type: "all", color: "#0C3866", thickness: 2, style: "solid", radius: 10 },
        typography: {
          ...base.design.typography,
          name: { ...base.design.typography.name, fontSize: 17, fontWeight: "bold", color: "#0C3866" },
          jobTitle: { ...base.design.typography.jobTitle, fontSize: 12, fontWeight: "500", fontStyle: "normal", color: "#285D63" },
          coordinates: { ...base.design.typography.coordinates, fontSize: 11, color: "#2D3748" }
        }
      },
      logos: {
        ...base.logos,
        primary: { ...base.logos.primary, width: 105, height: 33, keepRatio: true, visible: true },
        secondary: { ...base.logos.secondary, visible: true }
      },
      iconSettings: { ...base.iconSettings, style: "minimal", size: 13, color: "#0C3866", spacing: 6 },
      qr: { ...base.qr, type: "vcard", position: "right", size: 86, fgColor: "#0C3866", bgColor: "#FFFFFF", errorCorrectionLevel: "M", visible: true },
      social: { ...base.social, style: "icons-only", iconSize: 15, spacing: 6, align: "left" },
      slogan: { ...base.slogan, enabled: true, text: "Des semences pour demain", fontSize: 11, color: "#0C3866", align: "left" },
      visibility: { ...base.visibility, logo: true, secondaryLogo: true, company: true, phone: true, mobile: true, email: true, address: true, website: true, qr: true, socials: true, banner: false, slogan: true }
    })
  },
  {
    id: "commercial",
    name: "Commercial & Terroir",
    category: "M\xE9tier",
    description: "Coordonn\xE9es directes mises en valeur, QR code vCard int\xE9gr\xE9 pour prise de contact rapide.",
    apply: (base) => ({
      ...base,
      presetName: "Commercial & Terroir",
      layout: {
        ...base.layout,
        preset: "layout-e",
        separator: { ...base.layout.separator, type: "vertical", color: "#0C3866", thickness: 2 }
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
        type: "vcard",
        position: "right"
      }
    })
  },
  {
    id: "salon-space",
    name: "Salon SPACE & \xC9v\xE9nement",
    category: "Campagne",
    description: "Int\xE8gre une banni\xE8re \xE9v\xE9nementielle inf\xE9rieure avec slogan de campagne.",
    apply: (base) => ({
      ...base,
      presetName: "Salon SPACE & \xC9v\xE9nement",
      layout: {
        ...base.layout,
        preset: "layout-h"
      },
      visibility: {
        ...base.visibility,
        banner: true,
        slogan: true
      },
      banner: {
        ...base.banner,
        enabled: true,
        title: "Retrouvez-nous au SPACE 2026",
        campaignName: "SPACE 2026"
      }
    })
  },
  {
    id: "minimalist",
    name: "Minimaliste Express",
    category: "\xC9pur\xE9",
    description: "Signature ultra l\xE9g\xE8re, id\xE9ale pour \xE9changes rapides et r\xE9ponses fr\xE9quentes.",
    apply: (base) => ({
      ...base,
      presetName: "Minimaliste Express",
      layout: {
        ...base.layout,
        preset: "layout-f",
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 460,
          paddingTop: 6,
          paddingBottom: 6
        },
        separator: { ...base.layout.separator, type: "none" }
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
    id: "recrutement",
    name: "RH & Recrutement",
    category: "Institutionnel",
    description: "Met en avant la marque employeur et les r\xE9seaux sociaux professionnels.",
    apply: (base) => ({
      ...base,
      presetName: "RH & Recrutement",
      layout: {
        ...base.layout,
        preset: "layout-a"
      },
      slogan: {
        ...base.slogan,
        enabled: true,
        text: "Rejoignez nos \xE9quipes \u2014 ragt.fr/carrieres"
      },
      visibility: {
        ...base.visibility,
        slogan: true,
        socials: true
      }
    })
  },
  {
    id: "mobile-friendly",
    name: "Mobile Compact",
    category: "Responsive",
    description: "Format vertical empil\xE9 ultra compatible sur petits \xE9crans et smartphones.",
    apply: (base) => ({
      ...base,
      presetName: "Mobile Compact",
      layout: {
        ...base.layout,
        preset: "layout-g",
        dimensions: {
          ...base.layout.dimensions,
          totalWidth: 360
        },
        separator: { ...base.layout.separator, type: "horizontal", color: "#F7BD00", thickness: 2 }
      },
      visibility: {
        ...base.visibility,
        qr: false
      }
    })
  }
];

// src/constants/ragtLogoBase64.ts
var RAGT_LOGO_PNG_BASE64 = "data:image/png;base64,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";

// src/assets/portalQrRuntime.ts
var portalQrRuntime_default = atob("dmFyIFJhZ3RQb3J0YWxRcj0oKCk9Pnt2YXIgZz0obix0KT0+KCk9Pih0fHxuKCh0PXtleHBvcnRzOnt9fSkuZXhwb3J0cyx0KSx0LmV4cG9ydHMpO3ZhciBfdD1nKChTbixMdCk9PntMdC5leHBvcnRzPWZ1bmN0aW9uKCl7cmV0dXJuIHR5cGVvZiBQcm9taXNlPT0iZnVuY3Rpb24iJiZQcm9taXNlLnByb3RvdHlwZSYmUHJvbWlzZS5wcm90b3R5cGUudGhlbn19KTt2YXIgST1nKFA9Pnt2YXIgc3QsTGU9WzAsMjYsNDQsNzAsMTAwLDEzNCwxNzIsMTk2LDI0MiwyOTIsMzQ2LDQwNCw0NjYsNTMyLDU4MSw2NTUsNzMzLDgxNSw5MDEsOTkxLDEwODUsMTE1NiwxMjU4LDEzNjQsMTQ3NCwxNTg4LDE3MDYsMTgyOCwxOTIxLDIwNTEsMjE4NSwyMzIzLDI0NjUsMjYxMSwyNzYxLDI4NzYsMzAzNCwzMTk2LDMzNjIsMzUzMiwzNzA2XTtQLmdldFN5bWJvbFNpemU9ZnVuY3Rpb24odCl7aWYoIXQpdGhyb3cgbmV3IEVycm9yKCcidmVyc2lvbiIgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7aWYodDwxfHx0PjQwKXRocm93IG5ldyBFcnJvcignInZlcnNpb24iIHNob3VsZCBiZSBpbiByYW5nZSBmcm9tIDEgdG8gNDAnKTtyZXR1cm4gdCo0KzE3fTtQLmdldFN5bWJvbFRvdGFsQ29kZXdvcmRzPWZ1bmN0aW9uKHQpe3JldHVybiBMZVt0XX07UC5nZXRCQ0hEaWdpdD1mdW5jdGlvbihuKXtsZXQgdD0wO2Zvcig7biE9PTA7KXQrKyxuPj4+PTE7cmV0dXJuIHR9O1Auc2V0VG9TSklTRnVuY3Rpb249ZnVuY3Rpb24odCl7aWYodHlwZW9mIHQhPSJmdW5jdGlvbiIpdGhyb3cgbmV3IEVycm9yKCcidG9TSklTRnVuYyIgaXMgbm90IGEgdmFsaWQgZnVuY3Rpb24uJyk7c3Q9dH07UC5pc0thbmppTW9kZUVuYWJsZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdHlwZW9mIHN0PCJ1In07UC50b1NKSVM9ZnVuY3Rpb24odCl7cmV0dXJuIHN0KHQpfX0pO3ZhciBqPWcobT0+e20uTD17Yml0OjF9O20uTT17Yml0OjB9O20uUT17Yml0OjN9O20uSD17Yml0OjJ9O2Z1bmN0aW9uIF9lKG4pe2lmKHR5cGVvZiBuIT0ic3RyaW5nIil0aHJvdyBuZXcgRXJyb3IoIlBhcmFtIGlzIG5vdCBhIHN0cmluZyIpO3N3aXRjaChuLnRvTG93ZXJDYXNlKCkpe2Nhc2UibCI6Y2FzZSJsb3ciOnJldHVybiBtLkw7Y2FzZSJtIjpjYXNlIm1lZGl1bSI6cmV0dXJuIG0uTTtjYXNlInEiOmNhc2UicXVhcnRpbGUiOnJldHVybiBtLlE7Y2FzZSJoIjpjYXNlImhpZ2giOnJldHVybiBtLkg7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlVua25vd24gRUMgTGV2ZWw6ICIrbil9fW0uaXNWYWxpZD1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdHlwZW9mIHQuYml0PCJ1IiYmdC5iaXQ+PTAmJnQuYml0PDR9O20uZnJvbT1mdW5jdGlvbih0LGUpe2lmKG0uaXNWYWxpZCh0KSlyZXR1cm4gdDt0cnl7cmV0dXJuIF9lKHQpfWNhdGNoe3JldHVybiBlfX19KTt2YXIgcXQ9ZygoUm4sVXQpPT57ZnVuY3Rpb24geHQoKXt0aGlzLmJ1ZmZlcj1bXSx0aGlzLmxlbmd0aD0wfXh0LnByb3RvdHlwZT17Z2V0OmZ1bmN0aW9uKG4pe2xldCB0PU1hdGguZmxvb3Iobi84KTtyZXR1cm4odGhpcy5idWZmZXJbdF0+Pj43LW4lOCYxKT09PTF9LHB1dDpmdW5jdGlvbihuLHQpe2ZvcihsZXQgZT0wO2U8dDtlKyspdGhpcy5wdXRCaXQoKG4+Pj50LWUtMSYxKT09PTEpfSxnZXRMZW5ndGhJbkJpdHM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LHB1dEJpdDpmdW5jdGlvbihuKXtsZXQgdD1NYXRoLmZsb29yKHRoaXMubGVuZ3RoLzgpO3RoaXMuYnVmZmVyLmxlbmd0aDw9dCYmdGhpcy5idWZmZXIucHVzaCgwKSxuJiYodGhpcy5idWZmZXJbdF18PTEyOD4+PnRoaXMubGVuZ3RoJTgpLHRoaXMubGVuZ3RoKyt9fTtVdC5leHBvcnRzPXh0fSk7dmFyIEZ0PWcoKExuLER0KT0+e2Z1bmN0aW9uIGsobil7aWYoIW58fG48MSl0aHJvdyBuZXcgRXJyb3IoIkJpdE1hdHJpeCBzaXplIG11c3QgYmUgZGVmaW5lZCBhbmQgZ3JlYXRlciB0aGFuIDAiKTt0aGlzLnNpemU9bix0aGlzLmRhdGE9bmV3IFVpbnQ4QXJyYXkobipuKSx0aGlzLnJlc2VydmVkQml0PW5ldyBVaW50OEFycmF5KG4qbil9ay5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKG4sdCxlLHIpe2xldCBvPW4qdGhpcy5zaXplK3Q7dGhpcy5kYXRhW29dPWUsciYmKHRoaXMucmVzZXJ2ZWRCaXRbb109ITApfTtrLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24obix0KXtyZXR1cm4gdGhpcy5kYXRhW24qdGhpcy5zaXplK3RdfTtrLnByb3RvdHlwZS54b3I9ZnVuY3Rpb24obix0LGUpe3RoaXMuZGF0YVtuKnRoaXMuc2l6ZSt0XV49ZX07ay5wcm90b3R5cGUuaXNSZXNlcnZlZD1mdW5jdGlvbihuLHQpe3JldHVybiB0aGlzLnJlc2VydmVkQml0W24qdGhpcy5zaXplK3RdfTtEdC5leHBvcnRzPWt9KTt2YXIga3Q9ZyhHPT57dmFyIHhlPUkoKS5nZXRTeW1ib2xTaXplO0cuZ2V0Um93Q29sQ29vcmRzPWZ1bmN0aW9uKHQpe2lmKHQ9PT0xKXJldHVybltdO2xldCBlPU1hdGguZmxvb3IodC83KSsyLHI9eGUodCksbz1yPT09MTQ1PzI2Ok1hdGguY2VpbCgoci0xMykvKDIqZS0yKSkqMixpPVtyLTddO2ZvcihsZXQgcz0xO3M8ZS0xO3MrKylpW3NdPWlbcy0xXS1vO3JldHVybiBpLnB1c2goNiksaS5yZXZlcnNlKCl9O0cuZ2V0UG9zaXRpb25zPWZ1bmN0aW9uKHQpe2xldCBlPVtdLHI9Ry5nZXRSb3dDb2xDb29yZHModCksbz1yLmxlbmd0aDtmb3IobGV0IGk9MDtpPG87aSsrKWZvcihsZXQgcz0wO3M8bztzKyspaT09PTAmJnM9PT0wfHxpPT09MCYmcz09PW8tMXx8aT09PW8tMSYmcz09PTB8fGUucHVzaChbcltpXSxyW3NdXSk7cmV0dXJuIGV9fSk7dmFyIEh0PWcoVnQ9Pnt2YXIgVWU9SSgpLmdldFN5bWJvbFNpemUsenQ9NztWdC5nZXRQb3NpdGlvbnM9ZnVuY3Rpb24odCl7bGV0IGU9VWUodCk7cmV0dXJuW1swLDBdLFtlLXp0LDBdLFswLGUtenRdXX19KTt2YXIgS3Q9ZyhkPT57ZC5QYXR0ZXJucz17UEFUVEVSTjAwMDowLFBBVFRFUk4wMDE6MSxQQVRURVJOMDEwOjIsUEFUVEVSTjAxMTozLFBBVFRFUk4xMDA6NCxQQVRURVJOMTAxOjUsUEFUVEVSTjExMDo2LFBBVFRFUk4xMTE6N307dmFyIGI9e04xOjMsTjI6MyxOMzo0MCxONDoxMH07ZC5pc1ZhbGlkPWZ1bmN0aW9uKHQpe3JldHVybiB0IT1udWxsJiZ0IT09IiImJiFpc05hTih0KSYmdD49MCYmdDw9N307ZC5mcm9tPWZ1bmN0aW9uKHQpe3JldHVybiBkLmlzVmFsaWQodCk/cGFyc2VJbnQodCwxMCk6dm9pZCAwfTtkLmdldFBlbmFsdHlOMT1mdW5jdGlvbih0KXtsZXQgZT10LnNpemUscj0wLG89MCxpPTAscz1udWxsLHU9bnVsbDtmb3IobGV0IGM9MDtjPGU7YysrKXtvPWk9MCxzPXU9bnVsbDtmb3IobGV0IGw9MDtsPGU7bCsrKXtsZXQgYT10LmdldChjLGwpO2E9PT1zP28rKzoobz49NSYmKHIrPWIuTjErKG8tNSkpLHM9YSxvPTEpLGE9dC5nZXQobCxjKSxhPT09dT9pKys6KGk+PTUmJihyKz1iLk4xKyhpLTUpKSx1PWEsaT0xKX1vPj01JiYocis9Yi5OMSsoby01KSksaT49NSYmKHIrPWIuTjErKGktNSkpfXJldHVybiByfTtkLmdldFBlbmFsdHlOMj1mdW5jdGlvbih0KXtsZXQgZT10LnNpemUscj0wO2ZvcihsZXQgbz0wO288ZS0xO28rKylmb3IobGV0IGk9MDtpPGUtMTtpKyspe2xldCBzPXQuZ2V0KG8saSkrdC5nZXQobyxpKzEpK3QuZ2V0KG8rMSxpKSt0LmdldChvKzEsaSsxKTsocz09PTR8fHM9PT0wKSYmcisrfXJldHVybiByKmIuTjJ9O2QuZ2V0UGVuYWx0eU4zPWZ1bmN0aW9uKHQpe2xldCBlPXQuc2l6ZSxyPTAsbz0wLGk9MDtmb3IobGV0IHM9MDtzPGU7cysrKXtvPWk9MDtmb3IobGV0IHU9MDt1PGU7dSsrKW89bzw8MSYyMDQ3fHQuZ2V0KHMsdSksdT49MTAmJihvPT09MTQ4OHx8bz09PTkzKSYmcisrLGk9aTw8MSYyMDQ3fHQuZ2V0KHUscyksdT49MTAmJihpPT09MTQ4OHx8aT09PTkzKSYmcisrfXJldHVybiByKmIuTjN9O2QuZ2V0UGVuYWx0eU40PWZ1bmN0aW9uKHQpe2xldCBlPTAscj10LmRhdGEubGVuZ3RoO2ZvcihsZXQgaT0wO2k8cjtpKyspZSs9dC5kYXRhW2ldO3JldHVybiBNYXRoLmFicyhNYXRoLmNlaWwoZSoxMDAvci81KS0xMCkqYi5ONH07ZnVuY3Rpb24gcWUobix0LGUpe3N3aXRjaChuKXtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjAwMDpyZXR1cm4odCtlKSUyPT09MDtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjAwMTpyZXR1cm4gdCUyPT09MDtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjAxMDpyZXR1cm4gZSUzPT09MDtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjAxMTpyZXR1cm4odCtlKSUzPT09MDtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjEwMDpyZXR1cm4oTWF0aC5mbG9vcih0LzIpK01hdGguZmxvb3IoZS8zKSklMj09PTA7Y2FzZSBkLlBhdHRlcm5zLlBBVFRFUk4xMDE6cmV0dXJuIHQqZSUyK3QqZSUzPT09MDtjYXNlIGQuUGF0dGVybnMuUEFUVEVSTjExMDpyZXR1cm4odCplJTIrdCplJTMpJTI9PT0wO2Nhc2UgZC5QYXR0ZXJucy5QQVRURVJOMTExOnJldHVybih0KmUlMysodCtlKSUyKSUyPT09MDtkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiYmFkIG1hc2tQYXR0ZXJuOiIrbil9fWQuYXBwbHlNYXNrPWZ1bmN0aW9uKHQsZSl7bGV0IHI9ZS5zaXplO2ZvcihsZXQgbz0wO288cjtvKyspZm9yKGxldCBpPTA7aTxyO2krKyllLmlzUmVzZXJ2ZWQoaSxvKXx8ZS54b3IoaSxvLHFlKHQsaSxvKSl9O2QuZ2V0QmVzdE1hc2s9ZnVuY3Rpb24odCxlKXtsZXQgcj1PYmplY3Qua2V5cyhkLlBhdHRlcm5zKS5sZW5ndGgsbz0wLGk9MS8wO2ZvcihsZXQgcz0wO3M8cjtzKyspe2UocyksZC5hcHBseU1hc2socyx0KTtsZXQgdT1kLmdldFBlbmFsdHlOMSh0KStkLmdldFBlbmFsdHlOMih0KStkLmdldFBlbmFsdHlOMyh0KStkLmdldFBlbmFsdHlONCh0KTtkLmFwcGx5TWFzayhzLHQpLHU8aSYmKGk9dSxvPXMpfXJldHVybiBvfX0pO3ZhciBjdD1nKHV0PT57dmFyIE49aigpLFE9WzEsMSwxLDEsMSwxLDEsMSwxLDEsMiwyLDEsMiwyLDQsMSwyLDQsNCwyLDQsNCw0LDIsNCw2LDUsMiw0LDYsNiwyLDUsOCw4LDQsNSw4LDgsNCw1LDgsMTEsNCw4LDEwLDExLDQsOSwxMiwxNiw0LDksMTYsMTYsNiwxMCwxMiwxOCw2LDEwLDE3LDE2LDYsMTEsMTYsMTksNiwxMywxOCwyMSw3LDE0LDIxLDI1LDgsMTYsMjAsMjUsOCwxNywyMywyNSw5LDE3LDIzLDM0LDksMTgsMjUsMzAsMTAsMjAsMjcsMzIsMTIsMjEsMjksMzUsMTIsMjMsMzQsMzcsMTIsMjUsMzQsNDAsMTMsMjYsMzUsNDIsMTQsMjgsMzgsNDUsMTUsMjksNDAsNDgsMTYsMzEsNDMsNTEsMTcsMzMsNDUsNTQsMTgsMzUsNDgsNTcsMTksMzcsNTEsNjAsMTksMzgsNTMsNjMsMjAsNDAsNTYsNjYsMjEsNDMsNTksNzAsMjIsNDUsNjIsNzQsMjQsNDcsNjUsNzcsMjUsNDksNjgsODFdLCQ9WzcsMTAsMTMsMTcsMTAsMTYsMjIsMjgsMTUsMjYsMzYsNDQsMjAsMzYsNTIsNjQsMjYsNDgsNzIsODgsMzYsNjQsOTYsMTEyLDQwLDcyLDEwOCwxMzAsNDgsODgsMTMyLDE1Niw2MCwxMTAsMTYwLDE5Miw3MiwxMzAsMTkyLDIyNCw4MCwxNTAsMjI0LDI2NCw5NiwxNzYsMjYwLDMwOCwxMDQsMTk4LDI4OCwzNTIsMTIwLDIxNiwzMjAsMzg0LDEzMiwyNDAsMzYwLDQzMiwxNDQsMjgwLDQwOCw0ODAsMTY4LDMwOCw0NDgsNTMyLDE4MCwzMzgsNTA0LDU4OCwxOTYsMzY0LDU0Niw2NTAsMjI0LDQxNiw2MDAsNzAwLDIyNCw0NDIsNjQ0LDc1MCwyNTIsNDc2LDY5MCw4MTYsMjcwLDUwNCw3NTAsOTAwLDMwMCw1NjAsODEwLDk2MCwzMTIsNTg4LDg3MCwxMDUwLDMzNiw2NDQsOTUyLDExMTAsMzYwLDcwMCwxMDIwLDEyMDAsMzkwLDcyOCwxMDUwLDEyNjAsNDIwLDc4NCwxMTQwLDEzNTAsNDUwLDgxMiwxMjAwLDE0NDAsNDgwLDg2OCwxMjkwLDE1MzAsNTEwLDkyNCwxMzUwLDE2MjAsNTQwLDk4MCwxNDQwLDE3MTAsNTcwLDEwMzYsMTUzMCwxODAwLDU3MCwxMDY0LDE1OTAsMTg5MCw2MDAsMTEyMCwxNjgwLDE5ODAsNjMwLDEyMDQsMTc3MCwyMTAwLDY2MCwxMjYwLDE4NjAsMjIyMCw3MjAsMTMxNiwxOTUwLDIzMTAsNzUwLDEzNzIsMjA0MCwyNDMwXTt1dC5nZXRCbG9ja3NDb3VudD1mdW5jdGlvbih0LGUpe3N3aXRjaChlKXtjYXNlIE4uTDpyZXR1cm4gUVsodC0xKSo0KzBdO2Nhc2UgTi5NOnJldHVybiBRWyh0LTEpKjQrMV07Y2FzZSBOLlE6cmV0dXJuIFFbKHQtMSkqNCsyXTtjYXNlIE4uSDpyZXR1cm4gUVsodC0xKSo0KzNdO2RlZmF1bHQ6cmV0dXJufX07dXQuZ2V0VG90YWxDb2Rld29yZHNDb3VudD1mdW5jdGlvbih0LGUpe3N3aXRjaChlKXtjYXNlIE4uTDpyZXR1cm4gJFsodC0xKSo0KzBdO2Nhc2UgTi5NOnJldHVybiAkWyh0LTEpKjQrMV07Y2FzZSBOLlE6cmV0dXJuICRbKHQtMSkqNCsyXTtjYXNlIE4uSDpyZXR1cm4gJFsodC0xKSo0KzNdO2RlZmF1bHQ6cmV0dXJufX19KTt2YXIgSnQ9ZyhaPT57dmFyIHo9bmV3IFVpbnQ4QXJyYXkoNTEyKSxXPW5ldyBVaW50OEFycmF5KDI1Nik7KGZ1bmN0aW9uKCl7bGV0IHQ9MTtmb3IobGV0IGU9MDtlPDI1NTtlKyspeltlXT10LFdbdF09ZSx0PDw9MSx0JjI1NiYmKHRePTI4NSk7Zm9yKGxldCBlPTI1NTtlPDUxMjtlKyspeltlXT16W2UtMjU1XX0pKCk7Wi5sb2c9ZnVuY3Rpb24odCl7aWYodDwxKXRocm93IG5ldyBFcnJvcigibG9nKCIrdCsiKSIpO3JldHVybiBXW3RdfTtaLmV4cD1mdW5jdGlvbih0KXtyZXR1cm4gelt0XX07Wi5tdWw9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09PTB8fGU9PT0wPzA6eltXW3RdK1dbZV1dfX0pO3ZhciBZdD1nKFY9Pnt2YXIgbHQ9SnQoKTtWLm11bD1mdW5jdGlvbih0LGUpe2xldCByPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoK2UubGVuZ3RoLTEpO2ZvcihsZXQgbz0wO288dC5sZW5ndGg7bysrKWZvcihsZXQgaT0wO2k8ZS5sZW5ndGg7aSsrKXJbbytpXV49bHQubXVsKHRbb10sZVtpXSk7cmV0dXJuIHJ9O1YubW9kPWZ1bmN0aW9uKHQsZSl7bGV0IHI9bmV3IFVpbnQ4QXJyYXkodCk7Zm9yKDtyLmxlbmd0aC1lLmxlbmd0aD49MDspe2xldCBvPXJbMF07Zm9yKGxldCBzPTA7czxlLmxlbmd0aDtzKyspcltzXV49bHQubXVsKGVbc10sbyk7bGV0IGk9MDtmb3IoO2k8ci5sZW5ndGgmJnJbaV09PT0wOylpKys7cj1yLnNsaWNlKGkpfXJldHVybiByfTtWLmdlbmVyYXRlRUNQb2x5bm9taWFsPWZ1bmN0aW9uKHQpe2xldCBlPW5ldyBVaW50OEFycmF5KFsxXSk7Zm9yKGxldCByPTA7cjx0O3IrKyllPVYubXVsKGUsbmV3IFVpbnQ4QXJyYXkoWzEsbHQuZXhwKHIpXSkpO3JldHVybiBlfX0pO3ZhciBHdD1nKChrbixqdCk9Pnt2YXIgT3Q9WXQoKTtmdW5jdGlvbiBhdChuKXt0aGlzLmdlblBvbHk9dm9pZCAwLHRoaXMuZGVncmVlPW4sdGhpcy5kZWdyZWUmJnRoaXMuaW5pdGlhbGl6ZSh0aGlzLmRlZ3JlZSl9YXQucHJvdG90eXBlLmluaXRpYWxpemU9ZnVuY3Rpb24odCl7dGhpcy5kZWdyZWU9dCx0aGlzLmdlblBvbHk9T3QuZ2VuZXJhdGVFQ1BvbHlub21pYWwodGhpcy5kZWdyZWUpfTthdC5wcm90b3R5cGUuZW5jb2RlPWZ1bmN0aW9uKHQpe2lmKCF0aGlzLmdlblBvbHkpdGhyb3cgbmV3IEVycm9yKCJFbmNvZGVyIG5vdCBpbml0aWFsaXplZCIpO2xldCBlPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoK3RoaXMuZGVncmVlKTtlLnNldCh0KTtsZXQgcj1PdC5tb2QoZSx0aGlzLmdlblBvbHkpLG89dGhpcy5kZWdyZWUtci5sZW5ndGg7aWYobz4wKXtsZXQgaT1uZXcgVWludDhBcnJheSh0aGlzLmRlZ3JlZSk7cmV0dXJuIGkuc2V0KHIsbyksaX1yZXR1cm4gcn07anQuZXhwb3J0cz1hdH0pO3ZhciBmdD1nKFF0PT57UXQuaXNWYWxpZD1mdW5jdGlvbih0KXtyZXR1cm4haXNOYU4odCkmJnQ+PTEmJnQ8PTQwfX0pO3ZhciBndD1nKEI9Pnt2YXIgJHQ9IlswLTldKyIsRGU9IltBLVogJCUqK1xcLS4vOl0rIixIPSIoPzpbdTMwMDAtdTMwM0ZdfFt1MzA0MC11MzA5Rl18W3UzMEEwLXUzMEZGXXxbdUZGMDAtdUZGRUZdfFt1NEUwMC11OUZBRl18W3UyNjA1LXUyNjA2XXxbdTIxOTAtdTIxOTVdfHUyMDNCfFt1MjAxMHUyMDE1dTIwMTh1MjAxOXUyMDI1dTIwMjZ1MjAxQ3UyMDFEdTIyMjV1MjI2MF18W3UwMzkxLXUwNDUxXXxbdTAwQTd1MDBBOHUwMEIxdTAwQjR1MDBEN3UwMEY3XSkrIjtIPUgucmVwbGFjZSgvdS9nLCJcXHUiKTt2YXIgRmU9Iig/Oig/IVtBLVowLTkgJCUqK1xcLS4vOl18IitIK2ApKD86LnxbXHIKXSkpK2A7Qi5LQU5KST1uZXcgUmVnRXhwKEgsImciKTtCLkJZVEVfS0FOSkk9bmV3IFJlZ0V4cCgiW15BLVowLTkgJCUqK1xcLS4vOl0rIiwiZyIpO0IuQllURT1uZXcgUmVnRXhwKEZlLCJnIik7Qi5OVU1FUklDPW5ldyBSZWdFeHAoJHQsImciKTtCLkFMUEhBTlVNRVJJQz1uZXcgUmVnRXhwKERlLCJnIik7dmFyIGtlPW5ldyBSZWdFeHAoIl4iK0grIiQiKSx6ZT1uZXcgUmVnRXhwKCJeIiskdCsiJCIpLFZlPW5ldyBSZWdFeHAoIl5bQS1aMC05ICQlKitcXC0uLzpdKyQiKTtCLnRlc3RLYW5qaT1mdW5jdGlvbih0KXtyZXR1cm4ga2UudGVzdCh0KX07Qi50ZXN0TnVtZXJpYz1mdW5jdGlvbih0KXtyZXR1cm4gemUudGVzdCh0KX07Qi50ZXN0QWxwaGFudW1lcmljPWZ1bmN0aW9uKHQpe3JldHVybiBWZS50ZXN0KHQpfX0pO3ZhciBNPWcocD0+e3ZhciBIZT1mdCgpLGR0PWd0KCk7cC5OVU1FUklDPXtpZDoiTnVtZXJpYyIsYml0OjEsY2NCaXRzOlsxMCwxMiwxNF19O3AuQUxQSEFOVU1FUklDPXtpZDoiQWxwaGFudW1lcmljIixiaXQ6MixjY0JpdHM6WzksMTEsMTNdfTtwLkJZVEU9e2lkOiJCeXRlIixiaXQ6NCxjY0JpdHM6WzgsMTYsMTZdfTtwLktBTkpJPXtpZDoiS2FuamkiLGJpdDo4LGNjQml0czpbOCwxMCwxMl19O3AuTUlYRUQ9e2JpdDotMX07cC5nZXRDaGFyQ291bnRJbmRpY2F0b3I9ZnVuY3Rpb24odCxlKXtpZighdC5jY0JpdHMpdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIG1vZGU6ICIrdCk7aWYoIUhlLmlzVmFsaWQoZSkpdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIHZlcnNpb246ICIrZSk7cmV0dXJuIGU+PTEmJmU8MTA/dC5jY0JpdHNbMF06ZTwyNz90LmNjQml0c1sxXTp0LmNjQml0c1syXX07cC5nZXRCZXN0TW9kZUZvckRhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIGR0LnRlc3ROdW1lcmljKHQpP3AuTlVNRVJJQzpkdC50ZXN0QWxwaGFudW1lcmljKHQpP3AuQUxQSEFOVU1FUklDOmR0LnRlc3RLYW5qaSh0KT9wLktBTkpJOnAuQllURX07cC50b1N0cmluZz1mdW5jdGlvbih0KXtpZih0JiZ0LmlkKXJldHVybiB0LmlkO3Rocm93IG5ldyBFcnJvcigiSW52YWxpZCBtb2RlIil9O3AuaXNWYWxpZD1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5iaXQmJnQuY2NCaXRzfTtmdW5jdGlvbiBLZShuKXtpZih0eXBlb2YgbiE9InN0cmluZyIpdGhyb3cgbmV3IEVycm9yKCJQYXJhbSBpcyBub3QgYSBzdHJpbmciKTtzd2l0Y2gobi50b0xvd2VyQ2FzZSgpKXtjYXNlIm51bWVyaWMiOnJldHVybiBwLk5VTUVSSUM7Y2FzZSJhbHBoYW51bWVyaWMiOnJldHVybiBwLkFMUEhBTlVNRVJJQztjYXNlImthbmppIjpyZXR1cm4gcC5LQU5KSTtjYXNlImJ5dGUiOnJldHVybiBwLkJZVEU7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlVua25vd24gbW9kZTogIituKX19cC5mcm9tPWZ1bmN0aW9uKHQsZSl7aWYocC5pc1ZhbGlkKHQpKXJldHVybiB0O3RyeXtyZXR1cm4gS2UodCl9Y2F0Y2h7cmV0dXJuIGV9fX0pO3ZhciB0ZT1nKFI9Pnt2YXIgWD1JKCksSmU9Y3QoKSxXdD1qKCksUz1NKCksaHQ9ZnQoKSxYdD03OTczLFp0PVguZ2V0QkNIRGlnaXQoWHQpO2Z1bmN0aW9uIFllKG4sdCxlKXtmb3IobGV0IHI9MTtyPD00MDtyKyspaWYodDw9Ui5nZXRDYXBhY2l0eShyLGUsbikpcmV0dXJuIHJ9ZnVuY3Rpb24gdnQobix0KXtyZXR1cm4gUy5nZXRDaGFyQ291bnRJbmRpY2F0b3Iobix0KSs0fWZ1bmN0aW9uIE9lKG4sdCl7bGV0IGU9MDtyZXR1cm4gbi5mb3JFYWNoKGZ1bmN0aW9uKHIpe2xldCBvPXZ0KHIubW9kZSx0KTtlKz1vK3IuZ2V0Qml0c0xlbmd0aCgpfSksZX1mdW5jdGlvbiBqZShuLHQpe2ZvcihsZXQgZT0xO2U8PTQwO2UrKylpZihPZShuLGUpPD1SLmdldENhcGFjaXR5KGUsdCxTLk1JWEVEKSlyZXR1cm4gZX1SLmZyb209ZnVuY3Rpb24odCxlKXtyZXR1cm4gaHQuaXNWYWxpZCh0KT9wYXJzZUludCh0LDEwKTplfTtSLmdldENhcGFjaXR5PWZ1bmN0aW9uKHQsZSxyKXtpZighaHQuaXNWYWxpZCh0KSl0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgUVIgQ29kZSB2ZXJzaW9uIik7dHlwZW9mIHI+InUiJiYocj1TLkJZVEUpO2xldCBvPVguZ2V0U3ltYm9sVG90YWxDb2Rld29yZHModCksaT1KZS5nZXRUb3RhbENvZGV3b3Jkc0NvdW50KHQsZSkscz0oby1pKSo4O2lmKHI9PT1TLk1JWEVEKXJldHVybiBzO2xldCB1PXMtdnQocix0KTtzd2l0Y2gocil7Y2FzZSBTLk5VTUVSSUM6cmV0dXJuIE1hdGguZmxvb3IodS8xMCozKTtjYXNlIFMuQUxQSEFOVU1FUklDOnJldHVybiBNYXRoLmZsb29yKHUvMTEqMik7Y2FzZSBTLktBTkpJOnJldHVybiBNYXRoLmZsb29yKHUvMTMpO2Nhc2UgUy5CWVRFOmRlZmF1bHQ6cmV0dXJuIE1hdGguZmxvb3IodS84KX19O1IuZ2V0QmVzdFZlcnNpb25Gb3JEYXRhPWZ1bmN0aW9uKHQsZSl7bGV0IHIsbz1XdC5mcm9tKGUsV3QuTSk7aWYoQXJyYXkuaXNBcnJheSh0KSl7aWYodC5sZW5ndGg+MSlyZXR1cm4gamUodCxvKTtpZih0Lmxlbmd0aD09PTApcmV0dXJuIDE7cj10WzBdfWVsc2Ugcj10O3JldHVybiBZZShyLm1vZGUsci5nZXRMZW5ndGgoKSxvKX07Ui5nZXRFbmNvZGVkQml0cz1mdW5jdGlvbih0KXtpZighaHQuaXNWYWxpZCh0KXx8dDw3KXRocm93IG5ldyBFcnJvcigiSW52YWxpZCBRUiBDb2RlIHZlcnNpb24iKTtsZXQgZT10PDwxMjtmb3IoO1guZ2V0QkNIRGlnaXQoZSktWnQ+PTA7KWVePVh0PDxYLmdldEJDSERpZ2l0KGUpLVp0O3JldHVybiB0PDwxMnxlfX0pO3ZhciBvZT1nKHJlPT57dmFyIHB0PUkoKSxuZT0xMzM1LEdlPTIxNTIyLGVlPXB0LmdldEJDSERpZ2l0KG5lKTtyZS5nZXRFbmNvZGVkQml0cz1mdW5jdGlvbih0LGUpe2xldCByPXQuYml0PDwzfGUsbz1yPDwxMDtmb3IoO3B0LmdldEJDSERpZ2l0KG8pLWVlPj0wOylvXj1uZTw8cHQuZ2V0QkNIRGlnaXQobyktZWU7cmV0dXJuKHI8PDEwfG8pXkdlfX0pO3ZhciBzZT1nKChZbixpZSk9Pnt2YXIgUWU9TSgpO2Z1bmN0aW9uIHgobil7dGhpcy5tb2RlPVFlLk5VTUVSSUMsdGhpcy5kYXRhPW4udG9TdHJpbmcoKX14LmdldEJpdHNMZW5ndGg9ZnVuY3Rpb24odCl7cmV0dXJuIDEwKk1hdGguZmxvb3IodC8zKSsodCUzP3QlMyozKzE6MCl9O3gucHJvdG90eXBlLmdldExlbmd0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGEubGVuZ3RofTt4LnByb3RvdHlwZS5nZXRCaXRzTGVuZ3RoPWZ1bmN0aW9uKCl7cmV0dXJuIHguZ2V0Qml0c0xlbmd0aCh0aGlzLmRhdGEubGVuZ3RoKX07eC5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24odCl7bGV0IGUscixvO2ZvcihlPTA7ZSszPD10aGlzLmRhdGEubGVuZ3RoO2UrPTMpcj10aGlzLmRhdGEuc3Vic3RyKGUsMyksbz1wYXJzZUludChyLDEwKSx0LnB1dChvLDEwKTtsZXQgaT10aGlzLmRhdGEubGVuZ3RoLWU7aT4wJiYocj10aGlzLmRhdGEuc3Vic3RyKGUpLG89cGFyc2VJbnQociwxMCksdC5wdXQobyxpKjMrMSkpfTtpZS5leHBvcnRzPXh9KTt2YXIgY2U9ZygoT24sdWUpPT57dmFyICRlPU0oKSx3dD1bIjAiLCIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiLCI3IiwiOCIsIjkiLCJBIiwiQiIsIkMiLCJEIiwiRSIsIkYiLCJHIiwiSCIsIkkiLCJKIiwiSyIsIkwiLCJNIiwiTiIsIk8iLCJQIiwiUSIsIlIiLCJTIiwiVCIsIlUiLCJWIiwiVyIsIlgiLCJZIiwiWiIsIiAiLCIkIiwiJSIsIioiLCIrIiwiLSIsIi4iLCIvIiwiOiJdO2Z1bmN0aW9uIFUobil7dGhpcy5tb2RlPSRlLkFMUEhBTlVNRVJJQyx0aGlzLmRhdGE9bn1VLmdldEJpdHNMZW5ndGg9ZnVuY3Rpb24odCl7cmV0dXJuIDExKk1hdGguZmxvb3IodC8yKSs2Kih0JTIpfTtVLnByb3RvdHlwZS5nZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kYXRhLmxlbmd0aH07VS5wcm90b3R5cGUuZ2V0Qml0c0xlbmd0aD1mdW5jdGlvbigpe3JldHVybiBVLmdldEJpdHNMZW5ndGgodGhpcy5kYXRhLmxlbmd0aCl9O1UucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKHQpe2xldCBlO2ZvcihlPTA7ZSsyPD10aGlzLmRhdGEubGVuZ3RoO2UrPTIpe2xldCByPXd0LmluZGV4T2YodGhpcy5kYXRhW2VdKSo0NTtyKz13dC5pbmRleE9mKHRoaXMuZGF0YVtlKzFdKSx0LnB1dChyLDExKX10aGlzLmRhdGEubGVuZ3RoJTImJnQucHV0KHd0LmluZGV4T2YodGhpcy5kYXRhW2VdKSw2KX07dWUuZXhwb3J0cz1VfSk7dmFyIGFlPWcoKGpuLGxlKT0+e3ZhciBXZT1NKCk7ZnVuY3Rpb24gcShuKXt0aGlzLm1vZGU9V2UuQllURSx0eXBlb2Ygbj09InN0cmluZyI/dGhpcy5kYXRhPW5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShuKTp0aGlzLmRhdGE9bmV3IFVpbnQ4QXJyYXkobil9cS5nZXRCaXRzTGVuZ3RoPWZ1bmN0aW9uKHQpe3JldHVybiB0Kjh9O3EucHJvdG90eXBlLmdldExlbmd0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRhdGEubGVuZ3RofTtxLnByb3RvdHlwZS5nZXRCaXRzTGVuZ3RoPWZ1bmN0aW9uKCl7cmV0dXJuIHEuZ2V0Qml0c0xlbmd0aCh0aGlzLmRhdGEubGVuZ3RoKX07cS5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24obil7Zm9yKGxldCB0PTAsZT10aGlzLmRhdGEubGVuZ3RoO3Q8ZTt0Kyspbi5wdXQodGhpcy5kYXRhW3RdLDgpfTtsZS5leHBvcnRzPXF9KTt2YXIgZ2U9ZygoR24sZmUpPT57dmFyIFplPU0oKSxYZT1JKCk7ZnVuY3Rpb24gRChuKXt0aGlzLm1vZGU9WmUuS0FOSkksdGhpcy5kYXRhPW59RC5nZXRCaXRzTGVuZ3RoPWZ1bmN0aW9uKHQpe3JldHVybiB0KjEzfTtELnByb3RvdHlwZS5nZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kYXRhLmxlbmd0aH07RC5wcm90b3R5cGUuZ2V0Qml0c0xlbmd0aD1mdW5jdGlvbigpe3JldHVybiBELmdldEJpdHNMZW5ndGgodGhpcy5kYXRhLmxlbmd0aCl9O0QucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKG4pe2xldCB0O2Zvcih0PTA7dDx0aGlzLmRhdGEubGVuZ3RoO3QrKyl7bGV0IGU9WGUudG9TSklTKHRoaXMuZGF0YVt0XSk7aWYoZT49MzMwODgmJmU8PTQwOTU2KWUtPTMzMDg4O2Vsc2UgaWYoZT49NTc0MDgmJmU8PTYwMzUxKWUtPTQ5NDcyO2Vsc2UgdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIFNKSVMgY2hhcmFjdGVyOiAiK3RoaXMuZGF0YVt0XStgCk1ha2Ugc3VyZSB5b3VyIGNoYXJzZXQgaXMgVVRGLThgKTtlPShlPj4+OCYyNTUpKjE5MisoZSYyNTUpLG4ucHV0KGUsMTMpfX07ZmUuZXhwb3J0cz1EfSk7dmFyIGRlPWcoKFFuLG10KT0+eyJ1c2Ugc3RyaWN0Ijt2YXIgSz17c2luZ2xlX3NvdXJjZV9zaG9ydGVzdF9wYXRoczpmdW5jdGlvbihuLHQsZSl7dmFyIHI9e30sbz17fTtvW3RdPTA7dmFyIGk9Sy5Qcmlvcml0eVF1ZXVlLm1ha2UoKTtpLnB1c2godCwwKTtmb3IodmFyIHMsdSxjLGwsYSx3LGgseSxBOyFpLmVtcHR5KCk7KXtzPWkucG9wKCksdT1zLnZhbHVlLGw9cy5jb3N0LGE9blt1XXx8e307Zm9yKGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiYodz1hW2NdLGg9bCt3LHk9b1tjXSxBPXR5cGVvZiBvW2NdPiJ1IiwoQXx8eT5oKSYmKG9bY109aCxpLnB1c2goYyxoKSxyW2NdPXUpKX1pZih0eXBlb2YgZTwidSImJnR5cGVvZiBvW2VdPiJ1Iil7dmFyIFQ9WyJDb3VsZCBub3QgZmluZCBhIHBhdGggZnJvbSAiLHQsIiB0byAiLGUsIi4iXS5qb2luKCIiKTt0aHJvdyBuZXcgRXJyb3IoVCl9cmV0dXJuIHJ9LGV4dHJhY3Rfc2hvcnRlc3RfcGF0aF9mcm9tX3ByZWRlY2Vzc29yX2xpc3Q6ZnVuY3Rpb24obix0KXtmb3IodmFyIGU9W10scj10LG87cjspZS5wdXNoKHIpLG89bltyXSxyPW5bcl07cmV0dXJuIGUucmV2ZXJzZSgpLGV9LGZpbmRfcGF0aDpmdW5jdGlvbihuLHQsZSl7dmFyIHI9Sy5zaW5nbGVfc291cmNlX3Nob3J0ZXN0X3BhdGhzKG4sdCxlKTtyZXR1cm4gSy5leHRyYWN0X3Nob3J0ZXN0X3BhdGhfZnJvbV9wcmVkZWNlc3Nvcl9saXN0KHIsZSl9LFByaW9yaXR5UXVldWU6e21ha2U6ZnVuY3Rpb24obil7dmFyIHQ9Sy5Qcmlvcml0eVF1ZXVlLGU9e30scjtuPW58fHt9O2ZvcihyIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShyKSYmKGVbcl09dFtyXSk7cmV0dXJuIGUucXVldWU9W10sZS5zb3J0ZXI9bi5zb3J0ZXJ8fHQuZGVmYXVsdF9zb3J0ZXIsZX0sZGVmYXVsdF9zb3J0ZXI6ZnVuY3Rpb24obix0KXtyZXR1cm4gbi5jb3N0LXQuY29zdH0scHVzaDpmdW5jdGlvbihuLHQpe3ZhciBlPXt2YWx1ZTpuLGNvc3Q6dH07dGhpcy5xdWV1ZS5wdXNoKGUpLHRoaXMucXVldWUuc29ydCh0aGlzLnNvcnRlcil9LHBvcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnF1ZXVlLnNoaWZ0KCl9LGVtcHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucXVldWUubGVuZ3RoPT09MH19fTt0eXBlb2YgbXQ8InUiJiYobXQuZXhwb3J0cz1LKX0pO3ZhciBCZT1nKEY9Pnt2YXIgZj1NKCksd2U9c2UoKSxtZT1jZSgpLHllPWFlKCksRWU9Z2UoKSxKPWd0KCksdj1JKCksdmU9ZGUoKTtmdW5jdGlvbiBoZShuKXtyZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KG4pKS5sZW5ndGh9ZnVuY3Rpb24gWShuLHQsZSl7bGV0IHI9W10sbztmb3IoOyhvPW4uZXhlYyhlKSkhPT1udWxsOylyLnB1c2goe2RhdGE6b1swXSxpbmRleDpvLmluZGV4LG1vZGU6dCxsZW5ndGg6b1swXS5sZW5ndGh9KTtyZXR1cm4gcn1mdW5jdGlvbiBDZShuKXtsZXQgdD1ZKEouTlVNRVJJQyxmLk5VTUVSSUMsbiksZT1ZKEouQUxQSEFOVU1FUklDLGYuQUxQSEFOVU1FUklDLG4pLHIsbztyZXR1cm4gdi5pc0thbmppTW9kZUVuYWJsZWQoKT8ocj1ZKEouQllURSxmLkJZVEUsbiksbz1ZKEouS0FOSkksZi5LQU5KSSxuKSk6KHI9WShKLkJZVEVfS0FOSkksZi5CWVRFLG4pLG89W10pLHQuY29uY2F0KGUscixvKS5zb3J0KGZ1bmN0aW9uKHMsdSl7cmV0dXJuIHMuaW5kZXgtdS5pbmRleH0pLm1hcChmdW5jdGlvbihzKXtyZXR1cm57ZGF0YTpzLmRhdGEsbW9kZTpzLm1vZGUsbGVuZ3RoOnMubGVuZ3RofX0pfWZ1bmN0aW9uIHl0KG4sdCl7c3dpdGNoKHQpe2Nhc2UgZi5OVU1FUklDOnJldHVybiB3ZS5nZXRCaXRzTGVuZ3RoKG4pO2Nhc2UgZi5BTFBIQU5VTUVSSUM6cmV0dXJuIG1lLmdldEJpdHNMZW5ndGgobik7Y2FzZSBmLktBTkpJOnJldHVybiBFZS5nZXRCaXRzTGVuZ3RoKG4pO2Nhc2UgZi5CWVRFOnJldHVybiB5ZS5nZXRCaXRzTGVuZ3RoKG4pfX1mdW5jdGlvbiB0bihuKXtyZXR1cm4gbi5yZWR1Y2UoZnVuY3Rpb24odCxlKXtsZXQgcj10Lmxlbmd0aC0xPj0wP3RbdC5sZW5ndGgtMV06bnVsbDtyZXR1cm4gciYmci5tb2RlPT09ZS5tb2RlPyh0W3QubGVuZ3RoLTFdLmRhdGErPWUuZGF0YSx0KToodC5wdXNoKGUpLHQpfSxbXSl9ZnVuY3Rpb24gZW4obil7bGV0IHQ9W107Zm9yKGxldCBlPTA7ZTxuLmxlbmd0aDtlKyspe2xldCByPW5bZV07c3dpdGNoKHIubW9kZSl7Y2FzZSBmLk5VTUVSSUM6dC5wdXNoKFtyLHtkYXRhOnIuZGF0YSxtb2RlOmYuQUxQSEFOVU1FUklDLGxlbmd0aDpyLmxlbmd0aH0se2RhdGE6ci5kYXRhLG1vZGU6Zi5CWVRFLGxlbmd0aDpyLmxlbmd0aH1dKTticmVhaztjYXNlIGYuQUxQSEFOVU1FUklDOnQucHVzaChbcix7ZGF0YTpyLmRhdGEsbW9kZTpmLkJZVEUsbGVuZ3RoOnIubGVuZ3RofV0pO2JyZWFrO2Nhc2UgZi5LQU5KSTp0LnB1c2goW3Ise2RhdGE6ci5kYXRhLG1vZGU6Zi5CWVRFLGxlbmd0aDpoZShyLmRhdGEpfV0pO2JyZWFrO2Nhc2UgZi5CWVRFOnQucHVzaChbe2RhdGE6ci5kYXRhLG1vZGU6Zi5CWVRFLGxlbmd0aDpoZShyLmRhdGEpfV0pfX1yZXR1cm4gdH1mdW5jdGlvbiBubihuLHQpe2xldCBlPXt9LHI9e3N0YXJ0Ont9fSxvPVsic3RhcnQiXTtmb3IobGV0IGk9MDtpPG4ubGVuZ3RoO2krKyl7bGV0IHM9bltpXSx1PVtdO2ZvcihsZXQgYz0wO2M8cy5sZW5ndGg7YysrKXtsZXQgbD1zW2NdLGE9IiIraStjO3UucHVzaChhKSxlW2FdPXtub2RlOmwsbGFzdENvdW50OjB9LHJbYV09e307Zm9yKGxldCB3PTA7dzxvLmxlbmd0aDt3Kyspe2xldCBoPW9bd107ZVtoXSYmZVtoXS5ub2RlLm1vZGU9PT1sLm1vZGU/KHJbaF1bYV09eXQoZVtoXS5sYXN0Q291bnQrbC5sZW5ndGgsbC5tb2RlKS15dChlW2hdLmxhc3RDb3VudCxsLm1vZGUpLGVbaF0ubGFzdENvdW50Kz1sLmxlbmd0aCk6KGVbaF0mJihlW2hdLmxhc3RDb3VudD1sLmxlbmd0aCkscltoXVthXT15dChsLmxlbmd0aCxsLm1vZGUpKzQrZi5nZXRDaGFyQ291bnRJbmRpY2F0b3IobC5tb2RlLHQpKX19bz11fWZvcihsZXQgaT0wO2k8by5sZW5ndGg7aSsrKXJbb1tpXV0uZW5kPTA7cmV0dXJue21hcDpyLHRhYmxlOmV9fWZ1bmN0aW9uIHBlKG4sdCl7bGV0IGUscj1mLmdldEJlc3RNb2RlRm9yRGF0YShuKTtpZihlPWYuZnJvbSh0LHIpLGUhPT1mLkJZVEUmJmUuYml0PHIuYml0KXRocm93IG5ldyBFcnJvcignIicrbisnIiBjYW5ub3QgYmUgZW5jb2RlZCB3aXRoIG1vZGUgJytmLnRvU3RyaW5nKGUpK2AuCiBTdWdnZXN0ZWQgbW9kZSBpczogYCtmLnRvU3RyaW5nKHIpKTtzd2l0Y2goZT09PWYuS0FOSkkmJiF2LmlzS2FuamlNb2RlRW5hYmxlZCgpJiYoZT1mLkJZVEUpLGUpe2Nhc2UgZi5OVU1FUklDOnJldHVybiBuZXcgd2Uobik7Y2FzZSBmLkFMUEhBTlVNRVJJQzpyZXR1cm4gbmV3IG1lKG4pO2Nhc2UgZi5LQU5KSTpyZXR1cm4gbmV3IEVlKG4pO2Nhc2UgZi5CWVRFOnJldHVybiBuZXcgeWUobil9fUYuZnJvbUFycmF5PWZ1bmN0aW9uKHQpe3JldHVybiB0LnJlZHVjZShmdW5jdGlvbihlLHIpe3JldHVybiB0eXBlb2Ygcj09InN0cmluZyI/ZS5wdXNoKHBlKHIsbnVsbCkpOnIuZGF0YSYmZS5wdXNoKHBlKHIuZGF0YSxyLm1vZGUpKSxlfSxbXSl9O0YuZnJvbVN0cmluZz1mdW5jdGlvbih0LGUpe2xldCByPUNlKHQsdi5pc0thbmppTW9kZUVuYWJsZWQoKSksbz1lbihyKSxpPW5uKG8sZSkscz12ZS5maW5kX3BhdGgoaS5tYXAsInN0YXJ0IiwiZW5kIiksdT1bXTtmb3IobGV0IGM9MTtjPHMubGVuZ3RoLTE7YysrKXUucHVzaChpLnRhYmxlW3NbY11dLm5vZGUpO3JldHVybiBGLmZyb21BcnJheSh0bih1KSl9O0YucmF3U3BsaXQ9ZnVuY3Rpb24odCl7cmV0dXJuIEYuZnJvbUFycmF5KENlKHQsdi5pc0thbmppTW9kZUVuYWJsZWQoKSkpfX0pO3ZhciBUZT1nKEFlPT57dmFyIGV0PUkoKSxFdD1qKCkscm49cXQoKSxvbj1GdCgpLHNuPWt0KCksdW49SHQoKSxBdD1LdCgpLFR0PWN0KCksY249R3QoKSx0dD10ZSgpLGxuPW9lKCksYW49TSgpLEN0PUJlKCk7ZnVuY3Rpb24gZm4obix0KXtsZXQgZT1uLnNpemUscj11bi5nZXRQb3NpdGlvbnModCk7Zm9yKGxldCBvPTA7bzxyLmxlbmd0aDtvKyspe2xldCBpPXJbb11bMF0scz1yW29dWzFdO2ZvcihsZXQgdT0tMTt1PD03O3UrKylpZighKGkrdTw9LTF8fGU8PWkrdSkpZm9yKGxldCBjPS0xO2M8PTc7YysrKXMrYzw9LTF8fGU8PXMrY3x8KHU+PTAmJnU8PTYmJihjPT09MHx8Yz09PTYpfHxjPj0wJiZjPD02JiYodT09PTB8fHU9PT02KXx8dT49MiYmdTw9NCYmYz49MiYmYzw9ND9uLnNldChpK3UscytjLCEwLCEwKTpuLnNldChpK3UscytjLCExLCEwKSl9fWZ1bmN0aW9uIGduKG4pe2xldCB0PW4uc2l6ZTtmb3IobGV0IGU9ODtlPHQtODtlKyspe2xldCByPWUlMj09PTA7bi5zZXQoZSw2LHIsITApLG4uc2V0KDYsZSxyLCEwKX19ZnVuY3Rpb24gZG4obix0KXtsZXQgZT1zbi5nZXRQb3NpdGlvbnModCk7Zm9yKGxldCByPTA7cjxlLmxlbmd0aDtyKyspe2xldCBvPWVbcl1bMF0saT1lW3JdWzFdO2ZvcihsZXQgcz0tMjtzPD0yO3MrKylmb3IobGV0IHU9LTI7dTw9Mjt1Kyspcz09PS0yfHxzPT09Mnx8dT09PS0yfHx1PT09Mnx8cz09PTAmJnU9PT0wP24uc2V0KG8rcyxpK3UsITAsITApOm4uc2V0KG8rcyxpK3UsITEsITApfX1mdW5jdGlvbiBobihuLHQpe2xldCBlPW4uc2l6ZSxyPXR0LmdldEVuY29kZWRCaXRzKHQpLG8saSxzO2ZvcihsZXQgdT0wO3U8MTg7dSsrKW89TWF0aC5mbG9vcih1LzMpLGk9dSUzK2UtOC0zLHM9KHI+PnUmMSk9PT0xLG4uc2V0KG8saSxzLCEwKSxuLnNldChpLG8scywhMCl9ZnVuY3Rpb24gQnQobix0LGUpe2xldCByPW4uc2l6ZSxvPWxuLmdldEVuY29kZWRCaXRzKHQsZSksaSxzO2ZvcihpPTA7aTwxNTtpKyspcz0obz4+aSYxKT09PTEsaTw2P24uc2V0KGksOCxzLCEwKTppPDg/bi5zZXQoaSsxLDgscywhMCk6bi5zZXQoci0xNStpLDgscywhMCksaTw4P24uc2V0KDgsci1pLTEscywhMCk6aTw5P24uc2V0KDgsMTUtaS0xKzEscywhMCk6bi5zZXQoOCwxNS1pLTEscywhMCk7bi5zZXQoci04LDgsMSwhMCl9ZnVuY3Rpb24gcG4obix0KXtsZXQgZT1uLnNpemUscj0tMSxvPWUtMSxpPTcscz0wO2ZvcihsZXQgdT1lLTE7dT4wO3UtPTIpZm9yKHU9PT02JiZ1LS07Oyl7Zm9yKGxldCBjPTA7YzwyO2MrKylpZighbi5pc1Jlc2VydmVkKG8sdS1jKSl7bGV0IGw9ITE7czx0Lmxlbmd0aCYmKGw9KHRbc10+Pj5pJjEpPT09MSksbi5zZXQobyx1LWMsbCksaS0tLGk9PT0tMSYmKHMrKyxpPTcpfWlmKG8rPXIsbzwwfHxlPD1vKXtvLT1yLHI9LXI7YnJlYWt9fX1mdW5jdGlvbiB3bihuLHQsZSl7bGV0IHI9bmV3IHJuO2UuZm9yRWFjaChmdW5jdGlvbihjKXtyLnB1dChjLm1vZGUuYml0LDQpLHIucHV0KGMuZ2V0TGVuZ3RoKCksYW4uZ2V0Q2hhckNvdW50SW5kaWNhdG9yKGMubW9kZSxuKSksYy53cml0ZShyKX0pO2xldCBvPWV0LmdldFN5bWJvbFRvdGFsQ29kZXdvcmRzKG4pLGk9VHQuZ2V0VG90YWxDb2Rld29yZHNDb3VudChuLHQpLHM9KG8taSkqODtmb3Ioci5nZXRMZW5ndGhJbkJpdHMoKSs0PD1zJiZyLnB1dCgwLDQpO3IuZ2V0TGVuZ3RoSW5CaXRzKCklOCE9PTA7KXIucHV0Qml0KDApO2xldCB1PShzLXIuZ2V0TGVuZ3RoSW5CaXRzKCkpLzg7Zm9yKGxldCBjPTA7Yzx1O2MrKylyLnB1dChjJTI/MTc6MjM2LDgpO3JldHVybiBtbihyLG4sdCl9ZnVuY3Rpb24gbW4obix0LGUpe2xldCByPWV0LmdldFN5bWJvbFRvdGFsQ29kZXdvcmRzKHQpLG89VHQuZ2V0VG90YWxDb2Rld29yZHNDb3VudCh0LGUpLGk9ci1vLHM9VHQuZ2V0QmxvY2tzQ291bnQodCxlKSx1PXIlcyxjPXMtdSxsPU1hdGguZmxvb3Ioci9zKSxhPU1hdGguZmxvb3IoaS9zKSx3PWErMSxoPWwtYSx5PW5ldyBjbihoKSxBPTAsVD1uZXcgQXJyYXkocyksYnQ9bmV3IEFycmF5KHMpLHJ0PTAsUmU9bmV3IFVpbnQ4QXJyYXkobi5idWZmZXIpO2ZvcihsZXQgXz0wO188cztfKyspe2xldCBpdD1fPGM/YTp3O1RbX109UmUuc2xpY2UoQSxBK2l0KSxidFtfXT15LmVuY29kZShUW19dKSxBKz1pdCxydD1NYXRoLm1heChydCxpdCl9bGV0IG90PW5ldyBVaW50OEFycmF5KHIpLFJ0PTAsRSxDO2ZvcihFPTA7RTxydDtFKyspZm9yKEM9MDtDPHM7QysrKUU8VFtDXS5sZW5ndGgmJihvdFtSdCsrXT1UW0NdW0VdKTtmb3IoRT0wO0U8aDtFKyspZm9yKEM9MDtDPHM7QysrKW90W1J0KytdPWJ0W0NdW0VdO3JldHVybiBvdH1mdW5jdGlvbiB5bihuLHQsZSxyKXtsZXQgbztpZihBcnJheS5pc0FycmF5KG4pKW89Q3QuZnJvbUFycmF5KG4pO2Vsc2UgaWYodHlwZW9mIG49PSJzdHJpbmciKXtsZXQgbD10O2lmKCFsKXtsZXQgYT1DdC5yYXdTcGxpdChuKTtsPXR0LmdldEJlc3RWZXJzaW9uRm9yRGF0YShhLGUpfW89Q3QuZnJvbVN0cmluZyhuLGx8fDQwKX1lbHNlIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBkYXRhIik7bGV0IGk9dHQuZ2V0QmVzdFZlcnNpb25Gb3JEYXRhKG8sZSk7aWYoIWkpdGhyb3cgbmV3IEVycm9yKCJUaGUgYW1vdW50IG9mIGRhdGEgaXMgdG9vIGJpZyB0byBiZSBzdG9yZWQgaW4gYSBRUiBDb2RlIik7aWYoIXQpdD1pO2Vsc2UgaWYodDxpKXRocm93IG5ldyBFcnJvcihgClRoZSBjaG9zZW4gUVIgQ29kZSB2ZXJzaW9uIGNhbm5vdCBjb250YWluIHRoaXMgYW1vdW50IG9mIGRhdGEuCk1pbmltdW0gdmVyc2lvbiByZXF1aXJlZCB0byBzdG9yZSBjdXJyZW50IGRhdGEgaXM6IGAraStgLgpgKTtsZXQgcz13bih0LGUsbyksdT1ldC5nZXRTeW1ib2xTaXplKHQpLGM9bmV3IG9uKHUpO3JldHVybiBmbihjLHQpLGduKGMpLGRuKGMsdCksQnQoYyxlLDApLHQ+PTcmJmhuKGMsdCkscG4oYyxzKSxpc05hTihyKSYmKHI9QXQuZ2V0QmVzdE1hc2soYyxCdC5iaW5kKG51bGwsYyxlKSkpLEF0LmFwcGx5TWFzayhyLGMpLEJ0KGMsZSxyKSx7bW9kdWxlczpjLHZlcnNpb246dCxlcnJvckNvcnJlY3Rpb25MZXZlbDplLG1hc2tQYXR0ZXJuOnIsc2VnbWVudHM6b319QWUuY3JlYXRlPWZ1bmN0aW9uKHQsZSl7aWYodHlwZW9mIHQ+InUifHx0PT09IiIpdGhyb3cgbmV3IEVycm9yKCJObyBpbnB1dCB0ZXh0Iik7bGV0IHI9RXQuTSxvLGk7cmV0dXJuIHR5cGVvZiBlPCJ1IiYmKHI9RXQuZnJvbShlLmVycm9yQ29ycmVjdGlvbkxldmVsLEV0Lk0pLG89dHQuZnJvbShlLnZlcnNpb24pLGk9QXQuZnJvbShlLm1hc2tQYXR0ZXJuKSxlLnRvU0pJU0Z1bmMmJmV0LnNldFRvU0pJU0Z1bmN0aW9uKGUudG9TSklTRnVuYykpLHluKHQsbyxyLGkpfX0pO3ZhciBJdD1nKEw9PntmdW5jdGlvbiBJZShuKXtpZih0eXBlb2Ygbj09Im51bWJlciImJihuPW4udG9TdHJpbmcoKSksdHlwZW9mIG4hPSJzdHJpbmciKXRocm93IG5ldyBFcnJvcigiQ29sb3Igc2hvdWxkIGJlIGRlZmluZWQgYXMgaGV4IHN0cmluZyIpO2xldCB0PW4uc2xpY2UoKS5yZXBsYWNlKCIjIiwiIikuc3BsaXQoIiIpO2lmKHQubGVuZ3RoPDN8fHQubGVuZ3RoPT09NXx8dC5sZW5ndGg+OCl0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgaGV4IGNvbG9yOiAiK24pOyh0Lmxlbmd0aD09PTN8fHQubGVuZ3RoPT09NCkmJih0PUFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sdC5tYXAoZnVuY3Rpb24ocil7cmV0dXJuW3Iscl19KSkpLHQubGVuZ3RoPT09NiYmdC5wdXNoKCJGIiwiRiIpO2xldCBlPXBhcnNlSW50KHQuam9pbigiIiksMTYpO3JldHVybntyOmU+PjI0JjI1NSxnOmU+PjE2JjI1NSxiOmU+PjgmMjU1LGE6ZSYyNTUsaGV4OiIjIit0LnNsaWNlKDAsNikuam9pbigiIil9fUwuZ2V0T3B0aW9ucz1mdW5jdGlvbih0KXt0fHwodD17fSksdC5jb2xvcnx8KHQuY29sb3I9e30pO2xldCBlPXR5cGVvZiB0Lm1hcmdpbj4idSJ8fHQubWFyZ2luPT09bnVsbHx8dC5tYXJnaW48MD80OnQubWFyZ2luLHI9dC53aWR0aCYmdC53aWR0aD49MjE/dC53aWR0aDp2b2lkIDAsbz10LnNjYWxlfHw0O3JldHVybnt3aWR0aDpyLHNjYWxlOnI/NDpvLG1hcmdpbjplLGNvbG9yOntkYXJrOkllKHQuY29sb3IuZGFya3x8IiMwMDAwMDBmZiIpLGxpZ2h0OkllKHQuY29sb3IubGlnaHR8fCIjZmZmZmZmZmYiKX0sdHlwZTp0LnR5cGUscmVuZGVyZXJPcHRzOnQucmVuZGVyZXJPcHRzfHx7fX19O0wuZ2V0U2NhbGU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZS53aWR0aCYmZS53aWR0aD49dCtlLm1hcmdpbioyP2Uud2lkdGgvKHQrZS5tYXJnaW4qMik6ZS5zY2FsZX07TC5nZXRJbWFnZVdpZHRoPWZ1bmN0aW9uKHQsZSl7bGV0IHI9TC5nZXRTY2FsZSh0LGUpO3JldHVybiBNYXRoLmZsb29yKCh0K2UubWFyZ2luKjIpKnIpfTtMLnFyVG9JbWFnZURhdGE9ZnVuY3Rpb24odCxlLHIpe2xldCBvPWUubW9kdWxlcy5zaXplLGk9ZS5tb2R1bGVzLmRhdGEscz1MLmdldFNjYWxlKG8sciksdT1NYXRoLmZsb29yKChvK3IubWFyZ2luKjIpKnMpLGM9ci5tYXJnaW4qcyxsPVtyLmNvbG9yLmxpZ2h0LHIuY29sb3IuZGFya107Zm9yKGxldCBhPTA7YTx1O2ErKylmb3IobGV0IHc9MDt3PHU7dysrKXtsZXQgaD0oYSp1K3cpKjQseT1yLmNvbG9yLmxpZ2h0O2lmKGE+PWMmJnc+PWMmJmE8dS1jJiZ3PHUtYyl7bGV0IEE9TWF0aC5mbG9vcigoYS1jKS9zKSxUPU1hdGguZmxvb3IoKHctYykvcyk7eT1sW2lbQSpvK1RdPzE6MF19dFtoKytdPXkucix0W2grK109eS5nLHRbaCsrXT15LmIsdFtoXT15LmF9fX0pO3ZhciBOZT1nKG50PT57dmFyIE50PUl0KCk7ZnVuY3Rpb24gRW4obix0LGUpe24uY2xlYXJSZWN0KDAsMCx0LndpZHRoLHQuaGVpZ2h0KSx0LnN0eWxlfHwodC5zdHlsZT17fSksdC5oZWlnaHQ9ZSx0LndpZHRoPWUsdC5zdHlsZS5oZWlnaHQ9ZSsicHgiLHQuc3R5bGUud2lkdGg9ZSsicHgifWZ1bmN0aW9uIENuKCl7dHJ5e3JldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJjYW52YXMiKX1jYXRjaHt0aHJvdyBuZXcgRXJyb3IoIllvdSBuZWVkIHRvIHNwZWNpZnkgYSBjYW52YXMgZWxlbWVudCIpfX1udC5yZW5kZXI9ZnVuY3Rpb24odCxlLHIpe2xldCBvPXIsaT1lO3R5cGVvZiBvPiJ1IiYmKCFlfHwhZS5nZXRDb250ZXh0KSYmKG89ZSxlPXZvaWQgMCksZXx8KGk9Q24oKSksbz1OdC5nZXRPcHRpb25zKG8pO2xldCBzPU50LmdldEltYWdlV2lkdGgodC5tb2R1bGVzLnNpemUsbyksdT1pLmdldENvbnRleHQoIjJkIiksYz11LmNyZWF0ZUltYWdlRGF0YShzLHMpO3JldHVybiBOdC5xclRvSW1hZ2VEYXRhKGMuZGF0YSx0LG8pLEVuKHUsaSxzKSx1LnB1dEltYWdlRGF0YShjLDAsMCksaX07bnQucmVuZGVyVG9EYXRhVVJMPWZ1bmN0aW9uKHQsZSxyKXtsZXQgbz1yO3R5cGVvZiBvPiJ1IiYmKCFlfHwhZS5nZXRDb250ZXh0KSYmKG89ZSxlPXZvaWQgMCksb3x8KG89e30pO2xldCBpPW50LnJlbmRlcih0LGUsbykscz1vLnR5cGV8fCJpbWFnZS9wbmciLHU9by5yZW5kZXJlck9wdHN8fHt9O3JldHVybiBpLnRvRGF0YVVSTChzLHUucXVhbGl0eSl9fSk7dmFyIFBlPWcoU2U9Pnt2YXIgQm49SXQoKTtmdW5jdGlvbiBNZShuLHQpe2xldCBlPW4uYS8yNTUscj10Kyc9Iicrbi5oZXgrJyInO3JldHVybiBlPDE/cisiICIrdCsnLW9wYWNpdHk9IicrZS50b0ZpeGVkKDIpLnNsaWNlKDEpKyciJzpyfWZ1bmN0aW9uIE10KG4sdCxlKXtsZXQgcj1uK3Q7cmV0dXJuIHR5cGVvZiBlPCJ1IiYmKHIrPSIgIitlKSxyfWZ1bmN0aW9uIEFuKG4sdCxlKXtsZXQgcj0iIixvPTAsaT0hMSxzPTA7Zm9yKGxldCB1PTA7dTxuLmxlbmd0aDt1Kyspe2xldCBjPU1hdGguZmxvb3IodSV0KSxsPU1hdGguZmxvb3IodS90KTshYyYmIWkmJihpPSEwKSxuW3VdPyhzKyssdT4wJiZjPjAmJm5bdS0xXXx8KHIrPWk/TXQoIk0iLGMrZSwuNStsK2UpOk10KCJtIixvLDApLG89MCxpPSExKSxjKzE8dCYmblt1KzFdfHwocis9TXQoImgiLHMpLHM9MCkpOm8rK31yZXR1cm4gcn1TZS5yZW5kZXI9ZnVuY3Rpb24odCxlLHIpe2xldCBvPUJuLmdldE9wdGlvbnMoZSksaT10Lm1vZHVsZXMuc2l6ZSxzPXQubW9kdWxlcy5kYXRhLHU9aStvLm1hcmdpbioyLGM9by5jb2xvci5saWdodC5hPyI8cGF0aCAiK01lKG8uY29sb3IubGlnaHQsImZpbGwiKSsnIGQ9Ik0wIDBoJyt1KyJ2Iit1KydIMHoiLz4nOiIiLGw9IjxwYXRoICIrTWUoby5jb2xvci5kYXJrLCJzdHJva2UiKSsnIGQ9IicrQW4ocyxpLG8ubWFyZ2luKSsnIi8+JyxhPSd2aWV3Qm94PSIwIDAgJyt1KyIgIit1KyciJyxoPSc8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgJysoby53aWR0aD8nd2lkdGg9Iicrby53aWR0aCsnIiBoZWlnaHQ9Iicrby53aWR0aCsnIiAnOiIiKSthKycgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4nK2MrbCtgPC9zdmc+CmA7cmV0dXJuIHR5cGVvZiByPT0iZnVuY3Rpb24iJiZyKG51bGwsaCksaH19KTt2YXIgTm49ZyhPPT57dmFyIFRuPV90KCksU3Q9VGUoKSxiZT1OZSgpLEluPVBlKCk7ZnVuY3Rpb24gUHQobix0LGUscixvKXtsZXQgaT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxzPWkubGVuZ3RoLHU9dHlwZW9mIGlbcy0xXT09ImZ1bmN0aW9uIjtpZighdSYmIVRuKCkpdGhyb3cgbmV3IEVycm9yKCJDYWxsYmFjayByZXF1aXJlZCBhcyBsYXN0IGFyZ3VtZW50Iik7aWYodSl7aWYoczwyKXRocm93IG5ldyBFcnJvcigiVG9vIGZldyBhcmd1bWVudHMgcHJvdmlkZWQiKTtzPT09Mj8obz1lLGU9dCx0PXI9dm9pZCAwKTpzPT09MyYmKHQuZ2V0Q29udGV4dCYmdHlwZW9mIG8+InUiPyhvPXIscj12b2lkIDApOihvPXIscj1lLGU9dCx0PXZvaWQgMCkpfWVsc2V7aWYoczwxKXRocm93IG5ldyBFcnJvcigiVG9vIGZldyBhcmd1bWVudHMgcHJvdmlkZWQiKTtyZXR1cm4gcz09PTE/KGU9dCx0PXI9dm9pZCAwKTpzPT09MiYmIXQuZ2V0Q29udGV4dCYmKHI9ZSxlPXQsdD12b2lkIDApLG5ldyBQcm9taXNlKGZ1bmN0aW9uKGMsbCl7dHJ5e2xldCBhPVN0LmNyZWF0ZShlLHIpO2MobihhLHQscikpfWNhdGNoKGEpe2woYSl9fSl9dHJ5e2xldCBjPVN0LmNyZWF0ZShlLHIpO28obnVsbCxuKGMsdCxyKSl9Y2F0Y2goYyl7byhjKX19Ty5jcmVhdGU9U3QuY3JlYXRlO08udG9DYW52YXM9UHQuYmluZChudWxsLGJlLnJlbmRlcik7Ty50b0RhdGFVUkw9UHQuYmluZChudWxsLGJlLnJlbmRlclRvRGF0YVVSTCk7Ty50b1N0cmluZz1QdC5iaW5kKG51bGwsZnVuY3Rpb24obix0LGUpe3JldHVybiBJbi5yZW5kZXIobixlKX0pfSk7cmV0dXJuIE5uKCk7fSkoKTsK");

// src/utils/standaloneHtmlGenerator.ts
function generateStandaloneSignatureAppHtml(state, initialHtml = "") {
  const p = state.personal;
  const d = state.design;
  const l = state.layout;
  const v = state.visibility;
  const logoBase64 = state.logos.primary?.url?.startsWith("data:") ? state.logos.primary.url : RAGT_LOGO_PNG_BASE64;
  const serializedState = JSON.stringify({
    preset: l.preset || "layout-a",
    renderMode: state.renderMode || "standard",
    dimensions: l.dimensions,
    separator: l.separator,
    colors: d.colors,
    typography: d.typography,
    labels: state.labels,
    visibility: v,
    personal: p,
    templatePersonal: p,
    logoSrc: logoBase64,
    secondaryLogoSrc: v.secondaryLogo && state.logos.secondary?.url ? state.logos.secondary.url : v.secondaryLogo ? ISO_9001_LOGO_SVG : "",
    socialItems: state.social.items.filter((s) => s.active && s.url).map((s) => ({
      id: s.id,
      name: s.name,
      url: s.url,
      color: s.color || "#0C3866"
    })),
    banner: {
      enabled: v.banner && state.banner.enabled,
      imageUrl: state.banner.imageUrl || "",
      linkUrl: state.banner.linkUrl || "",
      altText: state.banner.altText || state.banner.title || "",
      width: state.banner.width,
      height: state.banner.height,
      maintainRatio: state.banner.maintainRatio,
      position: state.banner.position,
      startDate: state.banner.startDate || "",
      endDate: state.banner.endDate || ""
    },
    slogan: state.slogan,
    qr: state.qr,
    initialHtml
  }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RAGT Semences \xB7 Signature Professionnelle Outlook</title>
  <style>
    :root {
      --ragt-navy: #0C3866;
      --ragt-gold: #F7BD00;
      --ragt-teal: #004B87;
      --ragt-green: #15803D;
      --ink: #1E293B;
      --muted: #64748B;
      --line: #E2E8F0;
      --line-focus: #94A3B8;
      --bg-app: #F4F8FC;
      --bg-card: #FFFFFF;
      --shadow: 0 10px 25px -5px rgba(12, 56, 102, 0.08), 0 8px 10px -6px rgba(12, 56, 102, 0.04);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(135deg, #F8FAFC 0%, #EDF4FA 100%);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      min-height: 100vh;
    }
    /* Top Brand Bar */
    .top {
      height: 84px;
      background: #FFFFFF;
      border-bottom: 2px solid #EDF2F7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 20px;
      font-weight: 800;
      color: var(--ragt-navy);
      letter-spacing: -0.02em;
    }
    .brand-logo {
      height: 56px;
      width: auto;
      max-width: 190px;
      object-fit: contain;
      display: block;
    }
    .brand small {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      margin-top: 1px;
    }
    .btn-reset {
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 8px 14px;
      background: #FFFFFF;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .btn-reset:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: var(--ink);
    }

    /* Main Container */
    .app {
      max-width: 1440px;
      margin: auto;
      padding: 24px 32px;
      display: grid;
      grid-template-columns: 360px minmax(0, 1fr);
      gap: 24px;
      align-items: start;
    }
    .panel, .preview-card {
      background: var(--bg-card);
      border: 1px solid var(--line);
      border-radius: 16px;
      box-shadow: var(--shadow);
    }
    .panel {
      padding: 20px;
      position: sticky;
      top: 20px;
      max-height: calc(100vh - 40px);
      overflow-y: auto;
    }
    .panel h2 {
      font-size: 16px;
      font-weight: 800;
      color: var(--ragt-navy);
      margin: 0 0 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hint {
      margin: 0 0 16px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
    }
    .section {
      border-top: 1px solid var(--line);
      padding-top: 14px;
      margin-top: 14px;
    }
    .section:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
    .section h3 {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      margin: 0 0 10px;
      text-transform: uppercase;
      color: var(--ragt-navy);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .field {
      display: block;
      margin-bottom: 10px;
    }
    .field:last-child {
      margin-bottom: 0;
    }
    .field span {
      display: block;
      font-weight: 700;
      font-size: 11px;
      color: #334155;
      margin-bottom: 4px;
    }
    .field input, .field select {
      width: 100%;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 8px 10px;
      background: #F8FAFC;
      color: #0F172A;
      font-family: inherit;
      font-size: 13px;
      transition: all 0.15s ease;
    }
    .field input:focus, .field select:focus {
      outline: none;
      border-color: var(--ragt-navy);
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(12, 56, 102, 0.12);
    }
    .field input.uppercase {
      text-transform: uppercase;
      font-weight: 700;
    }

    /* Right Preview Section */
    .preview-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .preview-head h1 {
      font-size: 22px;
      font-weight: 800;
      color: var(--ragt-navy);
      margin: 0;
      letter-spacing: -0.01em;
    }
    .preview-head p {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .action-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button.primary {
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      background: var(--ragt-navy);
      color: #FFFFFF;
      border: 2px solid var(--ragt-gold);
      border-radius: 10px;
      padding: 10px 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(12, 56, 102, 0.25);
      transition: all 0.15s ease;
    }
    button.primary:hover {
      background: #08294D;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(12, 56, 102, 0.35);
    }
    button.primary:active {
      transform: translateY(0);
    }
    button.secondary {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      background: #FFFFFF;
      color: var(--ragt-navy);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    button.secondary:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }

    /* Outlook Simulation Container */
    .preview-card {
      padding: 24px;
      background: #F0F5FA;
      border: 1px solid #D6E3F0;
    }
    .mail {
      background: #FFFFFF;
      border: 1px solid #D0DCE8;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(12, 56, 102, 0.08);
      max-width: 900px;
      margin: auto;
    }
    .mail-head {
      padding: 12px 20px;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      color: var(--muted);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .mail-head strong {
      color: #334155;
    }
    .mail-body {
      padding: 28px 32px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #273540;
      line-height: 1.6;
    }
    .mail-body p {
      margin: 0 0 12px;
    }
    .signature {
      border-top: 1px dashed #CBD5E1;
      margin-top: 20px;
      padding-top: 20px;
      min-height: 160px;
      overflow-x: auto;
    }

    /* Status Bar */
    .status {
      margin-top: 16px;
      padding: 10px 14px;
      border-radius: 10px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #065F46;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .status.bad {
      background: #FEF2F2;
      border-color: #FECACA;
      color: #991B1B;
    }

    /* Help Box */
    .help {
      margin-top: 16px;
      padding: 14px 16px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      color: #475569;
      font-size: 12px;
      line-height: 1.6;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    }
    .help strong {
      color: var(--ragt-navy);
    }

    /* Accordion Guide */
    .guide-box {
      margin-top: 16px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
    }
    .guide-header {
      padding: 12px 16px;
      background: #F8FAFC;
      font-weight: 700;
      font-size: 12px;
      color: var(--ragt-navy);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .guide-content {
      padding: 14px 18px;
      font-size: 12px;
      color: #475569;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .guide-step {
      background: #F8FAFC;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
    }
    .guide-step h4 {
      margin: 0 0 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--ragt-navy);
    }
    .guide-step ol {
      margin: 0;
      padding-left: 18px;
      line-height: 1.5;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      right: 28px;
      bottom: 28px;
      background: var(--ragt-navy);
      color: #FFFFFF;
      border: 2px solid var(--ragt-gold);
      border-radius: 12px;
      padding: 14px 20px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(12, 56, 102, 0.4);
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    #copyStage {
      position: fixed;
      left: -99999px;
      top: 0;
      background: #FFFFFF;
    }

    @media (max-width: 960px) {
      .app {
        grid-template-columns: 1fr;
        padding: 16px;
      }
      .panel {
        position: static;
        max-height: none;
      }
      .top {
        padding: 0 16px;
      }
      .preview-head {
        flex-direction: column;
        align-items: stretch;
      }
      .guide-content {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

<header class="top">
  <div class="brand">
    <img class="brand-logo" src="${logoBase64}" alt="${state.logos.primary?.alt || "Logo RAGT"}" />
    <div style="border-left: 2px solid #E2E8F0; padding-left: 16px; margin-left: 4px;">
      <span style="font-size: 20px; font-weight: 800; color: var(--ragt-navy); display: block; line-height: 1.2;">RAGT Semences</span>
      <small style="display: block; font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: 0.02em; text-transform: uppercase; margin-top: 2px;">Portail Collaborateur \xB7 Signature Outlook Officielle</small>
    </div>
  </div>
  <button id="btnReset" class="btn-reset" title="R\xE9initialiser avec les valeurs officielles">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    R\xE9initialiser la fiche
  </button>
</header>

<div class="app">
  <!-- Left Column: Form -->
  <aside class="panel">
    <h2>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Vos informations
    </h2>
    <p class="hint">Renseignez vos coordonn\xE9es directes ci-dessous. La carte \xE0 droite est celle qui sera copi\xE9e dans Outlook.</p>

    <!-- Section: Identit\xE9 -->
    <div class="section">
      <h3>Identit\xE9</h3>
      <div class="field">
        <span>Civilit\xE9</span>
        <select data-k="civility">
          <option value="">(Non sp\xE9cifi\xE9e)</option>
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
          <option value="Dr">Dr</option>
          <option value="Ing.">Ing.</option>
        </select>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Pr\xE9nom *</span>
          <input type="text" data-k="firstName" placeholder="Pr\xE9nom" autocomplete="given-name">
        </div>
        <div class="field">
          <span>Nom *</span>
          <input type="text" data-k="lastName" class="uppercase" placeholder="NOM" autocomplete="family-name">
        </div>
      </div>
      <div class="field">
        <span>Poste / Fonction *</span>
        <input type="text" data-k="jobTitle" placeholder="Ex: Responsable d'activit\xE9">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Service / D\xE9partement</span>
          <input type="text" data-k="department" placeholder="Ex: R&amp;D Semences">
        </div>
        <div class="field">
          <span>Soci\xE9t\xE9</span>
          <input type="text" data-k="company" placeholder="Ex: RAGT Semences">
        </div>
      </div>
    </div>

    <!-- Section: Coordonn\xE9es -->
    <div class="section">
      <h3>Coordonn\xE9es professionnelles</h3>
      <div class="field">
        <span>E-mail professionnel *</span>
        <input type="email" data-k="email" placeholder="prenom.nom@ragt.fr" autocomplete="email">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Ligne directe / Fixe</span>
          <input type="tel" data-k="phone" placeholder="05 65 00 00 00" autocomplete="tel">
        </div>
        <div class="field">
          <span>T\xE9l\xE9phone mobile</span>
          <input type="tel" data-k="mobile" placeholder="06 00 00 00 00" autocomplete="tel">
        </div>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Standard</span>
          <input type="tel" data-k="standardPhone" placeholder="05 65 00 00 00">
        </div>
        <div class="field">
          <span>Fax</span>
          <input type="tel" data-k="fax" placeholder="">
        </div>
      </div>
    </div>

    <!-- Section: Adresse -->
    <div class="section">
      <h3>Adresse &amp; Site Web</h3>
      <div class="field">
        <span>Adresse (Ligne 1)</span>
        <input type="text" data-k="addressLine1" placeholder="Rue Emile Singla">
      </div>
      <div class="field">
        <span>Compl\xE9ment (Ligne 2)</span>
        <input type="text" data-k="addressLine2" placeholder="Site de Bourran">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Code postal</span>
          <input type="text" data-k="postalCode" placeholder="12000">
        </div>
        <div class="field">
          <span>Ville</span>
          <input type="text" data-k="city" placeholder="Rodez">
        </div>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Pays</span>
          <input type="text" data-k="country" placeholder="France">
        </div>
        <div class="field">
          <span>Site Web</span>
          <input type="url" data-k="website" placeholder="https://www.ragt.fr">
        </div>
      </div>
    </div>
  </aside>

  <!-- Right Column: Outlook Simulation & Copy -->
  <main>
    <div class="preview-head">
      <div>
        <h1>Aper\xE7u de votre signature</h1>
        <p>V\xE9rification automatique de la structure HTML et des coordonn\xE9es. V\xE9rifiez le collage dans votre version d\u2019Outlook.</p>
      </div>
      <div class="action-buttons">
        <button class="primary" id="btnCopy" title="Copier le format riche dans le presse-papier">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copier pour Outlook
        </button>
        <button class="secondary" id="btnDownloadRaw" title="T\xE9l\xE9charger le fichier HTML brut">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          T\xE9l\xE9charger HTML brut
        </button>
      </div>
    </div>

    <!-- Outlook Compose Simulation Card -->
    <section class="preview-card">
      <div class="mail">
        <div class="mail-head" id="mailHead">
          \u2709\uFE0F <strong>De :</strong> <span id="mailSender">...</span> \xB7 <strong>\xC0 :</strong> contact@partenaire.com \xB7 <strong>Objet :</strong> RAGT Semences \u2014 Correspondance professionnelle
        </div>
        <div class="mail-body">
          <p>Bonjour,</p>
          <p>Veuillez trouver ci-dessous ma signature professionnelle mise \xE0 jour.</p>
          <p style="margin-bottom: 16px;">Bien cordialement,</p>
          <div class="signature" id="preview">
            <!-- Signature table will be inserted here dynamically -->
          </div>
        </div>
      </div>
    </section>

    <!-- Status Notification -->
    <div class="status" id="status">
      \u2713 Informations renseign\xE9es \xB7 pr\xEAte \xE0 \xEAtre copi\xE9e
    </div>

    <!-- Help Box -->
    <div class="help">
      \u{1F4A1} <strong>Installation express dans Outlook :</strong> Cliquez sur le bouton <strong>\xAB Copier pour Outlook \xBB</strong>, puis dans votre logiciel Outlook (ou Webmail Microsoft 365), ouvrez les param\xE8tres de signature et collez directement avec le raccourci <strong>Ctrl + V</strong> (ou <strong>Cmd + V</strong> sur Mac).
    </div>

    <!-- Accordion Guide -->
    <div class="guide-box">
      <div class="guide-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Guide d'installation pas-\xE0-pas Microsoft Outlook
      </div>
      <div class="guide-content">
        <div class="guide-step">
          <h4>\u{1FA9F} Outlook Windows Classique (365 / 2016-2024)</h4>
          <ol>
            <li>Cliquez sur <strong>\xAB Copier pour Outlook \xBB</strong> ci-dessus.</li>
            <li>Dans Outlook, allez dans <strong>Fichier &gt; Options &gt; Courrier &gt; Signatures...</strong></li>
            <li>Cr\xE9ez une signature (ex: <em>RAGT 2026</em>), cliquez dans la zone blanche et faites <strong>Ctrl + V</strong>.</li>
            <li>D\xE9finissez-la comme signature par d\xE9faut et cliquez sur <strong>OK</strong>.</li>
          </ol>
        </div>
        <div class="guide-step">
          <h4>\u{1F310} New Outlook &amp; Webmail (Office 365 / OWA)</h4>
          <ol>
            <li>Cliquez sur l'engrenage <strong>Param\xE8tres \u2699\uFE0F</strong> en haut \xE0 droite.</li>
            <li>Allez dans <strong>Courrier &gt; Composer et r\xE9pondre &gt; Signatures \xE9lectroniques</strong>.</li>
            <li>Collez votre signature avec <strong>Ctrl + V</strong> et cochez les options par d\xE9faut.</li>
            <li>Cliquez sur <strong>Enregistrer</strong>.</li>
          </ol>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- Hidden Stage for Clipboard execCommand Fallback -->
<div id="copyStage"></div>

<!-- Toast Floating Alert -->
<div class="toast" id="toast">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7BD00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  <span id="toastMsg">Signature copi\xE9e ! Ouvrez Outlook et collez avec Ctrl+V.</span>
</div>

<script>${portalQrRuntime_default}</script>
<script>
// Official corporate configuration generated by Signature Studio RAGT
const doc = ${serializedState};
const defaultIdentity = JSON.parse(JSON.stringify(doc.personal));
const STORAGE_KEY = 'ragt_signature_user_data';

// Helper: Escape HTML
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper: Sanitize Tel for tel: links
function tel(str) {
  return String(str || '').replace(/[^\\d+]/g, '');
}

// Helper: Sanitize URL
function normUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (/^https?:\\/\\//i.test(trimmed) || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) return trimmed;
  return 'https://' + trimmed;
}

// Save to LocalStorage
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc.personal));
  } catch(e) {}
}

// Load from LocalStorage
function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      const email = String(data.email || '').toLowerCase();
      if (email && !email.includes('prenom.nom') && email.includes('@ragt')) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        Object.assign(doc.personal, data);
      }
    }
  } catch(e) {}
}

// The collaborator portal only presents fields that are rendered by the
// configured signature. This avoids asking somebody to edit a value that the
// Studio deliberately hides (for example fax or department). Address fields
// share the single address visibility setting of SignatureState.
function synchronizeEditableFields() {
  const visibilityKeyFor = {
    addressLine1: 'address',
    addressLine2: 'address',
    postalCode: 'address',
    city: 'address',
    country: 'address'
  };
  document.querySelectorAll('[data-k]').forEach(el => {
    const key = el.dataset.k;
    const visibilityKey = visibilityKeyFor[key] || key;
    const isVisible = !doc.visibility || doc.visibility[visibilityKey] !== false;
    const field = el.closest('.field');
    if (field) field.hidden = !isVisible;
  });
}

// Validate required fields
function validate() {
  const p = doc.personal;
  const missing = [];
  if (!String(p.firstName || '').trim()) missing.push('Pr\xE9nom');
  if (!String(p.lastName || '').trim()) missing.push('Nom');
  if (!String(p.email || '').trim()) missing.push('E-mail');
  return missing;
}

function replaceAll(value, search, replacement) {
  return search ? value.split(search).join(replacement) : value;
}

// The portal starts from the exact Studio HTML. Contact edits preserve its
// layout, assets and visibility rules instead of rebuilding a simplified one.
function renderStudioTemplate() {
  let html = doc.initialHtml;
  const original = doc.templatePersonal || {};
  Object.keys(doc.personal).forEach((key) => {
    const before = String(original[key] || '');
    const after = String(doc.personal[key] || '');
    if (before === after) return;
    html = replaceAll(html, esc(before), esc(after));
    html = replaceAll(html, esc(before.toUpperCase()), esc(after.toUpperCase()));
    html = replaceAll(html, tel(before), tel(after));
    html = replaceAll(html, encodeURIComponent(before), encodeURIComponent(after));
  });
  return html;
}

function getPortalQrContent() {
  const p = doc.personal;
  const qr = doc.qr || {};
  if (qr.type === 'url') return p.website || 'https://www.ragt.fr';
  if (qr.type === 'email') return p.email ? 'mailto:' + p.email : 'mailto:contact@ragt.fr';
  if (qr.type === 'phone') return 'tel:' + tel(p.mobile || p.phone || '+33565734100');
  if (qr.type === 'custom') return qr.customText || 'https://www.ragt.fr/contact';
  return [
    'BEGIN:VCARD', 'VERSION:3.0',
    'N:' + (p.lastName || '') + ';' + (p.firstName || '') + ';;;',
    'FN:' + [p.firstName, p.lastName].filter(Boolean).join(' '),
    p.company ? 'ORG:' + p.company : '', p.jobTitle ? 'TITLE:' + p.jobTitle : '',
    p.phone ? 'TEL;TYPE=WORK,VOICE:' + p.phone : '', p.mobile ? 'TEL;TYPE=CELL,VOICE:' + p.mobile : '',
    p.email ? 'EMAIL;TYPE=PREF,INTERNET:' + p.email : '', p.website ? 'URL:' + p.website : '',
    (p.addressLine1 || p.city)
      ? 'ADR;TYPE=WORK:;;' + (p.addressLine1 || '') + (p.addressLine2 ? ' ' + p.addressLine2 : '') + ';' + (p.city || '') + ';;' + (p.postalCode || '') + ';' + (p.country || 'France')
      : '',
    'END:VCARD'
  ].filter(Boolean).join('\\n');
}

async function refreshStudioQr(html) {
  if (!doc.visibility || !doc.visibility.qr || !window.RagtPortalQr) return html;
  const container = document.createElement('div');
  container.innerHTML = html;
  const image = container.querySelector('img[alt="QR Code vCard"]');
  if (!image) return html;
  const qr = doc.qr || {};
  image.src = await window.RagtPortalQr.toDataURL(getPortalQrContent(), {
    width: Math.max(60, qr.size || 80), margin: qr.margin == null ? 1 : qr.margin,
    color: { dark: qr.fgColor || '#0C3866', light: qr.bgColor || '#FFFFFF' },
    errorCorrectionLevel: qr.errorCorrectionLevel || 'M'
  });
  return container.innerHTML;
}

// Client-side Word-Safe Signature Table Generator
function renderSignature() {
  if (doc.initialHtml) return renderStudioTemplate();
  const p = doc.personal;
  const c = doc.colors;
  const t = doc.typography;
  const v = doc.visibility;
  const dim = doc.dimensions || { totalWidth: 540, logoColumnWidth: 145, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, innerSpacing: 16 };
  const sep = doc.separator || { type: 'vertical', color: '#F7BD00', thickness: 2, margin: 12 };

  // Identity HTML
  let identityRows = '';
  const nameParts = [];
  if (v.civility && p.civility) nameParts.push(esc(p.civility));
  if (v.firstName && p.firstName) nameParts.push(esc(p.firstName));
  if (v.lastName && p.lastName) {
    nameParts.push('<span style="color:' + (c.lastName || c.primary || '#0C3866') + '; font-weight:bold;">' + esc(p.lastName.toUpperCase()) + '</span>');
  }
  if (nameParts.length) {
    identityRows += '<tr><td style="font-family:' + (t.name?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.name?.fontSize || 16) + 'px; font-weight:' + (t.name?.fontWeight || 'bold') + '; color:' + (c.firstName || c.primary || '#0C3866') + '; line-height:1.2; padding-bottom:3px;">' + nameParts.join(' ') + '</td></tr>';
  }

  const jobParts = [];
  if (v.jobTitle && p.jobTitle) jobParts.push(esc(p.jobTitle));
  if (v.department && p.department) jobParts.push(esc(p.department));
  if (jobParts.length) {
    identityRows += '<tr><td style="font-family:' + (t.jobTitle?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.jobTitle?.fontSize || 12) + 'px; color:' + (c.jobTitle || '#666666') + '; line-height:1.3; padding-bottom:3px;">' + jobParts.join(' &bull; ') + '</td></tr>';
  }

  if (v.company && p.company) {
    identityRows += '<tr><td style="font-family:' + (t.company?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.company?.fontSize || 12) + 'px; font-weight:bold; color:' + (c.company || c.primary || '#0C3866') + '; line-height:1.3; padding-bottom:5px;">' + esc(p.company) + '</td></tr>';
  }

  const identityHtml = identityRows ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">' + identityRows + '</table>' : '';

  // Coordinates HTML
  let coordRows = '';
  const addRow = (type, label, valueHtml) => {
    // Contact icon inline bullet disc
    const iconDisc = '<td style="vertical-align:middle; width:20px; padding-right:6px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr><td style="width:16px; height:16px; background-color:' + (c.primary || '#0C3866') + '; border-radius:3px; text-align:center; vertical-align:middle; font-size:10px; color:#FFFFFF; line-height:16px; font-weight:bold;">' + (type === 'phone' ? '\u260E' : type === 'mobile' ? '\u{1F4F1}' : type === 'email' ? '\u2709' : type === 'web' ? '\u{1F310}' : '\u{1F4CD}') + '</td></tr></table></td>';

    coordRows += '<tr><td style="vertical-align:middle; padding:1px 0;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr>' + iconDisc + '<td style="font-family:Arial, sans-serif; font-size:11px; line-height:16px; color:' + (c.text || '#333333') + '; vertical-align:middle;">' + (label ? '<strong style="color:' + (c.muted || '#666666') + '; font-weight:600;">' + esc(label) + ':</strong> ' : '') + valueHtml + '</td></tr></table></td></tr>';
  };

  const makeLink = (href, text, color, bold) => {
    return '<a href="' + esc(href) + '" style="color:' + color + '; text-decoration:none !important; text-underline-style:none; mso-text-underline:none;' + (bold ? ' font-weight:600;' : '') + '"><span style="color:' + color + '; text-decoration:none !important;">' + esc(text) + '</span></a>';
  };

  if (v.phone && p.phone) addRow('phone', doc.labels.phone || 'T\xE9l.', makeLink('tel:' + tel(p.phone), p.phone, c.phone || c.text || '#333333', false));
  if (v.standardPhone && p.standardPhone) addRow('phone', doc.labels.standardPhone || 'Standard', makeLink('tel:' + tel(p.standardPhone), p.standardPhone, c.phone || c.text || '#333333', false));
  if (v.mobile && p.mobile) addRow('mobile', doc.labels.mobile || 'Mob.', makeLink('tel:' + tel(p.mobile), p.mobile, c.mobile || c.text || '#333333', false));
  if (v.email && p.email) addRow('email', doc.labels.email || 'E-mail', makeLink('mailto:' + p.email, p.email, c.email || c.primary || '#0C3866', true));
  if (v.website && p.website) {
    const dispWeb = p.website.replace(/^https?:\\/\\//i, '');
    addRow('web', doc.labels.website || 'Web', makeLink(normUrl(p.website), dispWeb, c.website || c.primary || '#0C3866', true));
  }
  if (v.address && (p.addressLine1 || p.city)) {
    const fullAddr = [p.addressLine1, p.addressLine2, [p.postalCode, p.city].filter(Boolean).join(' ')].filter(Boolean).join(' - ');
    const maps = 'https://maps.google.com/?q=' + encodeURIComponent(fullAddr + (p.country ? ', ' + p.country : ''));
    addRow('address', doc.labels.address || 'Adr.', makeLink(maps, fullAddr, c.address || c.text || '#333333', false));
  }

  const coordsHtml = coordRows ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:4px;">' + coordRows + '</table>' : '';

  // Social icons HTML
  let socialsHtml = '';
  if (v.socials && doc.socialItems && doc.socialItems.length) {
    const socLinks = doc.socialItems.map(s => {
      return '<td style="padding-right:6px; vertical-align:middle;"><a href="' + esc(normUrl(s.url)) + '" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr><td style="width:22px; height:22px; background-color:' + (s.color || '#0C3866') + '; border-radius:50%; text-align:center; vertical-align:middle; color:#FFFFFF; font-size:11px; font-weight:bold; line-height:22px;">' + esc(s.name ? s.name.charAt(0).toUpperCase() : 'S') + '</td></tr></table></a></td>';
    }).join('');
    socialsHtml = '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; padding-top:8px;"><tr>' + socLinks + '</tr></table>';
  }

  // Logos HTML
  const logoWidth = dim.logoColumnWidth || 140;
  const logoHtml = doc.logoSrc ? '<img src="' + esc(doc.logoSrc) + '" width="' + logoWidth + '" alt="RAGT Semences" border="0" style="display:block; width:' + logoWidth + 'px; max-width:' + logoWidth + 'px; height:auto; border:0; margin:0 auto;" />' : '';
  const secondaryLogoHtml = doc.secondaryLogoSrc ? '<div style="padding-top:8px; text-align:center;"><img src="' + esc(doc.secondaryLogoSrc) + '" width="95" alt="Certification" border="0" style="display:block; width:95px; height:auto; border:0; margin:0 auto;" /></div>' : '';

  const slogan = doc.slogan || {};
  const sloganHtml = v.slogan && slogan.enabled && slogan.text
    ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; width:100%; margin-top:' + (slogan.marginTop || 0) + 'px; margin-bottom:' + (slogan.marginBottom || 0) + 'px;"><tr><td style="font-family:' + (slogan.fontFamily || t.baseFont || 'Arial, sans-serif') + '; font-size:' + (slogan.fontSize || 11) + 'px; font-weight:' + (slogan.fontWeight || 'bold') + '; font-style:' + (slogan.fontStyle || 'italic') + '; color:' + (slogan.color || c.slogan || c.primary || '#0C3866') + '; text-align:' + (slogan.align || 'left') + '; line-height:1.3; padding-top:4px;">&laquo; ' + esc(slogan.text) + ' &raquo;</td></tr></table>'
    : '';

  const banner = doc.banner || {};
  const dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  const bannerStart = banner.startDate ? new Date(banner.startDate + 'T00:00:00') : null;
  const bannerEnd = banner.endDate ? new Date(banner.endDate + 'T23:59:59.999') : null;
  const campaignActive = banner.enabled && banner.imageUrl && (!bannerStart || dateNow >= bannerStart) && (!bannerEnd || dateNow <= bannerEnd);
  const bannerWidth = Math.max(40, Number(banner.width) || 400);
  const requestedBannerHeight = Math.max(20, Number(banner.height) || 120);
  const fixedBannerHeight = Math.min(90, requestedBannerHeight);
  const bannerHeight = banner.maintainRatio === false ? fixedBannerHeight : requestedBannerHeight;
  const bannerHeightStyle = banner.maintainRatio === false ? 'height:' + bannerHeight + 'px; object-fit:cover;' : 'height:auto;';
  const bannerImg = campaignActive ? '<img src="' + esc(banner.imageUrl) + '" width="' + bannerWidth + '" height="' + bannerHeight + '" alt="' + esc(banner.altText || 'Banni\xE8re RAGT') + '" border="0" style="display:block; width:' + bannerWidth + 'px; max-width:100%; ' + bannerHeightStyle + ' border-radius:4px;" />' : '';
  const bannerHtml = bannerImg ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="' + bannerWidth + '" style="border-collapse:collapse; width:' + bannerWidth + 'px; max-width:100%; margin-top:12px; margin-bottom:4px;"><tr><td style="vertical-align:top; text-align:center;">' + (banner.linkUrl ? '<a href="' + esc(normUrl(banner.linkUrl)) + '" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">' + bannerImg + '</a>' : bannerImg) + '</td></tr></table>' : '';
  const infoHtml = identityHtml + coordsHtml + socialsHtml + sloganHtml;

  // Separator line
  const sepColor = sep.color || '#F7BD00';
  const sepThick = sep.thickness || 2;
  const sepMargin = sep.margin || 12;

  let innerStructure = '';
  const mode = doc.preset || 'layout-a';

  if (mode === 'layout-c') {
    // Logo Top, Info Bottom
    innerStructure = '<tr><td style="text-align:left; padding-bottom:' + sepMargin + 'px;">' + logoHtml + secondaryLogoHtml + '</td></tr><tr><td style="height:' + sepThick + 'px; background-color:' + sepColor + '; line-height:' + sepThick + 'px; font-size:1px; margin-bottom:' + sepMargin + 'px;">&nbsp;</td></tr><tr><td style="padding-top:' + sepMargin + 'px;">' + infoHtml + '</td></tr>';
  } else if (mode === 'layout-b') {
    // Info Left, Logo Right
    innerStructure = '<tr><td style="vertical-align:middle; padding-right:' + sepMargin + 'px;">' + infoHtml + '</td><td style="width:' + sepThick + 'px; background-color:' + sepColor + '; vertical-align:top; font-size:1px; line-height:1px;" width="' + sepThick + '">&nbsp;</td><td style="width:' + logoWidth + 'px; vertical-align:middle; padding-left:' + sepMargin + 'px;" width="' + logoWidth + '">' + logoHtml + secondaryLogoHtml + '</td></tr>';
  } else {
    // Default: Layout A (Logo Left, Separator, Info Right)
    innerStructure = '<tr><td style="width:' + logoWidth + 'px; vertical-align:middle; padding-right:' + sepMargin + 'px;" width="' + logoWidth + '">' + logoHtml + secondaryLogoHtml + '</td><td style="width:' + sepThick + 'px; background-color:' + sepColor + '; vertical-align:top; font-size:1px; line-height:1px;" width="' + sepThick + '">&nbsp;</td><td style="vertical-align:middle; padding-left:' + sepMargin + 'px;">' + (banner.position === 'center' ? bannerHtml : '') + infoHtml + '</td></tr>';
  }

  const topBannerHtml = banner.position === 'top' ? bannerHtml : '';
  const bottomBannerHtml = banner.position === 'bottom' ? bannerHtml : '';
  if (doc.renderMode === 'flattened-card') return topBannerHtml;
  return topBannerHtml + '<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="' + dim.totalWidth + '" bgcolor="#FFFFFF" style="width:' + dim.totalWidth + 'px; max-width:' + dim.totalWidth + 'px; background-color:#FFFFFF; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tbody><tr><td bgcolor="#FFFFFF" style="padding:' + (dim.paddingTop || 12) + 'px ' + (dim.paddingRight || 16) + 'px ' + (dim.paddingBottom || 12) + 'px ' + (dim.paddingLeft || 16) + 'px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tbody>' + innerStructure + '</tbody></table></td></tr></tbody></table>' + bottomBannerHtml;
}

// Refresh UI and Live Preview
let refreshSequence = 0;
async function refresh() {
  const sequence = ++refreshSequence;
  document.querySelectorAll('[data-k]').forEach(el => {
    if (document.activeElement !== el) {
      el.value = doc.personal[el.dataset.k] || '';
    }
  });

  let sigHtml = doc.initialHtml && !doc.hasEdited ? doc.initialHtml : renderSignature();
  doc.qrUpdated = false;
  if (doc.hasEdited && doc.visibility && doc.visibility.qr) {
    try {
      sigHtml = await refreshStudioQr(sigHtml);
      doc.qrUpdated = true;
    } catch (error) {
      console.warn('Impossible de r\xE9g\xE9n\xE9rer le QR Code localement', error);
    }
  }
  if (sequence !== refreshSequence) return;
  document.querySelector('#preview').innerHTML = sigHtml;

  const senderEmail = doc.personal.email || 'prenom.nom@ragt.fr';
  document.querySelector('#mailSender').textContent = senderEmail;

  const missing = validate();
  const statusEl = document.querySelector('#status');
  if (missing.length) {
    statusEl.className = 'status bad';
    statusEl.textContent = '\u26A0\uFE0F \xC0 compl\xE9ter pour Outlook : ' + missing.join(', ');
  } else if (doc.hasEdited && doc.visibility && doc.visibility.qr && !doc.qrUpdated) {
    statusEl.className = 'status bad';
    statusEl.textContent = '\u26A0\uFE0F Le QR Code est en cours de r\xE9g\xE9n\xE9ration locale.';
  } else {
    statusEl.className = 'status';
    statusEl.textContent = doc.hasEdited && doc.visibility && doc.visibility.qr
      ? '\u2713 Informations renseign\xE9es \xB7 QR Code r\xE9g\xE9n\xE9r\xE9 localement'
      : '\u2713 Informations renseign\xE9es \xB7 pr\xEAte \xE0 \xEAtre copi\xE9e';
  }

  save();
}

// Show Floating Toast
function toast(msg) {
  const t = document.querySelector('#toast');
  document.querySelector('#toastMsg').textContent = msg;
  t.className = 'toast show';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    t.className = 'toast';
  }, 3000);
}

// 1-Click Copy for Outlook
async function copyForOutlook() {
  const missing = validate();
  if (missing.length) {
    toast('Veuillez compl\xE9ter : ' + missing.join(', '));
    return;
  }
  if (doc.hasEdited && doc.visibility && doc.visibility.qr && !doc.qrUpdated) {
    toast('Le QR Code est en cours de r\xE9g\xE9n\xE9ration. R\xE9essayez dans un instant.');
    return;
  }

  const html = document.querySelector('#preview').innerHTML;
  const plainText = document.querySelector('#preview').innerText || 'RAGT Semences';

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        })
      ]);
      toast('\u2713 Signature copi\xE9e ! Ouvrez Outlook et collez avec Ctrl+V.');
      return;
    }
  } catch (err) {
    console.warn('ClipboardItem fallback:', err);
  }

  // Fallback: execCommand with #copyStage
  const stage = document.querySelector('#copyStage');
  stage.innerHTML = html;
  const range = document.createRange();
  range.selectNodeContents(stage);
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
    const copied = document.execCommand('copy');
    sel.removeAllRanges();
    if (!copied) {
      toast('La copie a \xE9t\xE9 refus\xE9e par ce navigateur. Utilisez le t\xE9l\xE9chargement HTML.');
      return;
    }
  } else {
    toast('La s\xE9lection de la signature a \xE9chou\xE9. Utilisez le t\xE9l\xE9chargement HTML.');
    return;
  }
  toast('\u2713 Signature copi\xE9e ! Ouvrez Outlook et collez avec Ctrl+V.');
}

// Download Raw HTML File
function downloadRaw() {
  const html = renderSignature();
  const fullDoc = '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Signature RAGT</title></head><body style="margin:0; padding:20px; font-family:Arial, sans-serif;">' + html + '</body></html>';
  const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (doc.personal.lastName || 'ragt').toLowerCase().replace(/\\s+/g, '-');
  a.href = url;
  a.download = 'signature-ragt-' + safeName + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Fichier HTML t\xE9l\xE9charg\xE9 !');
}

// Reset Form to Corporate Default
function reset() {
  if (!confirm('R\xE9initialiser toutes les informations de cette fiche avec les valeurs officielles RAGT ?')) return;
  doc.personal = JSON.parse(JSON.stringify(defaultIdentity));
  save();
  refresh();
  toast('Fiche r\xE9initialis\xE9e aux valeurs officielles.');
}

// Initialize Application
load();
synchronizeEditableFields();
refresh();

// Event Listeners
document.querySelectorAll('[data-k]').forEach(el => {
  el.addEventListener('input', () => {
    doc.personal[el.dataset.k] = el.value;
    doc.hasEdited = true;
    refresh();
  });
  el.addEventListener('change', () => {
    doc.personal[el.dataset.k] = el.value;
    doc.hasEdited = true;
    refresh();
  });
});

document.querySelector('#btnCopy').addEventListener('click', copyForOutlook);
document.querySelector('#btnDownloadRaw').addEventListener('click', downloadRaw);
document.querySelector('#btnReset').addEventListener('click', reset);
</script>

</body>
</html>`;
}

// src/utils/campaignStatus.ts
function getCampaignStatus(banner, now = /* @__PURE__ */ new Date()) {
  if (!banner.enabled || !banner.imageUrl) return "inactive";
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = banner.startDate ? (/* @__PURE__ */ new Date(`${banner.startDate}T00:00:00`)).getTime() : void 0;
  const end = banner.endDate ? (/* @__PURE__ */ new Date(`${banner.endDate}T23:59:59.999`)).getTime() : void 0;
  if (Number.isNaN(start) || Number.isNaN(end)) return "inactive";
  if (start !== void 0 && today < start) return "scheduled";
  if (end !== void 0 && today > end) return "expired";
  return "active";
}
function isCampaignActive(banner, now = /* @__PURE__ */ new Date()) {
  return getCampaignStatus(banner, now) === "active";
}

// src/utils/htmlGenerator.ts
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function sanitizeTel(phone) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}
function sanitizeUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("javascript:")) return "#";
  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith("mailto:") && !trimmed.startsWith("tel:")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
function appendUtmParams(url, utm) {
  if (!url || !utm || !utm.enabled || url.startsWith("mailto:") || url.startsWith("tel:")) return url;
  try {
    const urlObj = new URL(url);
    if (utm.source) urlObj.searchParams.set("utm_source", utm.source);
    if (utm.medium) urlObj.searchParams.set("utm_medium", utm.medium);
    if (utm.campaign) urlObj.searchParams.set("utm_campaign", utm.campaign);
    return urlObj.toString();
  } catch (e) {
    return url;
  }
}
function getSocialIconDataUrl(networkId, color, style = "circle", bgColor = "#FDC420") {
  const svg = SOCIAL_ICONS_SVG[networkId] || SOCIAL_ICONS_SVG.custom;
  const isWhite = color.toLowerCase() === "#ffffff" || color.toLowerCase() === "%23ffffff" || color.toLowerCase() === "white";
  const contrastDark = bgColor && bgColor.toLowerCase() !== "#ffffff" && bgColor.toLowerCase() !== "white" ? bgColor : "#0C3866";
  let wrapper = "";
  if (style === "square" || style === "rounded") {
    const rx = style === "rounded" ? 6 : 4;
    const badgeBg = isWhite ? "#ffffff" : color;
    const glyphColor = isWhite ? contrastDark : "#ffffff";
    const coloredSvg = svg.replace(/fill="(currentColor|#000|#000000|black)"/gi, `fill="${glyphColor}"`).replace(/stroke="(currentColor|#000|#000000|black)"/gi, `stroke="${glyphColor}"`);
    const pathContent = coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, "");
    wrapper = `<rect x="1" y="1" width="22" height="22" rx="${rx}" fill="${badgeBg}"/><g fill="${glyphColor}" transform="translate(4,4) scale(0.66)">${pathContent}</g>`;
  } else if (style === "outline") {
    const coloredSvg = svg.replace(/fill="(currentColor|#000|#000000|black)"/gi, `fill="${color}"`).replace(/stroke="(currentColor|#000|#000000|black)"/gi, `stroke="${color}"`);
    const pathContent = coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, "");
    wrapper = `<circle cx="12" cy="12" r="10.5" fill="none" stroke="${color}" stroke-width="1.8"/><g fill="${color}" transform="translate(4.5,4.5) scale(0.625)">${pathContent}</g>`;
  } else if (style === "minimal" || style === "mono" || style === "filled") {
    const coloredSvg = svg.replace(/fill="(currentColor|#000|#000000|black)"/gi, `fill="${color}"`).replace(/stroke="(currentColor|#000|#000000|black)"/gi, `stroke="${color}"`);
    const pathContent = coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, "");
    wrapper = `<g fill="${color}" transform="translate(2,2) scale(0.83)">${pathContent}</g>`;
  } else {
    const badgeBg = isWhite ? "#ffffff" : color;
    const glyphColor = isWhite ? contrastDark : "#ffffff";
    const coloredSvg = svg.replace(/fill="(currentColor|#000|#000000|black)"/gi, `fill="${glyphColor}"`).replace(/stroke="(currentColor|#000|#000000|black)"/gi, `stroke="${glyphColor}"`);
    const pathContent = coloredSvg.replace(/<svg[^>]*>|<\/svg>/g, "");
    wrapper = `<circle cx="12" cy="12" r="11.5" fill="${badgeBg}"/><g fill="${glyphColor}" transform="translate(4,4) scale(0.66)">${pathContent}</g>`;
  }
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${wrapper}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}
function getContactIconDataUrl(type, color, style = "minimal", bgColor = "#FDC420") {
  let path2 = "";
  switch (type) {
    case "phone":
      path2 = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
      break;
    case "mobile":
      path2 = '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
      break;
    case "email":
      path2 = '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>';
      break;
    case "address":
      path2 = '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>';
      break;
    case "web":
      path2 = '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>';
      break;
    case "fax":
      path2 = '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>';
      break;
  }
  let wrapper = "";
  const isWhite = color.toLowerCase() === "#ffffff" || color.toLowerCase() === "%23ffffff" || color.toLowerCase() === "white";
  const encColor = encodeURIComponent(color);
  if (style === "circle") {
    if (isWhite) {
      const glyphStroke = encodeURIComponent(bgColor || "#FDC420");
      wrapper = `<circle cx="12" cy="12" r="11.5" fill="%23ffffff"/><g transform="translate(4,4) scale(0.66)" stroke="${glyphStroke}">${path2}</g>`;
    } else {
      wrapper = `<circle cx="12" cy="12" r="12" fill="${encColor}"/><g transform="translate(4,4) scale(0.66)" stroke="%23ffffff">${path2}</g>`;
    }
  } else if (style === "square") {
    if (isWhite) {
      const glyphStroke = encodeURIComponent(bgColor || "#FDC420");
      wrapper = `<rect x="0" y="0" width="24" height="24" rx="4" fill="%23ffffff"/><g transform="translate(4,4) scale(0.66)" stroke="${glyphStroke}">${path2}</g>`;
    } else {
      wrapper = `<rect x="0" y="0" width="24" height="24" rx="4" fill="${encColor}"/><g transform="translate(4,4) scale(0.66)" stroke="%23ffffff">${path2}</g>`;
    }
  } else if (style === "filled") {
    wrapper = `<g fill="${encColor}" stroke="none">${path2}</g>`;
  } else {
    wrapper = `<g stroke="${encColor}">${path2}</g>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${wrapper}</svg>`;
  return `data:image/svg+xml;utf8,${svg.replace(/#/g, "%23")}`;
}
function buildIdentityHtml(state) {
  const { personal, visibility, design } = state;
  const tName = design.typography.name;
  const tJob = design.typography.jobTitle;
  const tComp = design.typography.company;
  const rows = [];
  const nameParts = [];
  if (visibility.civility && personal.civility) nameParts.push(escapeHtml(personal.civility));
  if (visibility.firstName && personal.firstName) nameParts.push(escapeHtml(personal.firstName));
  if (visibility.lastName && personal.lastName) {
    nameParts.push(`<span style="color:${design.colors.lastName}; font-weight:bold;">${escapeHtml(personal.lastName.toUpperCase())}</span>`);
  }
  if (nameParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tName.fontFamily}; font-size:${tName.fontSize}px; font-weight:${tName.fontWeight}; color:${design.colors.firstName}; line-height:${tName.lineHeight}; letter-spacing:${tName.letterSpacing}px; padding-bottom:3px;">
          ${nameParts.join(" ")}
        </td>
      </tr>
    `);
  }
  const jobParts = [];
  if (visibility.jobTitle && personal.jobTitle) jobParts.push(escapeHtml(personal.jobTitle));
  if (visibility.department && personal.department) jobParts.push(escapeHtml(personal.department));
  if (visibility.service && personal.service) jobParts.push(escapeHtml(personal.service));
  if (jobParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tJob.fontFamily}; font-size:${tJob.fontSize}px; font-style:${tJob.fontStyle}; color:${design.colors.jobTitle}; line-height:${tJob.lineHeight}; padding-bottom:3px;">
          ${jobParts.join(" &bull; ")}
        </td>
      </tr>
    `);
  }
  const compParts = [];
  if (visibility.company && personal.company) compParts.push(escapeHtml(personal.company));
  if (visibility.subsidiary && personal.subsidiary) compParts.push(escapeHtml(personal.subsidiary));
  if (compParts.length > 0) {
    rows.push(`
      <tr>
        <td style="font-family:${tComp.fontFamily}; font-size:${tComp.fontSize}px; font-weight:${tComp.fontWeight}; color:${design.colors.company}; line-height:${tComp.lineHeight}; padding-bottom:4px;">
          ${compParts.join(" - ")}
        </td>
      </tr>
    `);
  }
  return rows.length ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">${rows.join("")}</table>` : "";
}
function buildCoordinatesHtml(state, iconCache) {
  const { personal, labels, visibility, design, iconSettings } = state;
  const t = design.typography.coordinates;
  const rows = [];
  const shouldUnderline = t.textDecoration === "underline";
  const textDecor = shouldUnderline ? "underline" : "none";
  const msoUnderline = shouldUnderline ? "single" : "none";
  const makeLink = (href, text, color, isBold = false, targetBlank = false) => {
    const targetAttr = targetBlank ? ' target="_blank" rel="noopener noreferrer"' : "";
    const weightStyle = isBold ? " font-weight:600;" : "";
    const linkStyle = `color:${color}; text-decoration:${textDecor} !important; text-decoration:${textDecor}; -webkit-text-decoration:${textDecor}; mso-text-underline:${msoUnderline}; text-underline-style:${msoUnderline}; border:none; outline:none; border-bottom:none; font-family:${t.fontFamily}; word-break:break-word; overflow-wrap:anywhere;${weightStyle}`;
    const spanStyle = `color:${color}; text-decoration:${textDecor} !important; text-decoration:${textDecor}; -webkit-text-decoration:${textDecor}; mso-text-underline:${msoUnderline}; text-underline-style:${msoUnderline}; border:none; outline:none; border-bottom:none; display:inline; word-break:break-word; overflow-wrap:anywhere;${weightStyle}`;
    return `<a href="${href}"${targetAttr} style="${linkStyle}"><span style="${spanStyle}">${escapeHtml(text)}</span></a>`;
  };
  const addCoordRow = (iconType, label, valueHtml) => {
    const iconUrl = iconCache[`contact_${iconType}`] || getContactIconDataUrl(iconType, design.colors.icons || iconSettings.color, iconSettings.style, design.background.color || "#FDC420");
    rows.push(`
      <tr>
        <td style="vertical-align:middle; padding:1px 0;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
            <tr>
              <td style="vertical-align:middle; width:${iconSettings.size + 4}px; padding-right:${iconSettings.spacing}px;">
                <img src="${iconUrl}" width="${iconSettings.size}" height="${iconSettings.size}" alt="${iconType}" border="0" style="display:block; width:${iconSettings.size}px; height:${iconSettings.size}px;" />
              </td>
              <td style="font-family:${t.fontFamily}; font-size:${t.fontSize}px; line-height:${t.lineHeight}; color:${design.colors.text}; vertical-align:middle; word-break:break-word; overflow-wrap:anywhere;">
                ${label ? `<strong style="color:${design.colors.muted}; font-weight:600;">${escapeHtml(label)}:</strong> ` : ""}${valueHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `);
  };
  if (visibility.phone && personal.phone) {
    const telLink = `tel:${sanitizeTel(personal.phone)}`;
    addCoordRow("phone", labels.phone, makeLink(telLink, personal.phone, design.colors.phone, false, false));
  }
  if (visibility.standardPhone && personal.standardPhone) {
    const telLink = `tel:${sanitizeTel(personal.standardPhone)}`;
    addCoordRow("phone", labels.standardPhone, makeLink(telLink, personal.standardPhone, design.colors.phone, false, false));
  }
  if (visibility.mobile && personal.mobile) {
    const telLink = `tel:${sanitizeTel(personal.mobile)}`;
    const effectiveMobileColor = design.colors.mobile && design.colors.mobile !== "#0C3866" && design.colors.mobile !== "#2D3748" ? design.colors.mobile : design.colors.phone || design.colors.text;
    addCoordRow("mobile", labels.mobile, makeLink(telLink, personal.mobile, effectiveMobileColor, false, false));
  }
  if (visibility.directPhone && personal.directPhone && personal.directPhone !== personal.phone) {
    const telLink = `tel:${sanitizeTel(personal.directPhone)}`;
    addCoordRow("phone", labels.directPhone, makeLink(telLink, personal.directPhone, design.colors.phone, false, false));
  }
  if (visibility.fax && personal.fax) {
    addCoordRow(
      "fax",
      labels.fax,
      `<span style="color:${design.colors.phone}; font-family:${t.fontFamily};">${escapeHtml(personal.fax)}</span>`
    );
  }
  if (visibility.email && personal.email) {
    const mailLink = `mailto:${encodeURIComponent(personal.email)}`;
    addCoordRow("email", labels.email, makeLink(mailLink, personal.email, design.colors.email, true, false));
  }
  if (visibility.website && personal.website) {
    const webUrl = appendUtmParams(sanitizeUrl(personal.website), state.utm);
    const displayWeb = personal.website.replace(/^https?:\/\//i, "");
    addCoordRow("web", labels.website, makeLink(webUrl, displayWeb, design.colors.website, true, true));
  }
  if (visibility.address && (personal.addressLine1 || personal.city)) {
    const fullAddr = [
      personal.addressLine1,
      personal.addressLine2,
      [personal.postalCode, personal.city].filter(Boolean).join(" ")
    ].filter(Boolean).join(" - ");
    const mapsLink = personal.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(fullAddr + (personal.country ? ", " + personal.country : ""))}`;
    addCoordRow("address", labels.address, makeLink(mapsLink, fullAddr, design.colors.address, false, true));
  }
  return rows.length ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:4px;">${rows.join("")}</table>` : "";
}
function buildSocialsHtml(state, iconCache, layoutMode = "horizontal") {
  const { social, visibility, design } = state;
  if (!visibility.socials) return "";
  const activeItems = social.items.filter((item) => item.active && item.url);
  if (activeItems.length === 0) return "";
  const links = activeItems.map((item) => {
    const targetUrl = appendUtmParams(sanitizeUrl(item.url), state.utm);
    const effectiveStyle = item.iconStyle || social.iconStyle || "circle";
    const effectiveColor = social.useBrandColors ? item.color || "#0C3866" : social.color || item.color || design.colors.icons || "#0C3866";
    const iconDataUrl = iconCache[`social_${item.id}`] || getSocialIconDataUrl(item.id, effectiveColor, effectiveStyle, state.design.background.color || "#FDC420");
    const displayLabel = social.style === "icons-text" ? ` <span style="font-size:11px; font-family:${design.typography.baseFont}; color:${design.colors.muted}; vertical-align:middle; padding-left:3px;">${escapeHtml(item.name)}</span>` : "";
    if (layoutMode === "vertical") {
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
  if (layoutMode === "vertical") {
    return `
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:6px;">
        ${links.join("")}
      </table>
    `;
  }
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:6px;">
      <tr>
        ${links.join("")}
      </tr>
    </table>
  `;
}
function buildSloganHtml(state) {
  const { slogan, visibility, design } = state;
  if (!visibility.slogan || !slogan.enabled || !slogan.text) return "";
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
function buildLogoHtml(state, isSecondary = false, iconCache = {}) {
  const { logos, visibility, layout } = state;
  const logo = isSecondary ? logos.secondary : logos.primary;
  const isVisible = isSecondary ? visibility.secondaryLogo : visibility.logo;
  if (!isVisible || !logo.url) return "";
  const cacheKey = isSecondary ? "logo_secondary" : "logo_primary";
  const effectiveUrl = iconCache[cacheKey] || logo.url;
  const dropzoneId = isSecondary ? "logo-secondary" : "logo-primary";
  const isRagtCard = layout.preset === "layout-i" || state.presetName?.includes("Carte RAGT");
  const align = isRagtCard || layout.preset === "layout-d" ? "center" : logo.align || layout.alignH || "center";
  const marginStyle = align === "center" ? "margin:0 auto;" : align === "right" ? "margin-left:auto; margin-right:0;" : "margin:0 auto 0 0;";
  const imgTag = `
    <img data-ragt-dropzone="${dropzoneId}" src="${effectiveUrl}" width="${logo.width}" height="${logo.height}" alt="${escapeHtml(logo.alt || "RAGT")}" border="0" style="display:block; width:${logo.width}px; height:${logo.height}px; max-width:${logo.width}px; ${marginStyle} outline:none; text-decoration:none;" />
  `;
  const innerContent = logo.linkUrl ? `<a href="${sanitizeUrl(logo.linkUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block; text-decoration:none; border:0; ${marginStyle}">${imgTag}</a>` : imgTag;
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${logo.width}" align="${align}" style="display:inline-table; width:${logo.width}px; min-width:${logo.width}px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:${align}; ${marginStyle}">
      <tr>
        <td align="${align}" style="text-align:${align}; padding:0; line-height:0;">
          ${innerContent}
        </td>
      </tr>
    </table>
  `;
}
function buildQrHtml(state, qrDataUrl) {
  const { qr, visibility, layout } = state;
  if (!visibility.qr || !qrDataUrl) return "";
  const isRagtCard = layout.preset === "layout-i" || state.presetName?.includes("Carte RAGT");
  const align = qr.position === "left" && !isRagtCard ? layout.alignH || "center" : "center";
  const marginStyle = align === "center" ? "margin:0 auto;" : align === "right" ? "margin-left:auto; margin-right:0;" : "margin:0 auto 0 0;";
  const qrBoxWidth = qr.size + 6;
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${qrBoxWidth}" align="${align}" style="display:inline-table; width:${qrBoxWidth}px; min-width:${qrBoxWidth}px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:${align}; ${marginStyle}">
      <tr>
        <td width="${qr.size + 4}" style="width:${qr.size + 4}px; min-width:${qr.size + 4}px; padding:2px; background-color:${qr.bgColor || "#FFFFFF"}; border:1px solid #E2E8F0; border-radius:4px; text-align:center;" align="center">
          <img src="${qrDataUrl}" width="${qr.size}" height="${qr.size}" alt="QR Code vCard" border="0" style="display:block; width:${qr.size}px; min-width:${qr.size}px; max-width:${qr.size}px; height:${qr.size}px; min-height:${qr.size}px; max-height:${qr.size}px; aspect-ratio:1/1; margin:0 auto;" />
        </td>
      </tr>
      <tr>
        <td style="font-family:${state.design.typography.baseFont}; font-size:9px; color:#A0AEC0; text-align:center; padding-top:2px; white-space:nowrap;" align="center">
          Scan contact
        </td>
      </tr>
    </table>
  `;
}
function buildBannerHtml(state, iconCache = {}) {
  const { banner, visibility } = state;
  if (!visibility.banner || !isCampaignActive(banner)) return "";
  const effectiveBannerUrl = iconCache["banner_image"] || banner.imageUrl;
  const fixedHeight = Math.min(90, Math.max(20, banner.height));
  const renderedHeight = banner.maintainRatio === false ? fixedHeight : banner.height;
  const heightStyle = banner.maintainRatio === false ? `height:${renderedHeight}px; object-fit:cover;` : `height:auto;`;
  const align = banner.align || (banner.position === "left" ? "left" : banner.position === "right" ? "right" : "center");
  const marginStyle = align === "center" ? "margin:0 auto;" : align === "right" ? "margin-left:auto; margin-right:0;" : "margin:0 auto 0 0;";
  const bannerImg = `
    <img data-ragt-dropzone="banner" src="${effectiveBannerUrl}" width="${banner.width}" height="${renderedHeight}" alt="${escapeHtml(banner.altText || banner.title)}" border="0" style="display:block; width:${banner.width}px; max-width:100%; ${heightStyle} ${marginStyle} border-radius:4px;" />
  `;
  const content = banner.linkUrl ? `<a href="${appendUtmParams(sanitizeUrl(banner.linkUrl), state.utm)}" target="_blank" rel="noopener noreferrer" style="display:inline-block; text-decoration:none; ${marginStyle}">${bannerImg}</a>` : bannerImg;
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${banner.width}" align="${align}" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:${banner.width}px; max-width:100%; margin-top:${banner.marginTop || 0}px; margin-bottom:${banner.marginBottom || 0}px; ${marginStyle} text-align:${align};">
      <tr>
        <td align="${align}" style="vertical-align:top; text-align:${align};">
          ${content}
        </td>
      </tr>
    </table>
  `;
}
function buildCampaignHtml(state, iconCache = {}) {
  const { campaign, visibility, layout } = state;
  if (!campaign || !campaign.enabled || !campaign.imageUrl || visibility.campaign === false) return "";
  if (!isCampaignActive(campaign)) return "";
  const active = campaign;
  const effectiveUrl = iconCache["campaign_image"] || active.imageUrl;
  const isMobilePreset = layout.preset === "layout-c" || layout.preset === "layout-d" || layout.preset === "layout-g";
  const totalWidth = isMobilePreset ? Math.min(layout.dimensions.totalWidth, 340) : layout.dimensions.totalWidth;
  const shouldMaintainRatio = active.maintainRatio !== false;
  const isStandard169 = active.imageUrl.includes("04680") || active.imageUrl.includes("bannieres");
  const proportionalHeight = isStandard169 ? Math.round(totalWidth * 450 / 800) : Math.round(totalWidth * 0.5);
  const heightAttr = shouldMaintainRatio ? proportionalHeight : active.height || proportionalHeight;
  const styleHeight = shouldMaintainRatio ? "height:auto;" : `height:${active.height || heightAttr}px;`;
  const fitMode = active.fitMode || (shouldMaintainRatio ? "contain" : "cover");
  const objectFitStyle = shouldMaintainRatio ? "" : `object-fit:${fitMode};`;
  const bRadius = state.design.border.radius || 4;
  const imgHtml = `<img data-ragt-dropzone="campaign" src="${effectiveUrl}" width="${totalWidth}" height="${heightAttr}" alt="${escapeHtml(active.altText || active.title || "Campagne RAGT")}" border="0" style="display:block; width:${totalWidth}px; max-width:100%; ${styleHeight} ${objectFitStyle} border-radius:0 0 ${bRadius}px ${bRadius}px;" />`;
  const linkContent = active.linkUrl ? `<a href="${appendUtmParams(sanitizeUrl(active.linkUrl), state.utm)}" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none;">${imgHtml}</a>` : imgHtml;
  return `
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${totalWidth}" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:${totalWidth}px; max-width:100%; margin-top:0; margin-bottom:0;">
      <tr>
        <td style="vertical-align:top; text-align:center; padding:0;">
          ${linkContent}
        </td>
      </tr>
    </table>
  `;
}
function generateEmailHTML(state, qrDataUrl = "", iconCache = {}) {
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
  const topBannerHtml = state.banner.position === "top" ? bannerHtml : "";
  const bottomBannerHtml = !campaignHtml && state.banner.position === "bottom" ? bannerHtml : "";
  const rightBannerHtml = state.banner.position === "right" ? bannerHtml : "";
  const leftBannerHtml = state.banner.position === "left" ? bannerHtml : "";
  const centerBannerHtml = state.banner.position === "center" || !state.banner.position ? bannerHtml : "";
  const orderedBlockKeys = Array.from(new Set(
    layout.blockOrder.map((key) => key === "job" || key === "company" ? "identity" : key).filter(
      (key) => ["logo", "identity", "coordinates", "social", "qr", "slogan", "banner"].includes(key)
    )
  ));
  for (const key of ["logo", "identity", "coordinates", "social", "qr", "slogan", "banner"]) {
    if (!orderedBlockKeys.includes(key)) orderedBlockKeys.push(key);
  }
  const orderedCenterBlocks = {
    logo: `${logoHtml}${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ""}`,
    identity: identityHtml,
    coordinates: coordsHtml,
    social: socialsHtml,
    qr: qrHtml,
    slogan: sloganHtml,
    // Top and bottom campaigns retain their dedicated Outlook-safe wrappers.
    // Only a centered image becomes part of the freely ordered composition.
    banner: centerBannerHtml
  };
  const orderedCenterRows = orderedBlockKeys.map((key) => orderedCenterBlocks[key] ? `<tr><td align="center" style="text-align:center; padding-top:4px;">${orderedCenterBlocks[key]}</td></tr>` : "").join("");
  const defaultBlockOrder = ["logo", "identity", "coordinates", "social", "qr", "slogan", "banner"];
  const usesDefaultBlockOrder = orderedBlockKeys.every((key, index) => key === defaultBlockOrder[index]);
  const buildOrderedInfoHtml = (options = {}) => {
    const includeSocial = options.includeSocial !== false;
    const includeCenterBanner = options.includeCenterBanner !== false;
    const blocks = {
      identity: identityHtml,
      coordinates: coordsHtml,
      social: includeSocial ? socialsHtml : "",
      slogan: sloganHtml,
      qr: state.qr.position === "bottom" ? qrHtml : "",
      banner: includeCenterBanner ? centerBannerHtml : ""
    };
    const legacyOrder = ["banner", "identity", "coordinates", "social", "slogan", "qr"];
    const order = usesDefaultBlockOrder ? legacyOrder : orderedBlockKeys;
    const bannerAlign = state.banner.align || (state.banner.position === "left" ? "left" : state.banner.position === "right" ? "right" : "center");
    const rows = order.filter((key) => key !== "logo").map((key) => {
      if (!blocks[key]) return "";
      const tdAlign = key === "banner" ? `align="${bannerAlign}" style="padding-top:4px; text-align:${bannerAlign};"` : `style="padding-top:4px;"`;
      return `<tr><td ${tdAlign}>${blocks[key]}</td></tr>`;
    }).join("");
    return rows ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%;">${rows}</table>` : "";
  };
  let borderStyle = "";
  if (design.border.type === "all") {
    borderStyle = `border:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === "top") {
    borderStyle = `border-top:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === "bottom") {
    borderStyle = `border-bottom:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === "left") {
    borderStyle = `border-left:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  } else if (design.border.type === "right") {
    borderStyle = `border-right:${design.border.thickness}px ${design.border.style} ${design.border.color};`;
  }
  const hasCampaignBelow = Boolean(campaignHtml);
  if (design.border.radius && design.border.radius > 0) {
    if (hasCampaignBelow) {
      borderStyle += ` border-radius:${design.border.radius}px ${design.border.radius}px 0 0; overflow:hidden;`;
    } else {
      borderStyle += ` border-radius:${design.border.radius}px; overflow:hidden;`;
    }
  }
  const isRagtCard = layout.preset === "layout-i" || state.presetName?.includes("Carte RAGT");
  const isYellowBg = design.background.color?.toUpperCase() === "#FDC420" || design.colors.background?.toUpperCase() === "#FDC420";
  const RAGT_PUBLIC_PATTERN_URL = "https://amadogregory22-crypto.github.io/assets/patterns/ragt-jaune-pale.png";
  const hasBgImage = Boolean(design.background.type === "image" && design.background.imageUrl || isRagtCard && isYellowBg);
  const effectiveBgUrl = (() => {
    if (design.background.type === "image" && design.background.imageUrl) {
      if (design.background.imageUrl.includes("ragt-jaune-pale")) return RAGT_PUBLIC_PATTERN_URL;
      if (design.background.imageUrl.startsWith("http://") || design.background.imageUrl.startsWith("https://")) {
        return design.background.imageUrl;
      }
      if (design.background.imageUrl.startsWith("/")) {
        return `https://amadogregory22-crypto.github.io${design.background.imageUrl}`;
      }
      return design.background.imageUrl;
    }
    if (isRagtCard && isYellowBg) {
      return RAGT_PUBLIC_PATTERN_URL;
    }
    return "";
  })();
  const bgStyle = (() => {
    if (hasBgImage && effectiveBgUrl) {
      const cssBgUrl = iconCache["bg_image"] || effectiveBgUrl;
      return `background-color:${design.background.color || "#FDC420"}; background-image:url('${cssBgUrl}'); background-repeat:no-repeat; background-position:center; background-size:${design.background.size || "cover"};`;
    }
    if (design.background.type === "color" && design.background.color) {
      return `background-color:${design.background.color};`;
    }
    return "";
  })();
  const tableBgColorAttr = (design.background.type === "color" || design.background.type === "image" || isRagtCard && isYellowBg) && (design.background.color || "#FDC420") ? `bgcolor="${design.background.color || "#FDC420"}"` : "";
  const verticalSeparatorTd = sep.type === "vertical" ? `<td style="width:${sep.thickness}px; background-color:${sep.color}; font-size:1px; line-height:1px; padding:0; margin:0;" width="${sep.thickness}">&nbsp;</td>` : "";
  const horizontalSeparatorTr = sep.type === "horizontal" ? `<tr><td colspan="3" style="height:${sep.thickness}px; background-color:${sep.color}; font-size:1px; line-height:1px; padding:0; margin:${sep.margin}px 0;" height="${sep.thickness}">&nbsp;</td></tr>` : "";
  let innerStructure = "";
  switch (layout.preset) {
    case "layout-b":
      innerStructure = `
        <tr>
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px;">
            ${state.qr.position === "left" && qrHtml ? `<div style="padding-bottom:10px;">${qrHtml}</div>` : ""}
            ${buildOrderedInfoHtml()}
          </td>
          ${verticalSeparatorTd}
          <!-- Logo & QR Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; text-align:${layout.alignH}; padding-left:${p.innerSpacing}px;" width="${p.logoColumnWidth}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px;">${secondaryLogoHtml}</div>` : ""}
            ${state.qr.position === "right" && qrHtml ? `<div style="padding-top:10px;">${qrHtml}</div>` : ""}
          </td>
        </tr>
      `;
      break;
    case "layout-c":
      innerStructure = `
        <tr>
          <td style="vertical-align:top; text-align:${layout.alignH}; padding-bottom:${p.innerSpacing}px;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; ${layout.alignH === "center" ? "margin:0 auto;" : ""}">
              <tr>
                ${state.qr.position === "left" && qrHtml ? `<td style="vertical-align:middle; padding-right:12px;">${qrHtml}</td>` : ""}
                <td style="vertical-align:middle;">${logoHtml}</td>
                ${secondaryLogoHtml ? `<td style="vertical-align:middle; padding-left:12px;">${secondaryLogoHtml}</td>` : ""}
                ${state.qr.position === "right" && qrHtml ? `<td style="vertical-align:middle; padding-left:12px;">${qrHtml}</td>` : ""}
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
    case "layout-d":
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
    case "layout-e":
      innerStructure = `
        <tr>
          <!-- Logo Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; text-align:${layout.alignH || "left"}; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}" align="${layout.alignH || "left"}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${secondaryLogoHtml}</div>` : ""}
            ${state.qr.position === "left" && qrHtml ? `<div style="padding-top:10px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${qrHtml}</div>` : ""}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px; padding-right:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml()}
          </td>
          <!-- QR Column -->
          ${state.qr.position === "right" && qrHtml ? `
            <td style="width:${(p.qrSize || 75) + 20}px; min-width:${(p.qrSize || 75) + 20}px; vertical-align:${layout.alignV}; text-align:center; padding-left:${p.innerSpacing}px; border-left:1px solid #E2E8F0;" width="${(p.qrSize || 75) + 20}">
              ${qrHtml}
            </td>
          ` : ""}
        </tr>
      `;
      break;
    case "layout-f":
      innerStructure = `
        <tr>
          <td style="width:120px; vertical-align:middle; text-align:${layout.alignH || "left"}; padding-right:12px;" width="120" align="${layout.alignH || "left"}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:6px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${secondaryLogoHtml}</div>` : ""}
            ${state.qr.position === "left" && qrHtml ? `<div style="padding-top:8px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${qrHtml}</div>` : ""}
          </td>
          ${verticalSeparatorTd}
          <td style="vertical-align:middle; padding-left:12px;">
            ${buildOrderedInfoHtml()}
          </td>
          ${state.qr.position === "right" && qrHtml ? `
            <td style="vertical-align:middle; text-align:center; padding-left:12px;">
              ${qrHtml}
            </td>
          ` : ""}
        </tr>
      `;
      break;
    case "layout-g":
      innerStructure = `
        <tr>
          <td style="text-align:left; padding-bottom:8px; vertical-align:top;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
              <tr>
                ${state.qr.position === "left" && qrHtml ? `<td style="vertical-align:middle; padding-right:10px;">${qrHtml}</td>` : ""}
                <td style="vertical-align:middle;">${logoHtml}</td>
                ${secondaryLogoHtml ? `<td style="vertical-align:middle; padding-left:10px;">${secondaryLogoHtml}</td>` : ""}
                ${state.qr.position === "right" && qrHtml ? `<td style="vertical-align:middle; padding-left:10px;">${qrHtml}</td>` : ""}
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
    case "layout-i":
      const hasRightQr = (state.qr.position === "right" || !["left", "bottom"].includes(state.qr.position)) && Boolean(qrHtml);
      const rightQrSize = state.qr.size || 75;
      const rightColWidth = hasRightQr ? Math.max(50, rightQrSize + 10) : 46;
      const rightSocialsHtml = state.visibility.socials ? buildSocialsHtml(state, iconCache, "vertical") : "";
      const rightQrHtml = hasRightQr ? `<tr><td style="text-align:center; padding-bottom:8px;" align="center">${qrHtml}</td></tr>` : "";
      const rightColumnHtml = `
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${rightColWidth}" style="display:inline-table; width:${rightColWidth}px; min-width:${rightColWidth}px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center; margin:0 auto;">
          ${rightQrHtml}
          ${rightSocialsHtml ? `<tr><td style="text-align:center; vertical-align:middle; width:46px;" width="46" align="center">${rightSocialsHtml}</td></tr>` : ""}
        </table>
      `;
      innerStructure = `
        <tr>
          <!-- Logo Column Left -->
          <td style="width:${p.logoColumnWidth}px; min-width:${p.logoColumnWidth}px; vertical-align:middle; text-align:center; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}" align="center">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px; text-align:center;" align="center">${secondaryLogoHtml}</div>` : ""}
            ${state.qr.position === "left" && qrHtml ? `<div style="padding-top:10px; text-align:center;" align="center">${qrHtml}</div>` : ""}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column Center: Photo on top, then Name & Title, then Coordinates -->
          <td style="vertical-align:middle; text-align:left; padding-left:${p.innerSpacing}px; padding-right:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml({ includeSocial: false })}
          </td>
          <!-- Socials Column Right: 4 white circular discs stacked vertically (and QR code if position is right) -->
          <td style="width:${rightColWidth}px; min-width:${rightColWidth}px; vertical-align:middle; text-align:center; padding-left:${p.innerSpacing}px;" width="${rightColWidth}" align="center">
             ${rightColumnHtml}
          </td>
        </tr>
        ${state.qr.position === "bottom" && qrHtml ? `
          <tr>
            <td colspan="${verticalSeparatorTd ? 4 : 3}" align="center" style="text-align:center; padding-top:12px;">
              ${qrHtml}
            </td>
          </tr>
        ` : ""}
      `;
      break;
    case "layout-h":
    // Layout with prominent banner
    case "layout-a":
    // Default Layout A: Logo Left, Info Right
    default:
      innerStructure = `
        <tr>
          <!-- Left Banner Column if left position -->
          ${leftBannerHtml ? `
            <td style="vertical-align:${layout.alignV}; padding-right:${p.innerSpacing}px; text-align:left;">
              ${leftBannerHtml}
            </td>
          ` : ""}
          <!-- Logo Column -->
          <td style="width:${p.logoColumnWidth}px; vertical-align:${layout.alignV}; text-align:${layout.alignH || "left"}; padding-right:${p.innerSpacing}px;" width="${p.logoColumnWidth}" align="${layout.alignH || "left"}">
            ${logoHtml}
            ${secondaryLogoHtml ? `<div style="padding-top:8px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${secondaryLogoHtml}</div>` : ""}
            ${state.qr.position === "left" && qrHtml ? `<div style="padding-top:10px; text-align:${layout.alignH || "left"};" align="${layout.alignH || "left"}">${qrHtml}</div>` : ""}
          </td>
          ${verticalSeparatorTd}
          <!-- Info Column -->
          <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px;">
            ${buildOrderedInfoHtml()}
          </td>
          <!-- Right QR if configured -->
          ${state.qr.position === "right" && qrHtml ? `
            <td style="vertical-align:${layout.alignV}; text-align:right; padding-left:${p.innerSpacing}px;">
              ${qrHtml}
            </td>
          ` : ""}
          <!-- Right Banner Column if right position -->
          ${rightBannerHtml ? `
            <td style="vertical-align:${layout.alignV}; padding-left:${p.innerSpacing}px; text-align:right;">
              ${rightBannerHtml}
            </td>
          ` : ""}
        </tr>
      `;
      break;
  }
  const isMobilePreset = layout.preset === "layout-c" || layout.preset === "layout-d" || layout.preset === "layout-g";
  const effectiveTotalWidth = isMobilePreset ? Math.min(p.totalWidth, 340) : p.totalWidth;
  const padLeft = isMobilePreset ? Math.min(p.paddingLeft, 12) : p.paddingLeft;
  const padRight = isMobilePreset ? Math.min(p.paddingRight, 12) : p.paddingRight;
  const padTop = isMobilePreset ? Math.min(p.paddingTop, 10) : p.paddingTop;
  const padBottom = isMobilePreset ? Math.min(p.paddingBottom, 10) : p.paddingBottom;
  let estimatedCardHeight = 270;
  if (isRagtCard) {
    const bannerH = state.visibility.banner && state.banner.enabled ? state.banner.height || 84 : 0;
    const logoH = state.logos.primary?.height || 100;
    const qrH = state.visibility.qr ? state.qr.size || 80 : 0;
    const col1H = logoH + qrH + 14;
    const pInfo = state.personal;
    const coordsCount = [pInfo.phone, pInfo.mobile, pInfo.email, pInfo.addressLine1 || pInfo.city, pInfo.website].filter(Boolean).length;
    const col2H = bannerH + 45 + coordsCount * 18 + (state.visibility.slogan ? 24 : 0);
    estimatedCardHeight = Math.max(260, Math.max(col1H, col2H) + padTop + padBottom);
  }
  return `<!-- RAGT Semences Outlook Email Signature V3 -->
<!--[if mso]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
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
  ${state.renderMode === "flattened-card" ? "" : `
  ${hasBgImage ? `<!--[if gte mso 9]>
  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${effectiveTotalWidth}px;height:${estimatedCardHeight}px;v-text-anchor:top;">
    <v:fill type="frame" src="${effectiveBgUrl}" color="${design.background.color || "#FDC420"}" />
    <v:textbox style="mso-fit-shape-to-text:true;" inset="0,0,0,0">
  <![endif]-->` : ""}
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="${effectiveTotalWidth}" ${hasBgImage ? `background="${effectiveBgUrl}"` : ""} ${tableBgColorAttr} style="width:${isMobilePreset ? "100%" : `${effectiveTotalWidth}px`}; max-width:${effectiveTotalWidth}px; ${bgStyle} ${borderStyle} border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
    <tbody>
      <tr>
        <td ${hasBgImage ? `background="${effectiveBgUrl}"` : ""} ${hasBgImage ? "" : tableBgColorAttr} style="padding:${padTop}px ${padRight}px ${padBottom}px ${padLeft}px;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
            <tbody>
              ${innerStructure}
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  ${hasBgImage ? `<!--[if gte mso 9]>
    </v:textbox>
  </v:rect>
  <![endif]-->` : ""}
  `}
  ${campaignHtml || bottomBannerHtml}
</div>
<!-- End RAGT Signature -->`;
}

// scripts/buildStandaloneHtml.ts
function fileToDataUrl(url) {
  if (!url || typeof url !== "string" || url.startsWith("data:")) return url || "";
  try {
    const cleanUrl = url.split("?")[0];
    const filePath = import_path.default.resolve(__dirname, "../public", cleanUrl.replace(/^\//, ""));
    if (import_fs.default.existsSync(filePath)) {
      const ext = import_path.default.extname(filePath).slice(1).toLowerCase();
      const mime = ext === "svg" ? "image/svg+xml" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
      const b64 = import_fs.default.readFileSync(filePath).toString("base64");
      return `data:${mime};base64,${b64}`;
    }
  } catch (e) {
  }
  return url;
}
function inlineHtmlImages(htmlStr) {
  return htmlStr.replace(/src=["'](\/[^"']+)["']/g, (_, srcPath) => {
    const dataUrl = fileToDataUrl(srcPath);
    return `src="${dataUrl}"`;
  });
}
var carteRagtState = SIGNATURE_PRESETS[0].apply(DEFAULT_SIGNATURE_STATE);
var embeddedState = {
  ...carteRagtState,
  logos: {
    ...carteRagtState.logos,
    primary: { ...carteRagtState.logos.primary, url: fileToDataUrl(carteRagtState.logos.primary?.url) },
    secondary: { ...carteRagtState.logos.secondary, url: fileToDataUrl(carteRagtState.logos.secondary?.url) }
  },
  banner: {
    ...carteRagtState.banner,
    imageUrl: fileToDataUrl(carteRagtState.banner?.imageUrl)
  }
};
var initialEmailHtml = inlineHtmlImages(generateEmailHTML(embeddedState));
var html = generateStandaloneSignatureAppHtml(embeddedState, initialEmailHtml);
var outPath = import_path.default.resolve(__dirname, "../public/signature.html");
import_fs.default.writeFileSync(outPath, html, "utf-8");
var distPath = import_path.default.resolve(__dirname, "../dist/signature.html");
if (import_fs.default.existsSync(import_path.default.dirname(distPath))) {
  import_fs.default.writeFileSync(distPath, html, "utf-8");
}
console.log("Successfully generated public/signature.html & dist/signature.html (" + html.length + " bytes)");
