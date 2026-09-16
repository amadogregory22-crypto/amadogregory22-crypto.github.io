import React, { useEffect, useRef, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { PRESET_LOGOS } from '../../constants/logos';
import { CLASSIFIED_PNG_ASSETS } from '../../constants/assets';
import { LogoItem } from '../../types/signature';
import { Check, Eye, EyeOff, Image as ImageIcon, Library, Palette, Sparkles, Trash2, Upload } from 'lucide-react';

type AssetTarget = 'primary' | 'secondary' | 'gallery';
type GalleryAsset = { id: string; name: string; url: string; source: 'library' | 'upload' | 'ai' };

const LIBRARY_ASSETS: GalleryAsset[] = CLASSIFIED_PNG_ASSETS.map((asset) => ({
  id: asset.id,
  name: asset.name,
  url: asset.url,
  source: 'library'
}));

const saveCustomAssets = (assets: GalleryAsset[]) => {
  localStorage.setItem('ragt_gallery_assets', JSON.stringify(assets.filter((asset) => asset.source !== 'library')));
};

export const LogosPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { logos, visibility, iconSettings } = state;
  const [assets, setAssets] = useState<GalleryAsset[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ragt_gallery_assets') || '[]') as GalleryAsset[];
      return [...saved.map((asset): GalleryAsset => ({ ...asset, source: asset.source === 'ai' ? 'ai' : 'upload' })), ...LIBRARY_ASSETS];
    } catch {
      return LIBRARY_ASSETS;
    }
  });
  const [search, setSearch] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<AssetTarget>('primary');

  useEffect(() => {
    const focusUpload = (event: Event) => {
      if ((event as CustomEvent<{ target?: string }>).detail?.target !== 'signature-logo-upload') return;
      window.setTimeout(() => document.getElementById('signature-logo-upload')?.focus(), 0);
    };
    window.addEventListener('ragt:focus-control', focusUpload);
    return () => window.removeEventListener('ragt:focus-control', focusUpload);
  }, []);

  const updateLogo = (target: 'primary' | 'secondary', patch: Partial<LogoItem>) => {
    updateState((prev) => ({
      ...prev,
      logos: { ...prev.logos, [target]: { ...prev.logos[target], ...patch } },
      visibility: target === 'primary'
        ? { ...prev.visibility, logo: true }
        : { ...prev.visibility, secondaryLogo: true }
    }));
  };

  const addAsset = (asset: GalleryAsset) => {
    setAssets((previous) => {
      const next = [asset, ...previous];
      saveCustomAssets(next);
      return next;
    });
  };

  const openUpload = (target: AssetTarget) => {
    targetRef.current = target;
    inputRef.current?.click();
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
      const target = targetRef.current;
      if (target !== 'gallery') {
        const image = new Image();
        image.onload = () => {
          const width = Math.min(160, image.naturalWidth || 95);
          updateLogo(target, { url, alt: name, width, height: Math.max(24, Math.round(width / Math.max(1, image.naturalWidth / image.naturalHeight))) });
        };
        image.src = url;
        showToast('Visuel ajouté à la bibliothèque et appliqué.', 'success');
      } else {
        showToast('Visuel ajouté à votre bibliothèque.', 'success');
      }
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

  const generateWithAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: aiPrompt }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Génération indisponible');
      const asset = { id: `ai-${Date.now()}`, name: 'Visuel généré', url: data.imageUrl, source: 'ai' as const };
      addAsset(asset);
      updateLogo('primary', { url: asset.url, alt: asset.name, width: 120, height: 120 });
      setAiPrompt('');
      showToast('Visuel généré, ajouté et appliqué comme logo principal.', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Génération indisponible', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const visibleAssets = assets.filter((asset) => asset.name.toLowerCase().includes(search.toLowerCase()));
  const styleOptions = [
    { id: 'minimal', label: 'Minimal' }, { id: 'outline', label: 'Contour' }, { id: 'filled', label: 'Plein' }, { id: 'circle', label: 'Rond' }, { id: 'square', label: 'Carré' }
  ] as const;

  return (
    <div className="space-y-5 p-4 text-slate-800 dark:text-slate-200">
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleUpload} className="hidden" />

      <section className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-3 flex items-start justify-between gap-3"><div><h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400"><ImageIcon className="h-4 w-4 text-[#F7BD00]" /> Logos</h3><p className="mt-0.5 text-xs text-slate-500">Choisissez ou importez le logo qui apparaît dans la signature.</p></div><button type="button" onClick={() => updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, logo: !prev.visibility.logo } }))} className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold dark:border-slate-600">{visibility.logo ? <Eye className="h-3.5 w-3.5 text-emerald-600" /> : <EyeOff className="h-3.5 w-3.5" />}{visibility.logo ? 'Affiché' : 'Masqué'}</button></div>
        <div className="mb-3 flex min-h-20 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-900">{logos.primary.url ? <img src={logos.primary.url} alt={logos.primary.alt} className="max-h-20 max-w-full object-contain" style={{ width: logos.primary.width }} /> : <span className="text-xs text-slate-500">Aucun logo choisi</span>}</div>
        <div className="grid grid-cols-2 gap-2"><button id="signature-logo-upload" type="button" onClick={() => openUpload('primary')} className="rounded-lg bg-[#0C3866] px-3 py-2 text-xs font-bold text-white"><Upload className="mr-1 inline h-3.5 w-3.5" />Importer un logo</button><button type="button" onClick={() => updateLogo('primary', { url: '/assets/logos/logo_ragt.png', alt: 'Logo officiel RAGT', width: 95, height: 100 })} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#0C3866] dark:border-slate-600 dark:text-amber-400">Rétablir RAGT</button></div>
        <div className="mt-3 grid grid-cols-2 gap-2">{PRESET_LOGOS.filter((logo) => logo.category === 'ragt').map((logo) => <button key={logo.id} type="button" onClick={() => { updateLogo('primary', { url: logo.url, alt: logo.name, width: logo.defaultWidth, height: logo.defaultHeight }); showToast(`${logo.name} appliqué`, 'success'); }} className={`rounded-lg border p-2 text-left ${logos.primary.url === logo.url ? 'border-[#0C3866] ring-1 ring-[#0C3866]' : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-600'}`}><img src={logo.url} alt="" className="mb-1 h-10 w-full object-contain" /><span className="block truncate text-[10px] font-bold">{logo.name}</span></button>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><label className="text-[11px] font-semibold">Largeur<input type="number" min="30" max="220" value={logos.primary.width} onChange={(event) => updateLogo('primary', { width: Number(event.target.value) || 30 })} className="mt-1 w-full rounded border border-slate-200 px-2 py-1 dark:border-slate-600 dark:bg-slate-900" /></label><label className="text-[11px] font-semibold">Lien au clic<input value={logos.primary.linkUrl} onChange={(event) => updateLogo('primary', { linkUrl: event.target.value })} className="mt-1 w-full rounded border border-slate-200 px-2 py-1 dark:border-slate-600 dark:bg-slate-900" placeholder="https://…" /></label></div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800"><div className="mb-3 flex items-start justify-between gap-2"><div><h3 className="text-xs font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">Certification ou partenaire</h3><p className="mt-0.5 text-[11px] text-slate-500">Ajoutez un second logo sans remplacer le logo RAGT.</p></div><button type="button" onClick={() => updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, secondaryLogo: !prev.visibility.secondaryLogo } }))} className="text-[11px] font-bold text-[#0C3866] dark:text-amber-400">{visibility.secondaryLogo ? 'Masquer' : 'Afficher'}</button></div><div className="grid grid-cols-2 gap-2">{PRESET_LOGOS.filter((logo) => logo.category !== 'ragt').map((logo) => <button key={logo.id} type="button" onClick={() => { updateLogo('secondary', { url: logo.url, alt: logo.name, width: logo.defaultWidth, height: logo.defaultHeight }); showToast(`${logo.name} ajouté`, 'success'); }} className={`rounded-lg border p-2 text-left ${logos.secondary.url === logo.url ? 'border-[#0C3866] ring-1 ring-[#0C3866]' : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-600'}`}><img src={logo.url} alt="" className="mb-1 h-10 w-full object-contain"/><span className="block truncate text-[10px] font-bold">{logo.name}</span></button>)}</div><button type="button" onClick={() => openUpload('secondary')} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold dark:border-slate-600"><Upload className="mr-1 inline h-3.5 w-3.5" />Importer une certification ou un partenaire</button></section>

      <section className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800"><div className="mb-3 flex items-center gap-1.5"><Palette className="h-4 w-4 text-[#F7BD00]"/><div><h3 className="text-xs font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">Icônes de contact</h3><p className="text-[11px] text-slate-500">Le style commun des icônes de la signature.</p></div></div><div className="grid grid-cols-5 gap-1.5">{styleOptions.map((style) => <button key={style.id} type="button" onClick={() => updateState((prev) => ({ ...prev, iconSettings: { ...prev.iconSettings, style: style.id } }))} className={`rounded border px-1 py-1.5 text-[10px] font-semibold ${iconSettings.style === style.id ? 'border-[#0C3866] bg-[#0C3866] text-white' : 'border-slate-200 dark:border-slate-600'}`}>{style.label}</button>)}</div><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-[11px] font-semibold">Taille<input type="number" min="10" max="28" value={iconSettings.size} onChange={(event) => updateState((prev) => ({ ...prev, iconSettings: { ...prev.iconSettings, size: Number(event.target.value) || 10 } }))} className="mt-1 w-full rounded border border-slate-200 px-2 py-1 dark:border-slate-600 dark:bg-slate-900" /></label><label className="text-[11px] font-semibold">Couleur<input type="color" aria-label="Couleur des icônes" value={iconSettings.color} onChange={(event) => updateState((prev) => ({ ...prev, iconSettings: { ...prev.iconSettings, color: event.target.value }, design: { ...prev.design, colors: { ...prev.design.colors, icons: event.target.value } } }))} className="mt-1 h-8 w-full rounded border border-slate-200" /></label></div></section>

      <section className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800"><div className="mb-3 flex items-start justify-between gap-2"><div><h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400"><Library className="h-4 w-4 text-[#F7BD00]" /> Ma bibliothèque</h3><p className="mt-0.5 text-[11px] text-slate-500">Importez, réutilisez ou retirez vos propres visuels.</p></div><button type="button" onClick={() => openUpload('gallery')} className="rounded-lg bg-[#0C3866] px-2.5 py-1.5 text-[11px] font-bold text-white"><Upload className="mr-1 inline h-3.5 w-3.5"/>Ajouter</button></div><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un visuel" className="mb-2 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-900"/><div className="grid grid-cols-2 gap-2">{visibleAssets.slice(0, 24).map((asset) => <div key={asset.id} className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-600"><img src={asset.url} alt="" className="h-16 w-full rounded object-contain"/><input value={asset.name} onChange={(event) => setAssets((previous) => { const next = previous.map((item) => item.id === asset.id ? { ...item, name: event.target.value } : item); saveCustomAssets(next); return next; })} readOnly={asset.source === 'library'} className="mt-1 w-full bg-transparent text-[10px] font-bold"/><div className="mt-1 flex gap-1"><button type="button" onClick={() => updateLogo('primary', { url: asset.url, alt: asset.name, width: 95, height: 80 })} className="flex-1 rounded bg-slate-100 px-1 py-1 text-[9px] font-bold text-[#0C3866] dark:bg-slate-700 dark:text-amber-400">Logo</button><button type="button" onClick={() => updateState((prev) => ({ ...prev, banner: { ...prev.banner, campaignName: '', imageUrl: asset.url, altText: asset.name, enabled: true, position: 'center', width: 175, height: 84, maintainRatio: true }, visibility: { ...prev.visibility, banner: true } }))} className="flex-1 rounded bg-slate-100 px-1 py-1 text-[9px] font-bold text-[#0C3866] dark:bg-slate-700 dark:text-amber-400">Carte</button>{asset.source !== 'library' && <button type="button" aria-label={`Retirer ${asset.name}`} onClick={() => removeAsset(asset.id)} className="rounded px-1 text-rose-600"><Trash2 className="h-3.5 w-3.5"/></button>}</div></div>)}</div><div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-700"><label className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-[#0C3866] dark:text-amber-400"><Sparkles className="h-3.5 w-3.5 text-[#F7BD00]"/>Créer un visuel avec IA</label><div className="flex gap-2"><input value={aiPrompt} onChange={(event) => setAiPrompt(event.target.value)} placeholder="Décrivez le visuel" className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-900"/><button type="button" onClick={generateWithAi} disabled={isGenerating || !aiPrompt.trim()} className="rounded-lg bg-[#0C3866] px-3 text-xs font-bold text-white disabled:opacity-50">{isGenerating ? '…' : 'Créer'}</button></div></div></section>
    </div>
  );
};
