import React from 'react';
import { Eye, EyeOff, Lock, Unlock, ArrowUp, ArrowDown, Trash2, Layers } from 'lucide-react';
import { useStudioStore } from '../../../store/useStudioStore';

export const LayersTab: React.FC = () => {
  const {
    document,
    selectedElementIds,
    selectElement,
    toggleElementLock,
    toggleElementVisibility,
    bringForward,
    sendBackward,
    deleteSelectedElements,
  } = useStudioStore();

  const elements = document?.elements || [];

  return (
    <div className="p-4 space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Objets &amp; Calques</h4>
          <p className="text-slate-400 text-[11px]">{elements.length} éléments</p>
        </div>
        {selectedElementIds.length > 0 && (
          <button
            onClick={deleteSelectedElements}
            className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Supprimer
          </button>
        )}
      </div>

      <div className="space-y-1.5 divide-y divide-slate-100">
        {[...elements].reverse().map((el) => {
          const isSelected = selectedElementIds.includes(el.id);
          return (
            <div
              key={el.id}
              onClick={() => selectElement(el.id)}
              className={`pt-1.5 p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                isSelected ? 'bg-sky-100 text-sky-900 border border-sky-300' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[11px] font-bold">
                  {el.field_binding || el.semantic_type || el.type}
                </span>
                <span className="text-[10px] text-slate-400">({el.type})</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleElementVisibility(el.id);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title={el.visible ? 'Masquer' : 'Afficher'}
                >
                  {el.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleElementLock(el.id);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title={el.locked ? 'Déverrouiller' : 'Verrouiller'}
                >
                  {el.locked ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Unlock className="w-3.5 h-3.5 text-slate-300" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    bringForward(el.id);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title="Monter"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendBackward(el.id);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title="Descendre"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
