import { create } from 'zustand';
import { SignatureDocument, DocumentElement, DocumentFields, Project, AnalysisResult } from '../types';

interface StudioState {
  // Navigation & Step
  currentStep: 'import' | 'analysis' | 'review' | 'editor' | 'preview' | 'export';
  activeTab: 'content' | 'colors' | 'layers' | 'assets' | 'format';
  
  // Project & Document
  project: Project | null;
  document: SignatureDocument | null;
  analysis: AnalysisResult | null;
  
  // Source Reference Layer (Never exported, solely for visual overlay at 20-30% opacity)
  sourceReference: {
    imageUrl: string | null;
    visible: boolean;
    opacity: number; // 0.25 default
  };

  // Canvas UI State
  selectedElementIds: string[];
  zoom: number;
  pan: { x: number; y: number };
  showGrid: boolean;
  snapToGrid: boolean;
  
  // Undo/Redo History
  history: SignatureDocument[];
  historyIndex: number;

  // Actions
  setStep: (step: 'import' | 'analysis' | 'review' | 'editor' | 'preview' | 'export') => void;
  setActiveTab: (tab: 'content' | 'colors' | 'layers' | 'assets' | 'format') => void;
  setProject: (project: Project) => void;
  setAnalysis: (analysis: AnalysisResult) => void;
  setDocument: (document: SignatureDocument, pushHistory?: boolean) => void;
  
  // Single Source of Truth updates
  updateField: (field: keyof DocumentFields, value: string) => void;
  updateElement: (elementId: string, patch: Partial<DocumentElement>) => void;
  updateDocumentDimensions: (width: number, height: number) => void;
  updateTheme: (patch: Partial<SignatureDocument['theme']>) => void;
  
  // Selection & Transform
  selectElement: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  deleteSelectedElements: () => void;
  duplicateSelectedElements: () => void;
  
  // Layer Ordering & Locking
  toggleElementLock: (id: string) => void;
  toggleElementVisibility: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;

  // Source Reference Toggle
  setSourceReferenceVisibility: (visible: boolean) => void;
  setSourceReferenceOpacity: (opacity: number) => void;
  
  // Canvas View Controls
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  
  // Undo / Redo
  undo: () => void;
  redo: () => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  currentStep: 'import',
  activeTab: 'content',
  project: null,
  document: null,
  analysis: null,
  sourceReference: {
    imageUrl: null,
    visible: false,
    opacity: 0.25,
  },
  selectedElementIds: [],
  zoom: 1,
  pan: { x: 0, y: 0 },
  showGrid: true,
  snapToGrid: true,
  history: [],
  historyIndex: -1,

  setStep: (step) => set({ currentStep: step }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setProject: (project) => set({ project, sourceReference: { imageUrl: project.source_image_url || null, visible: false, opacity: 0.25 } }),
  setAnalysis: (analysis) => set({ analysis }),
  
  setDocument: (document, pushHistory = true) => {
    const { history, historyIndex } = get();
    if (pushHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(document)));
      set({ document, history: newHistory, historyIndex: newHistory.length - 1 });
    } else {
      set({ document });
    }
  },

  // Single Source of Truth propagation
  updateField: (field, value) => {
    const { document, setDocument } = get();
    if (!document) return;

    const newDoc: SignatureDocument = {
      ...document,
      fields: {
        ...document.fields,
        [field]: value,
      },
    };
    setDocument(newDoc, true);
  },

  updateElement: (elementId, patch) => {
    const { document, setDocument } = get();
    if (!document) return;

    const newElements = document.elements.map((el) => {
      if (el.id === elementId) {
        return { ...el, ...patch };
      }
      return el;
    });

    setDocument({ ...document, elements: newElements }, true);
  },

  updateDocumentDimensions: (width, height) => {
    const { document, setDocument } = get();
    if (!document) return;
    setDocument({ ...document, width, height }, true);
  },

  updateTheme: (patch) => {
    const { document, setDocument } = get();
    if (!document) return;
    setDocument({
      ...document,
      theme: { ...document.theme, ...patch },
    }, true);
  },

  selectElement: (id, multi = false) => {
    const { selectedElementIds } = get();
    if (multi) {
      if (selectedElementIds.includes(id)) {
        set({ selectedElementIds: selectedElementIds.filter((elId) => elId !== id) });
      } else {
        set({ selectedElementIds: [...selectedElementIds, id] });
      }
    } else {
      set({ selectedElementIds: [id] });
    }
  },

  clearSelection: () => set({ selectedElementIds: [] }),

  deleteSelectedElements: () => {
    const { document, selectedElementIds, setDocument } = get();
    if (!document || selectedElementIds.length === 0) return;
    const newElements = document.elements.filter((el) => !selectedElementIds.includes(el.id));
    setDocument({ ...document, elements: newElements }, true);
    set({ selectedElementIds: [] });
  },

  duplicateSelectedElements: () => {
    const { document, selectedElementIds, setDocument } = get();
    if (!document || selectedElementIds.length === 0) return;

    const duplicates: DocumentElement[] = [];
    document.elements.forEach((el) => {
      if (selectedElementIds.includes(el.id)) {
        duplicates.push({
          ...el,
          id: `el-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          bounds: {
            ...el.bounds,
            x: el.bounds.x + 15,
            y: el.bounds.y + 15,
          },
          z_index: document.elements.length + duplicates.length + 1,
        });
      }
    });

    setDocument({ ...document, elements: [...document.elements, ...duplicates] }, true);
    set({ selectedElementIds: duplicates.map((d) => d.id) });
  },

  toggleElementLock: (id) => {
    const { document, updateElement } = get();
    const el = document?.elements.find((e) => e.id === id);
    if (el) updateElement(id, { locked: !el.locked });
  },

  toggleElementVisibility: (id) => {
    const { document, updateElement } = get();
    const el = document?.elements.find((e) => e.id === id);
    if (el) updateElement(id, { visible: !el.visible });
  },

  bringForward: (id) => {
    const { document, setDocument } = get();
    if (!document) return;
    const idx = document.elements.findIndex((e) => e.id === id);
    if (idx < document.elements.length - 1) {
      const items = [...document.elements];
      const temp = items[idx];
      items[idx] = items[idx + 1];
      items[idx + 1] = temp;
      items.forEach((it, i) => (it.z_index = i + 1));
      setDocument({ ...document, elements: items }, true);
    }
  },

  sendBackward: (id) => {
    const { document, setDocument } = get();
    if (!document) return;
    const idx = document.elements.findIndex((e) => e.id === id);
    if (idx > 0) {
      const items = [...document.elements];
      const temp = items[idx];
      items[idx] = items[idx - 1];
      items[idx - 1] = temp;
      items.forEach((it, i) => (it.z_index = i + 1));
      setDocument({ ...document, elements: items }, true);
    }
  },

  setSourceReferenceVisibility: (visible) => {
    set((state) => ({
      sourceReference: { ...state.sourceReference, visible },
    }));
  },

  setSourceReferenceOpacity: (opacity) => {
    set((state) => ({
      sourceReference: { ...state.sourceReference, opacity },
    }));
  },

  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.2), 3) }),
  setPan: (pan) => set({ pan }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleSnap: () => set((state) => ({ snapToGrid: !state.snapToGrid })),

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      set({
        document: JSON.parse(JSON.stringify(history[prevIndex])),
        historyIndex: prevIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      set({
        document: JSON.parse(JSON.stringify(history[nextIndex])),
        historyIndex: nextIndex,
      });
    }
  },
}));
