import React, { useEffect, useRef } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { LogoItem } from '../../types/signature';
import { Eye, EyeOff, Image as ImageIcon, Upload } from 'lucide-react';

export const LogosPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { logos, visibility } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusUpload = (event: Event) => {
      if ((event as CustomEvent<{ target?: string }>).detail?.target !== 'signature-logo-upload') return;
      window.setTimeout(() => document.getElementById('signature-logo-upload')?.focus(), 0);
    };
    window.addEventListener('ragt:focus-control', focusUpload);
    return () => window.removeEventListener('ragt:focus-control', focusUpload);
  }, []);

  const updateLogo = (patch: Partial<LogoItem>) => {
    updateState((prev) => ({
      ...prev,
      logos: { ...prev.logos, primary: { ...prev.logos.primary, ...patch } },
      visibility: { ...prev.visibility, logo: true }
    }));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Choisissez une image de moins de 2 Mo.', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      if (!url) return;
      const name = file.name.replace(/\.[^/.]+$/, '');
      const image = new Image();
      image.onload = () => {
        const width = Math.min(160, image.naturalWidth || 95);
        updateLogo({
          url,
          alt: name,
          width,
          height: Math.max(24, Math.round(width / Math.max(1, image.naturalWidth / image.naturalHeight)))
        });
        showToast('Logo importé et appliqué avec succès.', 'success');
      };
      image.src = url;
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-4 p-4 text-slate-800 dark:text-slate-200">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleUpload}
        className="hidden"
      />

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
              <ImageIcon className="h-4 w-4 text-[#F7BD00]" /> Logo institutionnel
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Choisissez ou importez le logo officiel qui apparaît dans la signature.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              updateState((prev) => ({
                ...prev,
                visibility: { ...prev.visibility, logo: !prev.visibility.logo }
              }))
            }
            className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold dark:border-slate-600 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {visibility.logo ? (
              <>
                <Eye className="h-3.5 w-3.5 text-emerald-600" /> Affiché
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5 text-slate-400" /> Masqué
              </>
            )}
          </button>
        </div>

        {/* Aperçu du logo actuel */}
        <div className="mb-3 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
          {logos.primary.url ? (
            <img
              src={logos.primary.url}
              alt={logos.primary.alt || 'Logo signature'}
              className="max-h-20 max-w-full object-contain"
              style={{ width: logos.primary.width }}
            />
          ) : (
            <span className="text-xs text-slate-500">Aucun logo choisi</span>
          )}
        </div>

        {/* Actions Importer / Rétablir */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="signature-logo-upload"
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0C3866] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#092a4d] transition-colors"
          >
            <Upload className="h-3.5 w-3.5 text-[#F7BD00]" /> Importer un logo
          </button>
          <button
            type="button"
            onClick={() => {
              updateLogo({
                url: '/assets/logos/logo_ragt.png',
                alt: 'Logo Officiel RAGT (Emblème)',
                width: 95,
                height: 100
              });
              showToast('Logo officiel RAGT rétabli.', 'success');
            }}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#0C3866] hover:bg-slate-50 dark:border-slate-600 dark:text-amber-400 dark:hover:bg-slate-700/50 transition-colors"
          >
            Rétablir RAGT
          </button>
        </div>

        {/* Logo Officiel RAGT (Emblème) */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => {
              updateLogo({
                url: '/assets/logos/logo_ragt.png',
                alt: 'Logo Officiel RAGT (Emblème)',
                width: 95,
                height: 100
              });
              showToast('Logo Officiel RAGT (Emblème) appliqué.', 'success');
            }}
            className={`w-full rounded-lg border p-2.5 text-left transition-colors flex items-center gap-3 ${
              logos.primary.url === '/assets/logos/logo_ragt.png'
                ? 'border-[#0C3866] ring-2 ring-[#0C3866]/20 bg-amber-50/40 dark:bg-slate-700/60 dark:border-amber-400'
                : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-600'
            }`}
          >
            <div className="w-14 h-14 shrink-0 bg-white rounded p-1 border border-slate-100 dark:border-slate-600 flex items-center justify-center">
              <img
                src="/assets/logos/logo_ragt.png"
                alt="Logo Officiel RAGT"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                Logo Officiel RAGT (Emblème)
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Format carré officiel haute résolution
              </span>
            </div>
          </button>
        </div>

        {/* Dimensions et Lien au clic */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 dark:border-slate-700">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Largeur
              </label>
              <span className="text-[11px] font-bold text-[#0C3866] dark:text-amber-400">
                {logos.primary.width} px
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="200"
              value={logos.primary.width}
              onChange={(e) => updateLogo({ width: Number(e.target.value) || 40 })}
              className="w-full accent-[#0C3866] dark:accent-amber-400"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Lien au clic
            </label>
            <input
              value={logos.primary.linkUrl || ''}
              onChange={(e) => updateLogo({ linkUrl: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              placeholder="https://www.ragt-semences.fr"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
