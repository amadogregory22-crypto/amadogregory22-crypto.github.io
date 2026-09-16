import React, { useRef, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { CLASSIFIED_PNG_ASSETS } from '../../constants/assets';
import { LogoItem } from '../../types/signature';
import { FolderHeart, Search, Trash2, Upload } from 'lucide-react';

type GalleryAsset = { id: string; name: string; url: string; source: 'library' | 'upload' };

const LIBRARY_ASSETS: GalleryAsset[] = CLASSIFIED_PNG_ASSETS.map((asset) => ({
  id: asset.id,
  name: asset.name,
  url: asset.url,
  source: 'library'
}));

const saveCustomAssets = (assets: GalleryAsset[]) => {
  localStorage.setItem('ragt_gallery_assets', JSON.stringify(assets.filter((asset) => asset.source !== 'library')));
};

export const LibraryPanel: React.FC = () => {
  const { updateState, showToast } = useSignature();
  const [assets, setAssets] = useState<GalleryAsset[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ragt_gallery_assets') || '[]') as GalleryAsset[];
      return [...saved.map((asset): GalleryAsset => ({ ...asset, source: 'upload' })), ...LIBRARY_ASSETS];
    } catch {
      return LIBRARY_ASSETS;
    }
  });
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateLogo = (patch: Partial<LogoItem>) => {
    updateState((prev) => ({
      ...prev,
      logos: { ...prev.logos, primary: { ...prev.logos.primary, ...patch } },
      visibility: { ...prev.visibility, logo: true }
    }));
  };

  const addAsset = (asset: GalleryAsset) => {
    setAssets((previous) => {
      const next = [asset, ...previous];
      saveCustomAssets(next);
      return next;
    });
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
      const asset: GalleryAsset = { id: `upload-${Date.now()}`, name, url, source: 'upload' };
      addAsset(asset);
      showToast('Visuel ajouté à votre bibliothèque.', 'success');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const removeAsset = (id: string) => {
    setAssets((previous) => {
      const asset = previous.find((entry) => entry.id === id);
      if (!asset || asset.source === 'library') {
        showToast('Les visuels RAGT fournis restent disponibles dans la bibliothèque.', 'info');
        return previous;
      }
      const next = previous.filter((entry) => entry.id !== id);
      saveCustomAssets(next);
      showToast('Visuel retiré de votre bibliothèque.', 'success');
      return next;
    });
  };

  const visibleAssets = assets.filter((asset) => asset.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 p-4 text-slate-800 dark:text-slate-200">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={handleUpload}
        className="hidden"
      />

      <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
        {/* Header with Title & Add button */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
              <FolderHeart className="h-4 w-4 text-[#F7BD00]" /> Ma bibliothèque
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Importez, réutilisez ou retirez vos propres visuels.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1 rounded-lg bg-[#0C3866] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#092a4d] transition-colors"
          >
            <Upload className="h-3.5 w-3.5 text-[#F7BD00]" /> Ajouter
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un visuel..."
            className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
          {visibleAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-lg border border-slate-200 p-2 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/50 flex flex-col justify-between"
            >
              <div className="h-18 w-full rounded bg-white dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-100 dark:border-slate-700 mb-1.5">
                <img src={asset.url} alt="" className="max-h-full max-w-full object-contain" />
              </div>

              <input
                value={asset.name}
                onChange={(e) =>
                  setAssets((previous) => {
                    const next = previous.map((item) =>
                      item.id === asset.id ? { ...item, name: e.target.value } : item
                    );
                    saveCustomAssets(next);
                    return next;
                  })
                }
                readOnly={asset.source === 'library'}
                className="w-full bg-transparent text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate focus:outline-none"
                title={asset.name}
              />

              <div className="mt-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    updateLogo({ url: asset.url, alt: asset.name, width: 95, height: 80 });
                    showToast(`« ${asset.name} » appliqué en tant que Logo`, 'success');
                  }}
                  className="flex-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 py-1 text-[10px] font-bold text-[#0C3866] dark:text-amber-300 transition-colors"
                >
                  Logo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateState((prev) => ({
                      ...prev,
                      banner: {
                        ...prev.banner,
                        campaignName: '',
                        imageUrl: asset.url,
                        altText: asset.name,
                        enabled: true,
                        position: 'center',
                        width: 175,
                        height: 84,
                        maintainRatio: true
                      },
                      visibility: { ...prev.visibility, banner: true }
                    }));
                    showToast(`« ${asset.name} » appliqué en tant qu’Image Carte`, 'success');
                  }}
                  className="flex-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 py-1 text-[10px] font-bold text-[#0C3866] dark:text-amber-300 transition-colors"
                >
                  Carte
                </button>
                {asset.source !== 'library' && (
                  <button
                    type="button"
                    aria-label={`Retirer ${asset.name}`}
                    onClick={() => removeAsset(asset.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 dark:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {visibleAssets.length === 0 && (
            <div className="col-span-2 py-8 text-center text-xs text-slate-400">
              Aucun visuel ne correspond à votre recherche.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
