import React from 'react';
import { useStudioStore } from '../../../store/useStudioStore';

export const ColorsTab: React.FC = () => {
  const { document, updateTheme, analysis } = useStudioStore();
  const theme = document?.theme || {
    primary_color: '#005596',
    secondary_color: '#7C878E',
    text_color: '#222222',
    background_color: '#FFFFFF',
    font_family: 'Segoe UI, Arial, sans-serif',
  };

  const dominantColors = analysis?.dominant_colors || ['#005596', '#7C878E', '#222222', '#FFFFFF'];

  return (
    <div className="p-4 space-y-5 text-xs">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Charte Graphique &amp; Couleurs</h4>
        <p className="text-slate-400 text-[11px]">Définissez les teintes principales appliquées à la signature.</p>
      </div>

      {/* Extracted Colors Palette */}
      {dominantColors.length > 0 && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="block font-semibold text-slate-700 mb-2">Palette extraite de la source</span>
          <div className="flex gap-2">
            {dominantColors.map((color, i) => (
              <button
                key={i}
                onClick={() => updateTheme({ primary_color: color })}
                style={{ backgroundColor: color }}
                className="w-8 h-8 rounded-full border border-slate-300 shadow-xs cursor-pointer hover:scale-110 transition-transform"
                title={`Appliquer ${color} comme couleur principale`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Couleur Principale (Titres &amp; Accents)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.primary_color}
              onChange={(e) => updateTheme({ primary_color: e.target.value })}
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.primary_color}
              onChange={(e) => updateTheme({ primary_color: e.target.value })}
              className="w-24 px-2 py-1 rounded border border-slate-300 font-mono text-xs uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Couleur Secondaire</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.secondary_color}
              onChange={(e) => updateTheme({ secondary_color: e.target.value })}
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.secondary_color}
              onChange={(e) => updateTheme({ secondary_color: e.target.value })}
              className="w-24 px-2 py-1 rounded border border-slate-300 font-mono text-xs uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Couleur du texte standard</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={theme.text_color}
              onChange={(e) => updateTheme({ text_color: e.target.value })}
              className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.text_color}
              onChange={(e) => updateTheme({ text_color: e.target.value })}
              className="w-24 px-2 py-1 rounded border border-slate-300 font-mono text-xs uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Police typographique</label>
          <select
            value={theme.font_family}
            onChange={(e) => updateTheme({ font_family: e.target.value })}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
          >
            <option value="Segoe UI, Helvetica, Arial, sans-serif">Segoe UI (Recommandé Outlook)</option>
            <option value="Arial, Helvetica, sans-serif">Arial</option>
            <option value="'Calibri', sans-serif">Calibri</option>
            <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
            <option value="'Tahoma', sans-serif">Tahoma</option>
            <option value="'Georgia', serif">Georgia</option>
          </select>
        </div>
      </div>
    </div>
  );
};
