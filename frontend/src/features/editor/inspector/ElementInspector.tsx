import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Link as LinkIcon, Trash2, Lock, Eye } from 'lucide-react';
import { useStudioStore } from '../../../store/useStudioStore';
import { DocumentFields } from '../../../types';

const FIELD_BINDINGS: { key: keyof DocumentFields | ''; label: string }[] = [
  { key: '', label: '(Aucune liaison - Texte statique)' },
  { key: 'full_name', label: 'Nom complet' },
  { key: 'job_title', label: 'Fonction' },
  { key: 'company', label: 'Entreprise' },
  { key: 'email', label: 'E-mail' },
  { key: 'mobile', label: 'Téléphone Mobile' },
  { key: 'phone', label: 'Téléphone Fixe' },
  { key: 'website', label: 'Site Web' },
  { key: 'address', label: 'Adresse' },
  { key: 'slogan', label: 'Slogan / Baseline' },
];

export const ElementInspector: React.FC = () => {
  const {
    document,
    selectedElementIds,
    updateElement,
    deleteSelectedElements,
    toggleElementLock,
    toggleElementVisibility,
  } = useStudioStore();

  const selectedElement = document?.elements.find((el) => el.id === selectedElementIds[0]);

  if (!selectedElement) {
    return (
      <div className="p-6 text-center text-slate-400 text-xs">
        <p>Sélectionnez un élément sur le canevas pour modifier ses propriétés graphiques.</p>
      </div>
    );
  }

  const { bounds, style } = selectedElement;

  return (
    <div className="p-4 space-y-4 text-xs divide-y divide-slate-100">
      {/* Header */}
      <div className="pb-3 flex items-center justify-between">
        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Inspecteur d'élément
          </span>
          <p className="text-slate-400 text-[10px] capitalize">Type : {selectedElement.type}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => toggleElementVisibility(selectedElement.id)}
            className="p-1 rounded hover:bg-slate-100 text-slate-500"
            title="Visibilité"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => toggleElementLock(selectedElement.id)}
            className="p-1 rounded hover:bg-slate-100 text-slate-500"
            title="Verrouiller"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={deleteSelectedElements}
            className="p-1 rounded hover:bg-rose-50 text-rose-600"
            title="Supprimer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field Binding - Single source of truth */}
      {selectedElement.type === 'text' && (
        <div className="pt-3 space-y-2">
          <label className="block font-semibold text-slate-700 text-[11px]">
            Liaison de Donnée Métier (fieldBinding)
          </label>
          <select
            value={selectedElement.field_binding || ''}
            onChange={(e) => updateElement(selectedElement.id, { field_binding: e.target.value || undefined })}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-medium"
          >
            {FIELD_BINDINGS.map((fb) => (
              <option key={fb.key} value={fb.key}>
                {fb.label}
              </option>
            ))}
          </select>

          {!selectedElement.field_binding && (
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Contenu statique</label>
              <input
                type="text"
                value={selectedElement.static_content || ''}
                onChange={(e) => updateElement(selectedElement.id, { static_content: e.target.value })}
                className="w-full px-2 py-1 rounded border border-slate-300"
              />
            </div>
          )}
        </div>
      )}

      {/* Position and Dimensions */}
      <div className="pt-3 space-y-2">
        <span className="block font-semibold text-slate-700 text-[11px]">Géométrie</span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400">X (px)</label>
            <input
              type="number"
              value={Math.round(bounds.x)}
              onChange={(e) =>
                updateElement(selectedElement.id, { bounds: { ...bounds, x: Number(e.target.value) } })
              }
              className="w-full px-2 py-1 rounded border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400">Y (px)</label>
            <input
              type="number"
              value={Math.round(bounds.y)}
              onChange={(e) =>
                updateElement(selectedElement.id, { bounds: { ...bounds, y: Number(e.target.value) } })
              }
              className="w-full px-2 py-1 rounded border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400">Largeur (px)</label>
            <input
              type="number"
              value={Math.round(bounds.width)}
              onChange={(e) =>
                updateElement(selectedElement.id, { bounds: { ...bounds, width: Number(e.target.value) } })
              }
              className="w-full px-2 py-1 rounded border border-slate-300 font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400">Hauteur (px)</label>
            <input
              type="number"
              value={Math.round(bounds.height)}
              onChange={(e) =>
                updateElement(selectedElement.id, { bounds: { ...bounds, height: Number(e.target.value) } })
              }
              className="w-full px-2 py-1 rounded border border-slate-300 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Typography and Colors */}
      {selectedElement.type === 'text' && (
        <div className="pt-3 space-y-2">
          <span className="block font-semibold text-slate-700 text-[11px]">Typographie</span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-400">Taille (px)</label>
              <input
                type="number"
                value={style?.font_size || 14}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    style: { ...style, font_size: Number(e.target.value) },
                  })
                }
                className="w-full px-2 py-1 rounded border border-slate-300"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">Couleur</label>
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={style?.color || '#222222'}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      style: { ...style, color: e.target.value },
                    })
                  }
                  className="w-6 h-6 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={style?.color || '#222222'}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      style: { ...style, color: e.target.value },
                    })
                  }
                  className="w-full px-1 py-1 rounded border border-slate-300 font-mono text-[10px] uppercase"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-1 pt-1">
            <button
              onClick={() =>
                updateElement(selectedElement.id, {
                  style: { ...style, text_align: 'left' },
                })
              }
              className={`p-1.5 rounded border ${
                style?.text_align === 'left' ? 'bg-sky-100 border-sky-300 text-sky-800' : 'border-slate-200'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                updateElement(selectedElement.id, {
                  style: { ...style, text_align: 'center' },
                })
              }
              className={`p-1.5 rounded border ${
                style?.text_align === 'center' ? 'bg-sky-100 border-sky-300 text-sky-800' : 'border-slate-200'
              }`}
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                updateElement(selectedElement.id, {
                  style: { ...style, text_align: 'right' },
                })
              }
              className={`p-1.5 rounded border ${
                style?.text_align === 'right' ? 'bg-sky-100 border-sky-300 text-sky-800' : 'border-slate-200'
              }`}
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                updateElement(selectedElement.id, {
                  style: { ...style, font_weight: style?.font_weight === 'bold' ? 'normal' : 'bold' },
                })
              }
              className={`p-1.5 rounded border ${
                style?.font_weight === 'bold' ? 'bg-sky-100 border-sky-300 text-sky-800' : 'border-slate-200'
              }`}
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
