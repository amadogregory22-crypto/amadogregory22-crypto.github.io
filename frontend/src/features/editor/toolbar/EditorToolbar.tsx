import React from 'react';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Grid,
  Magnet,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Copy,
  Trash2,
  Save,
} from 'lucide-react';
import { useStudioStore } from '../../../store/useStudioStore';
import { api } from '../../../services/api';

export const EditorToolbar: React.FC = () => {
  const {
    document,
    sourceReference,
    zoom,
    showGrid,
    snapToGrid,
    selectedElementIds,
    undo,
    redo,
    setZoom,
    setPan,
    toggleGrid,
    toggleSnap,
    setSourceReferenceVisibility,
    setSourceReferenceOpacity,
    duplicateSelectedElements,
    deleteSelectedElements,
    setStep,
  } = useStudioStore();

  const handleSave = async () => {
    if (!document) return;
    try {
      await api.saveDocument(document);
      alert('Document sauvegardé avec succès !');
    } catch (err: any) {
      alert(`Erreur de sauvegarde: ${err.message}`);
    }
  };

  return (
    <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-10 select-none">
      {/* Left controls: History & Selection Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-30 cursor-pointer"
          title="Annuler (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-30 cursor-pointer"
          title="Rétablir (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button
          onClick={duplicateSelectedElements}
          disabled={selectedElementIds.length === 0}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-700 disabled:opacity-30 cursor-pointer"
          title="Dupliquer la sélection"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={deleteSelectedElements}
          disabled={selectedElementIds.length === 0}
          className="p-1.5 rounded hover:bg-rose-50 text-rose-600 disabled:opacity-30 cursor-pointer"
          title="Supprimer la sélection"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Center controls: Zoom, Pan, Grid, Snap & Source Reference */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => setZoom(zoom - 0.1)}
            className="p-1 text-slate-600 hover:text-slate-900"
            title="Zoom arrière"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-2 text-slate-700 font-semibold min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(zoom + 0.1)}
            className="p-1 text-slate-600 hover:text-slate-900"
            title="Zoom avant"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1 text-slate-600 hover:text-slate-900 ml-1 border-l border-slate-200"
            title="Réinitialiser vue 100%"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button
          onClick={toggleGrid}
          className={`p-1.5 rounded border text-xs flex items-center gap-1 ${
            showGrid ? 'bg-sky-50 border-sky-300 text-sky-700' : 'border-slate-200 text-slate-600'
          }`}
          title="Afficher/Masquer la grille"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        {/* Source Reference Toggle (Reference ghost overlay at 25% opacity, NEVER exported!) */}
        {sourceReference.imageUrl && (
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
            <button
              onClick={() => setSourceReferenceVisibility(!sourceReference.visible)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-sky-700"
              title="Afficher l'image source originale en filigrane pour alignement"
            >
              {sourceReference.visible ? (
                <Eye className="w-3.5 h-3.5 text-sky-600" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>Calque Source Ref (25%)</span>
            </button>
          </div>
        )}
      </div>

      {/* Right controls: Save & Go to Preview */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Save className="w-3.5 h-3.5" /> Sauvegarder
        </button>
        <button
          onClick={() => setStep('preview')}
          className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
        >
          Vérifier &amp; Aperçus
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
