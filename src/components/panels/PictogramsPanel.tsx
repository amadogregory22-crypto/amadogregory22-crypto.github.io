import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { getContactIconDataUrl } from '../../utils/htmlGenerator';
import { Palette } from 'lucide-react';

export const PictogramsPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { iconSettings, design } = state;

  const styleOptions = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'outline', label: 'Contour' },
    { id: 'filled', label: 'Plein' },
    { id: 'circle', label: 'Rond' },
    { id: 'square', label: 'Carré' }
  ] as const;

  const quickColors = [
    { label: 'Bleu RAGT', value: '#0C3866' },
    { label: 'Or RAGT', value: '#F7BD00' },
    { label: 'Gris Ardoise', value: '#334155' },
    { label: 'Vert Durable', value: '#15803D' },
    { label: 'Blanc', value: '#FFFFFF' }
  ];

  const handleStyleChange = (style: typeof styleOptions[number]['id']) => {
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, style }
    }));
    showToast(`Style pictogrammes « ${style} » appliqué`, 'info');
  };

  const handleColorChange = (color: string) => {
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, color },
      design: {
        ...prev.design,
        colors: {
          ...prev.design.colors,
          icons: color
        }
      }
    }));
  };

  const handleSizeChange = (size: number) => {
    const clamped = Math.min(28, Math.max(10, size));
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, size: clamped }
    }));
  };

  const effectiveColor = design.colors.icons || iconSettings.color || '#0C3866';

  return (
    <div className="space-y-4 p-4 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
          <Palette className="h-4 w-4 text-[#F7BD00]" /> Pictogrammes
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Personnalisez la forme, la taille et la couleur des pictogrammes de contact.
        </p>
      </div>

      {/* Style selector card */}
      <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 block mb-2">
          Style des pictogrammes :
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleStyleChange(style.id)}
              className={`rounded-lg border px-1.5 py-2 text-xs font-semibold transition-all ${
                iconSettings.style === style.id
                  ? 'border-[#0C3866] bg-[#0C3866] text-white shadow-xs dark:bg-slate-700 dark:text-amber-300 dark:border-amber-400'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </section>

      {/* Dimensions & Color card */}
      <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Taille
              </label>
              <span className="text-xs font-bold text-[#0C3866] dark:text-amber-400">
                {iconSettings.size} px
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="28"
              value={iconSettings.size}
              onChange={(e) => handleSizeChange(Number(e.target.value) || 16)}
              className="w-full accent-[#0C3866] dark:accent-amber-400"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Couleur
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label="Couleur des pictogrammes"
                value={effectiveColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-200 dark:border-slate-600 p-0.5"
              />
              <input
                type="text"
                value={effectiveColor.toUpperCase()}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full rounded border border-slate-200 px-2 py-1 text-xs uppercase font-mono dark:border-slate-600 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Quick color palettes */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
            Nuances recommandées RAGT :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickColors.map((qc) => (
              <button
                key={qc.value}
                type="button"
                onClick={() => handleColorChange(qc.value)}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] font-medium bg-slate-50 dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
              >
                <span
                  className="h-3 w-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: qc.value }}
                />
                <span className="text-slate-700 dark:text-slate-300">{qc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview of Contact Pictograms */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-2xs dark:border-slate-700 dark:bg-slate-800/60">
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-3 flex items-center justify-between">
          <span>Aperçu des pictogrammes</span>
          <span className="text-[11px] font-normal text-slate-500 lowercase">
            style : {iconSettings.style} ({iconSettings.size}px)
          </span>
        </h4>
        <div className="flex items-center justify-around rounded-lg bg-white dark:bg-slate-900/80 p-3.5 border border-slate-200/80 dark:border-slate-700/80">
          {(['phone', 'mobile', 'email', 'address', 'web'] as const).map((type) => {
            const dataUrl = getContactIconDataUrl(
              type,
              effectiveColor,
              iconSettings.style,
              design.background.color || '#FDC420'
            );
            return (
              <div key={type} className="flex flex-col items-center gap-1.5">
                <div
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: Math.max(28, iconSettings.size + 8),
                    height: Math.max(28, iconSettings.size + 8)
                  }}
                >
                  <img
                    src={dataUrl}
                    alt={type}
                    style={{
                      width: `${iconSettings.size}px`,
                      height: `${iconSettings.size}px`
                    }}
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                  {type === 'phone' ? 'Tél' : type === 'mobile' ? 'Portable' : type === 'email' ? 'Mail' : type === 'address' ? 'Adresse' : 'Web'}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
