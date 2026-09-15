import { AnalysisResult, SignatureDocument, Project, Asset, RenderResult } from '../types';

const API_BASE = '/api/v1';

export const api = {
  async uploadImage(file: File): Promise<{ image_id: string; filename: string; url: string; width: number; height: number }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/images/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error("Erreur lors de l'upload de l'image");
    return res.json();
  },

  async analyzeImage(imageId: string): Promise<AnalysisResult> {
    const res = await fetch(`${API_BASE}/images/${imageId}/analyze`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error("Erreur lors de l'analyse d'image");
    return res.json();
  },

  async createProject(name: string, sourceImageId?: string, sourceImageUrl?: string): Promise<Project> {
    const params = new URLSearchParams({ name });
    if (sourceImageId) params.append('source_image_id', sourceImageId);
    if (sourceImageUrl) params.append('source_image_url', sourceImageUrl);
    const res = await fetch(`${API_BASE}/projects?${params.toString()}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Erreur création projet');
    return res.json();
  },

  async getProject(projectId: string): Promise<{ project: Project; document?: SignatureDocument; latest_analysis?: any }> {
    const res = await fetch(`${API_BASE}/projects/${projectId}`);
    if (!res.ok) throw new Error('Erreur chargement projet');
    return res.json();
  },

  async buildDocument(projectId: string, confirmedCandidateIds: string[]): Promise<SignatureDocument> {
    const res = await fetch(`${API_BASE}/projects/${projectId}/build-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmed_candidate_ids: confirmedCandidateIds }),
    });
    if (!res.ok) throw new Error('Erreur construction document');
    return res.json();
  },

  async saveDocument(doc: SignatureDocument): Promise<SignatureDocument> {
    const res = await fetch(`${API_BASE}/documents/${doc.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    if (!res.ok) throw new Error('Erreur sauvegarde document');
    return res.json();
  },

  async renderModern(docId: string): Promise<RenderResult> {
    const res = await fetch(`${API_BASE}/documents/${docId}/render/modern`, { method: 'POST' });
    if (!res.ok) throw new Error('Erreur rendu moderne');
    return res.json();
  },

  async renderClassic(docId: string): Promise<RenderResult> {
    const res = await fetch(`${API_BASE}/documents/${docId}/render/classic`, { method: 'POST' });
    if (!res.ok) throw new Error('Erreur rendu classique');
    return res.json();
  },

  async listAssets(category?: string): Promise<Asset[]> {
    const url = category ? `${API_BASE}/assets?category=${encodeURIComponent(category)}` : `${API_BASE}/assets`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erreur récupération assets');
    return res.json();
  },

  getDownloadPackageUrl(docId: string): string {
    return `${API_BASE}/documents/${docId}/export/package`;
  }
};
