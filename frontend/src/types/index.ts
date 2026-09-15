export type SemanticType =
  | 'name'
  | 'first_name'
  | 'last_name'
  | 'job_title'
  | 'company'
  | 'email'
  | 'phone'
  | 'mobile'
  | 'address'
  | 'website'
  | 'logo'
  | 'icon_contact'
  | 'social_network'
  | 'qr_code'
  | 'slogan'
  | 'graphic_shape'
  | 'unknown';

export type ComponentStatus = 'confirmed' | 'review' | 'rejected';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CandidateComponent {
  id: string;
  type: 'text' | 'image' | 'qr' | 'shape' | 'icon';
  semantic_type: SemanticType;
  value: string;
  bounds: BoundingBox;
  confidence: number;
  status: ComponentStatus;
  source_engine: string;
  metadata?: {
    rawOcrText?: string;
    decoded?: boolean;
    payload?: string;
    associatedTo?: string;
    contactType?: string;
    isRowMember?: boolean;
    rowGroupId?: string;
    [key: string]: any;
  };
}

export interface AnalysisResult {
  image_id: string;
  image_width: number;
  image_height: number;
  candidates: CandidateComponent[];
  dominant_colors: string[];
  execution_time_ms: number;
}

export interface DocumentFields {
  full_name: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  company?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  website?: string;
  slogan?: string;
  custom_fields?: Record<string, string>;
}

export interface ElementStyle {
  font_family?: string;
  font_size?: number;
  font_weight?: string | number;
  font_style?: 'normal' | 'italic';
  color?: string;
  background_color?: string;
  text_align?: 'left' | 'center' | 'right';
  line_height?: number;
  letter_spacing?: number;
  border_color?: string;
  border_width?: number;
  border_radius?: number;
}

export interface LinkConfig {
  url: string;
  protocol?: string;
}

export interface DocumentElement {
  id: string;
  type: 'text' | 'image' | 'icon' | 'qr' | 'shape' | 'divider';
  semantic_type: SemanticType;
  field_binding?: string; // e.g. "email", "full_name"
  static_content?: string;
  bounds: BoundingBox;
  rotation: number;
  opacity: number;
  z_index: number;
  visible: boolean;
  locked: boolean;
  group_id?: string;
  style: ElementStyle;
  link?: LinkConfig;
  asset_id?: string;
}

export interface SignatureDocument {
  id: string;
  project_id: string;
  name: string;
  revision: number;
  width: number;
  height: number;
  fields: DocumentFields;
  elements: DocumentElement[];
  theme: {
    primary_color: string;
    secondary_color: string;
    text_color: string;
    background_color: string;
    font_family: string;
  };
  settings: {
    outlook_compat_mode: 'hybrid' | 'modern' | 'classic_strict';
    include_vcard: boolean;
    table_align: 'left' | 'center';
  };
}

export interface Project {
  id: string;
  name: string;
  source_image_id?: string;
  source_image_url?: string;
  current_document_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  sub_category?: string;
  file_path: string;
  url: string;
  mime_type: string;
  width?: number;
  height?: number;
  tags: string[];
  svg_content?: string;
}

export interface RenderResult {
  format: string;
  html: string;
  preview_url?: string;
  warnings: string[];
  metadata: Record<string, any>;
}
