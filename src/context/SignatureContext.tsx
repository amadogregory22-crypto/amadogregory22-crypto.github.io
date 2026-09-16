import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  SignatureState,
  PreviewEnv
} from '../types/signature';
import { DEFAULT_SIGNATURE_STATE, SIGNATURE_PRESETS, APP_VERSION } from '../constants/presets';
import { COMMUNICATION_SIGNATURES, isCommunicationSignatureUrl } from '../constants/logos';
import { generateQrDataUrl } from '../utils/qrGenerator';
import { composePreconfiguredCard } from '../utils/composePreconfiguredCard';
import { generateEmailHTML, generateAllIconPngs } from '../utils/htmlGenerator';
import { validateSignature, SignatureDiagnostic } from '../utils/validator';
import { createSignatureExport, normalizeSignatureConfig } from '../utils/signatureConfig';
import {
  createSavedRevision,
  findSavedRevision,
  normalizeSavedRevisions,
  prependSavedRevision,
  SavedRevision
} from '../utils/revisionStore';

export type ActiveTab =
  | 'home'     // Accueil & brief
  | 'structure' // Disposition de la signature
  | 'template' // 1. Gabarit & Modèles
  | 'versions' // Versions & sauvegardes
  | 'contact'  // 2. Identité & Contact
  | 'media'    // 3. Médias & Visuels
  | 'style'    // 4. Style & Charte
  | 'export'   // 5. Contrôle & Diffusion
  // Rétrocompatibilité :
  | 'layout'
  | 'design'
  | 'info'
  | 'logos'
  | 'qr'
  | 'social'
  | 'banner'
  | 'verify'
  | 'templates'
  | 'badges'
  | 'copy';

export type AppMode = 'studio' | 'user';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type { SavedRevision } from '../utils/revisionStore';

interface SignatureContextType {
  state: SignatureState;
  updateState: (updater: (prev: SignatureState) => SignatureState) => void;
  setPartialState: (partial: Partial<SignatureState> | Record<string, unknown>) => void;
  resetState: () => void;
  applyPreset: (presetId: string) => void;
  exportConfigJson: () => void;
  importConfigJson: (file: File) => Promise<boolean>;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  history: SignatureState[];
  historyIndex: number;
  revertToHistoryIndex: (index: number) => void;

  // Revisions
  savedRevisions: SavedRevision[];
  saveRevision: (name?: string) => void;
  restoreRevision: (id: string) => void;
  deleteRevision: (id: string) => void;

  // View Controls
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab, subTab?: string) => void;
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  previewEnv: PreviewEnv;
  setPreviewEnv: (env: PreviewEnv) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  simulateBlockedImages: boolean;
  setSimulateBlockedImages: (blocked: boolean) => void;

  // Template Overlay / Reference
  referenceOverlay: {
    enabled: boolean;
    imageUrl: string;
    opacity: number;
  };
  setReferenceOverlay: React.Dispatch<React.SetStateAction<{
    enabled: boolean;
    imageUrl: string;
    opacity: number;
  }>>;

  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;

  // Real-time computed outputs
  qrDataUrl: string;
  rawHtml: string;
  diagnostic: SignatureDiagnostic;

  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

const STORAGE_KEY = 'ragt_signature_v3_data';
const REVISIONS_STORAGE_KEY = 'ragt_signature_v3_revisions';

