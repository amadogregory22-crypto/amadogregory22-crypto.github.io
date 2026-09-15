import { create } from 'zustand';
import { CandidateComponent, ComponentStatus, SemanticType, BoundingBox } from '../types';

interface ReviewState {
  candidates: CandidateComponent[];
  selectedCandidateId: string | null;
  filter: 'all' | 'uncertain_only' | 'confirmed_only';
  
  // Actions
  setCandidates: (candidates: CandidateComponent[]) => void;
  selectCandidate: (id: string | null) => void;
  setFilter: (filter: 'all' | 'uncertain_only' | 'confirmed_only') => void;
  
  updateCandidateStatus: (id: string, status: ComponentStatus) => void;
  updateCandidateSemanticType: (id: string, semanticType: SemanticType) => void;
  updateCandidateValue: (id: string, value: string) => void;
  updateCandidateBounds: (id: string, bounds: BoundingBox) => void;
  
  confirmAllReliable: (threshold?: number) => void;
  addManualCandidate: (bounds: BoundingBox, semanticType: SemanticType, value: string) => void;
  removeCandidate: (id: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  candidates: [],
  selectedCandidateId: null,
  filter: 'all',

  setCandidates: (candidates) => set({ candidates, selectedCandidateId: null }),
  selectCandidate: (id) => set({ selectedCandidateId: id }),
  setFilter: (filter) => set({ filter }),

  updateCandidateStatus: (id, status) => {
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, status } : c)),
    }));
  },

  updateCandidateSemanticType: (id, semanticType) => {
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, semantic_type: semanticType } : c)),
    }));
  },

  updateCandidateValue: (id, value) => {
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, value } : c)),
    }));
  },

  updateCandidateBounds: (id, bounds) => {
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, bounds } : c)),
    }));
  },

  confirmAllReliable: (threshold = 0.85) => {
    set((state) => ({
      candidates: state.candidates.map((c) => {
        if (c.confidence >= threshold && c.status !== 'rejected') {
          return { ...c, status: 'confirmed' };
        }
        return c;
      }),
    }));
  },

  addManualCandidate: (bounds, semanticType, value) => {
    const newCandidate: CandidateComponent = {
      id: `manual-${Date.now()}`,
      type: 'text',
      semantic_type: semanticType,
      value,
      bounds,
      confidence: 1.0,
      status: 'confirmed',
      source_engine: 'manual',
      metadata: {},
    };
    set((state) => ({
      candidates: [...state.candidates, newCandidate],
      selectedCandidateId: newCandidate.id,
    }));
  },

  removeCandidate: (id) => {
    set((state) => ({
      candidates: state.candidates.filter((c) => c.id !== id),
      selectedCandidateId: state.selectedCandidateId === id ? null : state.selectedCandidateId,
    }));
  },
}));
