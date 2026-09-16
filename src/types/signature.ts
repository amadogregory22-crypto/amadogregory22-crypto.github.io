export type LayoutPreset =
  | 'layout-a' // Logo left, info right
  | 'layout-b' // Info left, logo right
  | 'layout-c' // Logo top, info bottom
  | 'layout-d' // Centered info
  | 'layout-e' // Logo + info + lateral QR code
  | 'layout-f' // Horizontal compact
  | 'layout-g' // Vertical card
  | 'layout-h' // With bottom banner
  | 'layout-i'; // Logo Left, Info Center, Banner top center, Social/QR Right Sidebar

export type PreviewEnv = 'light' | 'dark' | 'outlook' | 'mobile';

export type FontChoice =
  | 'Arial, Helvetica, sans-serif'
  | 'Verdana, Geneva, sans-serif'
  | 'Tahoma, Geneva, sans-serif'
  | 'Georgia, serif'
  | 'Times New Roman, Times, serif'
  | 'Trebuchet MS, Helvetica, sans-serif'
  | 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif'
  | 'Segoe UI, Frutiger, Arial, sans-serif';

export interface PersonalInfo {
  civility: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  service: string;
  company: string;
  subsidiary: string;
  phone: string;
  mobile: string;
  fax: string;
  directPhone: string;
  standardPhone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
  website: string;
  mapsUrl?: string;
}

export interface LabelsConfig {
  phone: string;
  mobile: string;
  fax: string;
  standardPhone: string;
  directPhone: string;
  email: string;
  address: string;
  website: string;
}

export interface VisibilityConfig {
  civility: boolean;
  firstName: boolean;
  lastName: boolean;
  jobTitle: boolean;
  department: boolean;
  service: boolean;
  company: boolean;
  subsidiary: boolean;
  phone: boolean;
  mobile: boolean;
  fax: boolean;
  directPhone: boolean;
  standardPhone: boolean;
  email: boolean;
  address: boolean;
  website: boolean;
  logo: boolean;
  secondaryLogo: boolean;
  qr: boolean;
  socials: boolean;
  banner: boolean;
  slogan: boolean;
}

export interface LayoutDimensions {
  totalWidth: number; // e.g. 520px
  logoColumnWidth: number; // e.g. 140px
  infoColumnWidth: number;
  qrSize: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  innerSpacing: number; // spacing between columns/blocks
}

export interface SeparatorConfig {
  type: 'none' | 'vertical' | 'horizontal';
  color: string;
  thickness: number;
  style: 'solid' | 'dashed' | 'dotted';
  margin: number;
}

export type BlockOrderKey =
  | 'logo'
  | 'identity'
  | 'job'
  | 'company'
  | 'coordinates'
  | 'social'
  | 'qr'
  | 'slogan'
  | 'banner';

export interface TypographyItem {
  fontFamily: FontChoice;
  fontSize: number; // in px
  fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  lineHeight: number; // e.g. 1.2 or 1.4
  letterSpacing: number; // in px
  color: string;
}

export interface DesignConfig {
  colors: {
    primary: string; // RAGT Blue #0C3866
    secondary: string; // RAGT Yellow #F7BD00
    text: string; // #333333
    muted: string; // #666666
    links: string; // #0C3866
    firstName: string;
    lastName: string;
    jobTitle: string;
    company: string;
    phone: string;
    mobile: string;
    email: string;
    website: string;
    address: string;
    icons: string;
    separator: string;
    background: string;
    slogan: string;
    qrFg: string;
    qrBg: string;
  };
  typography: {
    baseFont: FontChoice;
    name: TypographyItem;
    jobTitle: TypographyItem;
    company: TypographyItem;
    coordinates: TypographyItem;
    slogan: TypographyItem;
    legal: TypographyItem;
  };
  background: {
    type: 'none' | 'color' | 'image' | 'pattern';
    color: string;
    imageUrl: string;
    pattern: 'none' | 'dots' | 'grid' | 'stripes' | 'wheat';
    opacity: number;
    size: string;
  };
  border: {
    type: 'none' | 'all' | 'top' | 'bottom' | 'left' | 'right';
    color: string;
    thickness: number;
    style: 'solid' | 'dashed' | 'dotted';
    radius: number;
  };
}

export interface LogoItem {
  id: string;
  label: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  keepRatio: boolean;
  linkUrl: string;
  align: 'left' | 'center' | 'right';
  visible: boolean;
}

export interface IconSettings {
  style: 'outline' | 'filled' | 'circle' | 'square' | 'minimal';
  size: number;
  color: string;
  spacing: number;
}

export interface QRCodeConfig {
  type: 'vcard' | 'url' | 'email' | 'phone' | 'custom';
  customText: string;
  position: 'right' | 'left' | 'bottom' | 'top' | 'inline';
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  visible: boolean;
}

export interface SocialNetwork {
  id: 'linkedin' | 'facebook' | 'instagram' | 'youtube' | 'x' | 'tiktok' | 'website' | 'web' | 'custom';
  name: string;
  url: string;
  active: boolean;
  iconStyle: 'circle' | 'square' | 'rounded' | 'mono';
  color: string;
  customIcon?: string;
}

export interface SocialConfig {
  style: 'icons-only' | 'icons-text' | 'text-only';
  iconSize: number;
  spacing: number;
  align: 'left' | 'center' | 'right';
  items: SocialNetwork[];
}

export interface UTMConfig {
  enabled: boolean;
  source: string;
  medium: string;
  campaign: string;
}

export interface BannerConfig {
  enabled: boolean;
  title: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  width: number;
  height: number;
  maintainRatio?: boolean;
  marginTop: number;
  marginBottom: number;
  position: 'top' | 'bottom' | 'right' | 'left' | 'center';
  buttonText: string;
  campaignName: string;
  startDate?: string;
  endDate?: string;
}

export interface SloganConfig {
  enabled: boolean;
  text: string;
  fontFamily: FontChoice;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
  fontStyle: 'normal' | 'italic';
  color: string;
  align: 'left' | 'center' | 'right';
  marginTop: number;
  marginBottom: number;
  position: 'above-footer' | 'below-name' | 'bottom';
}

export interface SignatureState {
  appVersion: string;
  presetName: string;
  /** A pre-rendered card image replaces the standard table structure. */
  renderMode?: 'standard' | 'flattened-card';
  /** Original template used to regenerate a flattened card after contact details change. */
  cardTemplateUrl?: string;
  layout: {
    preset: LayoutPreset;
    dimensions: LayoutDimensions;
    separator: SeparatorConfig;
    alignH: 'left' | 'center' | 'right';
    alignV: 'top' | 'middle' | 'bottom';
    blockOrder: BlockOrderKey[];
  };
  personal: PersonalInfo;
  labels: LabelsConfig;
  visibility: VisibilityConfig;
  design: DesignConfig;
  logos: {
    primary: LogoItem;
    secondary: LogoItem;
    certification: LogoItem;
  };
  iconSettings: IconSettings;
  qr: QRCodeConfig;
  social: SocialConfig;
  utm: UTMConfig;
  banner: BannerConfig;
  slogan: SloganConfig;
}

export interface ValidationItem {
  id: string;
  category: 'personal' | 'links' | 'images' | 'qr' | 'outlook' | 'security' | 'a11y';
  label: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
}

export interface ClientCompatibilityScore {
  client: string;
  stars: number; // 0 when no manual client recipe has been recorded
  status: 'perfect' | 'good' | 'fair' | 'unverified';
  notes: string;
}
