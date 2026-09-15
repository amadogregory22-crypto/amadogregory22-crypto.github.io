import React from 'react';
import { useStudioStore } from '../../../store/useStudioStore';

export const FormatTab: React.FC = () => {
  const { document, updateDocumentDimensions } = useStudioStore();
  const width = document?.width || 500;
  const height = document?.height || 180;

  return (
    <div className="p-4 space-y-4 text-xs">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Format &amp; Dimensions</h4>
        <p className="text-slate-400 text-[11px]">Dimensions de la zone de signature.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Largeur (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => updateDocumentDimensions(Number(e.target.value), height)}
            className="w-full px-3 py-1.5 rounded border border-slate-300 font-medium"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Hauteur (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => updateDocumentDimensions(width, Number(e.target.value))}
            className="w-full px-3 py-1.5 rounded border border-slate-300 font-medium"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 space-y-2">
        <span className="block font-semibold text-slate-700">Préréglages de taille standard :</span>
        <div className="flex gap-2">
          <button
            onClick={() => updateDocumentDimensions(500, 180)}
            className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-50 rounded text-center font-medium"
          >
            Compact (500x180)
          </button>
          <button
            onClick={() => updateDocumentDimensions(550, 220)}
            className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-50 rounded text-center font-medium"
          >
            Standard (550x220)
          </button>
        </div>
      </div>
    </div>
  );
};