export const SignatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or default
  const [state, setState] = useState<SignatureState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If a communication full signature was erroneously assigned as the isolated primary logo, restore official RAGT logo
        if (parsed.logos?.primary?.url && isCommunicationSignatureUrl(parsed.logos.primary.url)) {
          parsed.logos.primary = {
            ...parsed.logos.primary,
            id: 'ragt-new-logo',
            label: 'Logo Officiel RAGT (Emblème)',
            url: '/assets/uploads/logo_ragt.png',
            alt: 'Logo Officiel RAGT Semences',
            width: 95,
            height: 100
          };
        }
        // Correct squashed 150x46 dimensions for the square RAGT logo
        if (parsed.logos?.primary?.url === '/assets/uploads/logo_ragt.png' && parsed.logos.primary.width === 150 && parsed.logos.primary.height === 46) {
          parsed.logos.primary.width = 95;
          parsed.logos.primary.height = 100;
        }

        return normalizeSignatureConfig(parsed) || DEFAULT_SIGNATURE_STATE;
      }
    } catch (e) {
      console.warn('Impossible de charger la sauvegarde locale', e);
    }
    return DEFAULT_SIGNATURE_STATE;
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<SignatureState[]>([state]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoAction = useRef(false);
  const [savedRevisions, setSavedRevisions] = useState<SavedRevision[]>(() => {
    try {
      const saved = localStorage.getItem(REVISIONS_STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return normalizeSavedRevisions(parsed);
    } catch {
      return [];
    }
  });

  // App & View states
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [activeSubTab, setActiveSubTabState] = useState<string>('brief');

  const setActiveTab = React.useCallback((tab: ActiveTab, subTab?: string) => {
    let target = tab;
    let targetSub = subTab;

    if (tab === 'home') {
      target = 'home';
      if (!targetSub) targetSub = 'brief';
    } else if (tab === 'structure' || tab === 'layout') {
      target = 'structure';
      if (!targetSub) targetSub = 'layout';
    } else if (tab === 'versions') {
      target = 'versions';
      if (!targetSub) targetSub = 'storage';
    } else if (tab === 'template' || tab === 'templates') {
      target = 'structure';
      if (!targetSub) targetSub = 'layout';
    } else if (tab === 'contact' || tab === 'info' || tab === 'social' || tab === 'qr') {
      target = 'contact';
      if (!targetSub) targetSub = tab === 'social' ? 'social' : tab === 'qr' ? 'qr' : 'info';
    } else if (tab === 'media' || tab === 'logos' || tab === 'banner' || tab === 'badges') {
      target = 'media';
      if (!targetSub) targetSub = tab === 'banner' ? 'banner' : tab === 'badges' ? 'badges' : 'logos';
    } else if (tab === 'style' || tab === 'design') {
      target = 'style';
      if (!targetSub) targetSub = 'design';
    } else if (tab === 'export' || tab === 'verify' || tab === 'copy') {
      target = 'export';
      if (!targetSub) targetSub = tab === 'copy' ? 'copy' : 'verify';
    }

    setActiveTabState(target);
    if (targetSub) {
      setActiveSubTabState(targetSub);
    }
  }, []);

  const setActiveSubTab = React.useCallback((subTab: string) => {
    setActiveSubTabState(subTab);
  }, []);
  const [appMode, setAppMode] = useState<AppMode>('studio');
  const [previewEnv, setPreviewEnv] = useState<PreviewEnv>('light');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [simulateBlockedImages, setSimulateBlockedImages] = useState<boolean>(false);

  // Overlay reference model
  const [referenceOverlay, setReferenceOverlay] = useState<{
    enabled: boolean;
    imageUrl: string;
    opacity: number;
  }>({
    enabled: false,
    imageUrl: '',
    opacity: 0.3
  });

  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('ragt_studio_theme');
      if (savedTheme) return savedTheme === 'dark';
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const setIsDarkMode = useCallback((dark: boolean) => {
    setIsDarkModeState(dark);
    try {
      localStorage.setItem('ragt_studio_theme', dark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Could not save theme preference', e);
    }
  }, []);

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Generated assets
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [iconCache, setIconCache] = useState<Record<string, string>>({});
  const [rawHtml, setRawHtml] = useState<string>('');
  const [diagnostic, setDiagnostic] = useState<SignatureDiagnostic>({ items: [], scorePercent: 100, htmlSizeKb: 0, imagesCount: 0, linksCount: 0, clientScores: [], summary: { errorsCount: 0, warningsCount: 0, okCount: 0 } });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const persistRevisions = useCallback((revisions: SavedRevision[]) => {
    try {
      localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(revisions));
      return true;
    } catch (error) {
      console.error('Impossible d’enregistrer les révisions', error);
      showToast('Les révisions ne peuvent pas être enregistrées sur cet appareil.', 'error');
      return false;
    }
  }, [showToast]);

  // Sync state changes with localStorage and history
  const updateState = useCallback((updater: (prev: SignatureState) => SignatureState) => {
    setState((prev) => {
      let next = updater(prev);

      // Auto-guard: if a communication full signature was accidentally assigned to logos.primary, restore official RAGT emblem
      if (next.logos?.primary?.url && isCommunicationSignatureUrl(next.logos.primary.url)) {
        next = {
          ...next,
          logos: {
            ...next.logos,
            primary: {
              ...next.logos.primary,
              id: 'ragt-new-logo',
              label: 'Logo Officiel RAGT (Emblème)',
              url: '/assets/uploads/logo_ragt.png',
              alt: 'Logo Officiel RAGT Semences',
              width: 95,
              height: 100
            }
          }
        };
      }

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      // Append to history if not undo/redo
      if (!isUndoRedoAction.current) {
        setHistory((prevHist) => {
          const sliced = prevHist.slice(0, historyIndex + 1);
          if (sliced.length >= 25) sliced.shift();
          return [...sliced, next];
        });
        setHistoryIndex((prevIdx) => Math.min(prevIdx + 1, 24));
      }
      isUndoRedoAction.current = false;
      return next;
    });
  }, [historyIndex]);

  // A preconfigured card is a composed image. Regenerate it after a contact or QR change
  // so the canvas always reflects the fields edited in the application.
  const cardComposeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (state.renderMode !== 'flattened-card') return;

    const templateUrl = state.cardTemplateUrl
      || COMMUNICATION_SIGNATURES.find((card) => state.presetName?.includes(card.name))?.url;
    if (!templateUrl) return;

    if (cardComposeTimerRef.current) clearTimeout(cardComposeTimerRef.current);
    let cancelled = false;
    cardComposeTimerRef.current = setTimeout(() => {
      composePreconfiguredCard(state, templateUrl)
        .then((imageUrl) => {
          if (cancelled) return;
          setState((previous) => {
            if (previous.renderMode !== 'flattened-card') return previous;
            const next = {
              ...previous,
              cardTemplateUrl: templateUrl,
              banner: {
                ...previous.banner,
                imageUrl,
                altText: `Carte personnalisée ${previous.presetName.replace(/ \(avec ma signature\)$/, '')}`
              }
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch (error) {
              console.error('Impossible de mettre à jour la carte préconfigurée', error);
            }
            return next;
          });
        })
        .catch((error) => console.error('Impossible de recalculer la carte préconfigurée', error));
    }, 250);

    return () => {
      cancelled = true;
      if (cardComposeTimerRef.current) clearTimeout(cardComposeTimerRef.current);
    };
  }, [state.personal, state.qr, state.renderMode, state.cardTemplateUrl, state.presetName]);

  const setPartialState = useCallback((partial: Partial<SignatureState> | Record<string, unknown>) => {
    updateState((prev) => ({
      ...prev,
      ...partial
    }));
  }, [updateState]);

  // Undo / Redo implementations
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetState = history[historyIndex - 1];
      setHistoryIndex((prev) => prev - 1);
      setState(targetState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targetState));
      showToast('Action annulée', 'info');
    }
  }, [history, historyIndex, showToast]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetState = history[historyIndex + 1];
      setHistoryIndex((prev) => prev + 1);
      setState(targetState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targetState));
      showToast('Action rétablie', 'info');
    }
  }, [history, historyIndex, showToast]);

  const revertToHistoryIndex = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      isUndoRedoAction.current = true;
      const targetState = history[index];
      setHistoryIndex(index);
      setState(targetState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(targetState));
      showToast('Version restaurée', 'success');
    }
  }, [history, showToast]);

  const saveRevision = useCallback((name?: string) => {
    const timestamp = Date.now();
    const revision = createSavedRevision(
      state,
      name || `Révision ${new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
      timestamp
    );
    setSavedRevisions(prev => {
      const next = prependSavedRevision(prev, revision);
      if (persistRevisions(next)) showToast('Révision sauvegardée sur cet appareil', 'success');
      return next;
    });
  }, [state, persistRevisions, showToast]);

  const restoreRevision = useCallback((id: string) => {
    const rev = findSavedRevision(savedRevisions, id);
    if (rev) {
      isUndoRedoAction.current = true;
      setState(rev.state);
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        return [...newHistory, rev.state];
      });
      setHistoryIndex(prev => prev + 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rev.state));
      showToast(`Révision "${rev.name}" restaurée`, 'success');
    }
  }, [savedRevisions, historyIndex, showToast]);

  const deleteRevision = useCallback((id: string) => {
    setSavedRevisions(prev => {
      const next = prev.filter(r => r.id !== id);
      persistRevisions(next);
      return next;
    });
  }, [persistRevisions]);

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+1..9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo / Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      
      // Tab switching (Ctrl+1 à Ctrl+5 pour les 5 grands pôles)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          setActiveTab('structure');
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveTab('contact');
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveTab('media');
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveTab('style');
        } else if (e.key === '5') {
          e.preventDefault();
          setActiveTab('export');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setActiveTab]);

  // Sanitize any existing legacy corrupted state in localStorage on mount
  useEffect(() => {
    if (state.logos?.primary?.url && isCommunicationSignatureUrl(state.logos.primary.url)) {
      updateState((prev) => ({
        ...prev,
        logos: {
          ...prev.logos,
          primary: {
            ...prev.logos.primary,
            id: 'ragt-new-logo',
            label: 'Logo Officiel RAGT (Emblème)',
            url: '/assets/uploads/logo_ragt.png',
            alt: 'Logo Officiel RAGT Semences',
            width: 95,
            height: 100
          }
        }
      }));
    }
  }, []);

  // Repair drafts created by the first version of the card-model importer.
  // A visual model may add an image but must never hide editable features.
  useEffect(() => {
    if (!state.presetName.startsWith('Modèle importé —')) return;
    updateState((prev) => ({
      ...prev,
      presetName: prev.presetName.replace('Modèle importé —', 'Carte importée —'),
      qr: { ...prev.qr, visible: true },
      visibility: { ...prev.visibility, logo: true, banner: true, socials: true, qr: true }
    }));
  }, []);

  // Generate QR Code and Icons dynamically
  useEffect(() => {
    let isCancelled = false;
    
    // Generate QR
    generateQrDataUrl(state).then((url) => {
      if (!isCancelled) {
        setQrDataUrl(url);
      }
    });

    // Generate PNG Icons (resolves Outlook SVG blocking)
    generateAllIconPngs(state).then((cache) => {
      if (!isCancelled) {
        setIconCache(cache);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [state]);

  // Compute HTML when state, QR or Icons change
  useEffect(() => {
    const newHtml = generateEmailHTML(state, qrDataUrl, iconCache);
    setRawHtml(newHtml);
    setDiagnostic(validateSignature(state, newHtml));
  }, [state, qrDataUrl, iconCache]);

  // Reset to default RAGT corporate template
  const resetState = useCallback(() => {
    const timestamp = Date.now();
    const recoveryRevision = createSavedRevision(state, 'Avant réinitialisation', timestamp, `before-reset-${timestamp}`);
    setSavedRevisions(prev => {
      const next = prependSavedRevision(prev, recoveryRevision);
      persistRevisions(next);
      return next;
    });
    setState(DEFAULT_SIGNATURE_STATE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SIGNATURE_STATE));
    setHistory([state, DEFAULT_SIGNATURE_STATE]);
    setHistoryIndex(1);
    showToast('Signature réinitialisée. La version précédente est disponible dans les révisions.', 'info');
  }, [persistRevisions, showToast, state]);

  // Preset switching
  const applyPreset = useCallback((presetId: string) => {
    const preset = SIGNATURE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    updateState((prev) => ({
      ...preset.apply(prev),
      renderMode: 'standard',
      cardTemplateUrl: undefined
    }));
    showToast(`Modèle « ${preset.name} » appliqué`, 'success');
  }, [updateState, showToast]);

  // Export config as JSON file
  const exportConfigJson = useCallback(() => {
    const exportData = createSignatureExport(state);
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `modele-signature-ragt-${(state.presetName || 'officiel').toLowerCase().replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exportée au format JSON', 'success');
  }, [state, showToast]);

  // Import config from JSON file
  const importConfigJson = useCallback(async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const importedConfig = normalizeSignatureConfig(parsed);
      if (!importedConfig) {
        throw new Error('Fichier JSON incompatible ou corrompu');
      }
      updateState(() => importedConfig);
      showToast('Configuration importée et appliquée avec succès !', 'success');
      return true;
    } catch (err) {
      console.error('Erreur import JSON:', err);
      showToast('Impossible d’importer ce fichier. Vérifiez le format JSON.', 'error');
      return false;
    }
  }, [updateState, showToast]);

  return (
    <SignatureContext.Provider
      value={{
        state,
        updateState,
        setPartialState,
        resetState,
        applyPreset,
        exportConfigJson,
        importConfigJson,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        history,
        historyIndex,
        revertToHistoryIndex,
        savedRevisions,
        saveRevision,
        restoreRevision,
        deleteRevision,
        activeTab,
        setActiveTab,
        activeSubTab,
        setActiveSubTab,
        appMode,
        setAppMode,
        previewEnv,
        setPreviewEnv,
        zoomLevel,
        setZoomLevel,
        simulateBlockedImages,
        setSimulateBlockedImages,
        referenceOverlay,
        setReferenceOverlay,
        isDarkMode,
        setIsDarkMode,
        qrDataUrl,
        rawHtml,
        diagnostic,
        toasts,
        showToast
      }}
    >
      {children}
    </SignatureContext.Provider>
  );
};

export const useSignature = (): SignatureContextType => {
  const context = useContext(SignatureContext);
  if (!context) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }
  return context;
};
