import React, { useRef, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { BannerConfig } from '../../types/signature';
import { ChevronDown, ChevronUp, Eye, EyeOff, Image as ImageIcon, Link as LinkIcon, Trash2, Upload } from 'lucide-react';
import { BANNER_IMAGES, CLASSIFIED_PNG_ASSETS } from '../../constants/assets';

type CardImage = {
  id: string;
  name: string;
  description: string;
  url: string;
  placement: 'top' | 'center';
  width: number;
  height: number;
};

const CARD_IMAGES: CardImage[] = [
  { id: 'carte-ragt-agronomes', name: 'Agronomes RAGT', description: 'Photo originale de la carte.', url: '/assets/bannieres/photo_carte_ragt.png', placement: 'center', width: 175, height: 84 },
  { id: 'carte-ragt-bags', name: 'Sacs de semences', description: 'Emballages RAGT.', url: '/assets/bannieres/bags_signature.png', placement: 'center', width: 175, height: 84 },
  { id: 'carte-ragt-field', name: 'Champs & cultures', description: 'Recherche agronomique.', url: '/assets/bannieres/image_signature.png', placement: 'center', width: 175, height: 84 }
];

const READY_CAMPAIGN_MAX_HEIGHT = 90;

export const BannerPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { banner, visibility } = state;
  const isReadyCampaign = Boolean(banner.campaignName) && banner.position === 'bottom' && banner.maintainRatio === false;
  const [showLibrary, setShowLibrary] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPlacement, setShowPlacement] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateBanner = (patch: Partial<BannerConfig>) => updateState((prev) => ({ ...prev, banner: { ...prev.banner, ...patch } }));
  const openImport = () => window.setTimeout(() => fileInputRef.current?.click(), 0);

  const applyCardImage = (item: CardImage) => {
    const position = state.layout.preset === 'layout-i' ? 'center' : item.placement;
    updateBanner({ title: item.name, campaignName: '', altText: item.description, imageUrl: item.url, enabled: true, position, width: item.width, height: item.height, maintainRatio: true, startDate: '', endDate: '' });
    updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
    showToast(`Image « ${item.name} » ajoutée à la carte`, 'success');
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = String(reader.result || '');
      if (!imageUrl) return;
      const compact = state.layout.preset === 'layout-i';
      updateBanner({ imageUrl, title: file.name, campaignName: '', altText: file.name, enabled: true, position: compact ? 'center' : 'top', width: compact ? 175 : 400, height: compact ? 84 : 120, maintainRatio: true });
      updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
      showToast('Image ajoutée à la carte', 'success');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const libraryImages = CLASSIFIED_PNG_ASSETS.filter((asset) => asset.menuTarget === 'banner' && asset.subCategory !== 'Cartes institutionnelles');

  return (
    <div className="space-y-5 p-4 text-slate-800 dark:text-slate-200">
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400"><ImageIcon className="h-4 w-4 text-[#F7BD00]" /> Image</h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Ajoutez une image qui accompagne vos coordonnées.</p>
      </div>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div><span className="block font-bold text-slate-800 dark:text-slate-100">Image de la carte</span><span className="text-[11px] text-slate-500 dark:text-slate-400">{banner.title || 'Aucune image sélectionnée'}</span></div>
          <div className="flex items-center gap-1"><button id="signature-banner-toggle" type="button" onClick={() => { const enabled = !(visibility.banner && banner.enabled); updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: enabled }, banner: { ...prev.banner, enabled } })); showToast(enabled ? 'Image de carte affichée' : 'Image de carte masquée', 'info'); }} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold ${visibility.banner && banner.enabled ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
            {visibility.banner && banner.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}{visibility.banner && banner.enabled ? 'Affichée' : 'Masquée'}
          </button><button type="button" aria-label="Retirer l’image de la carte" onClick={() => { updateState((prev) => ({ ...prev, banner: { ...prev.banner, enabled: false, title: '', campaignName: '', imageUrl: '', altText: '', linkUrl: '' }, visibility: { ...prev.visibility, banner: false } })); showToast('Image retirée de la carte', 'success'); }} className="rounded-lg border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" /></button></div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={uploadImage} className="hidden" />
        <div className="rounded-xl border border-[#0C3866]/20 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-start justify-between gap-2"><div><span className="block font-bold text-slate-800 dark:text-slate-100">Image</span><span className="text-[10px] text-slate-500 dark:text-slate-400">Image à positionner à cet endroit, en haut des coordonnées.</span></div><button type="button" onClick={openImport} className="shrink-0 rounded-lg bg-[#0C3866] px-2.5 py-1.5 text-[10px] font-bold text-white"><Upload className="mr-1 inline h-3 w-3" />Importer</button></div>
          <div className="grid grid-cols-3 gap-2">{CARD_IMAGES.map((item) => <button key={item.id} type="button" onClick={() => applyCardImage(item)} className={`rounded-lg border p-1.5 text-left transition-all ${banner.imageUrl === item.url ? 'border-[#0C3866] ring-2 ring-[#0C3866]/20' : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-700'}`}><img src={item.url} alt="" className="mb-1 h-12 w-full rounded object-cover" /><span className="block truncate text-[10px] font-bold">{item.name}</span></button>)}</div>
        </div>

        <button type="button" onClick={() => setShowLibrary((value) => !value)} className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><span>Bibliothèque d’images RAGT</span>{showLibrary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
        {showLibrary && <div className="max-h-64 space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"><div><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Photos et visuels RAGT</span><div className="grid grid-cols-2 gap-2">{libraryImages.map((item) => <button key={item.id} type="button" onClick={() => applyCardImage({ id: item.id, name: item.name, description: item.description, url: item.url, placement: 'center', width: 175, height: 84 })} className="rounded-lg border border-slate-200 bg-white p-1.5 text-left hover:border-[#0C3866] dark:border-slate-700 dark:bg-slate-800"><img src={item.url} alt="" className="mb-1 h-14 w-full rounded object-cover" /><span className="block truncate text-[10px] font-bold">{item.name}</span></button>)}</div></div><div><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-500">Bandeaux, fonds et motifs importés</span><div className="grid grid-cols-2 gap-2">{BANNER_IMAGES.map((imageUrl) => <button key={imageUrl} type="button" onClick={() => { updateBanner({ imageUrl, campaignName: '', enabled: true, position: 'bottom', width: state.layout.dimensions.totalWidth, height: 30, maintainRatio: false }); updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } })); }} className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1 hover:border-[#0C3866] dark:border-slate-700 dark:bg-slate-800"><img src={imageUrl} alt="Ressource de communication RAGT" className="h-9 w-full rounded object-cover" /></button>)}</div></div></div>}

        <div className="grid gap-3 border-t border-slate-100 pt-3 dark:border-slate-700">
          <label className="block"><span className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-300">URL de l’image</span><input value={banner.imageUrl} onChange={(event) => updateBanner({ imageUrl: event.target.value })} placeholder="https://…" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] text-blue-700 dark:border-slate-700 dark:bg-slate-900" /></label>
          <label className="block"><span className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-300">Texte alternatif</span><input value={banner.altText || ''} onChange={(event) => updateBanner({ altText: event.target.value })} placeholder="Décrivez l’image" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900" /></label>
          <label className="block"><span className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300"><LinkIcon className="h-3.5 w-3.5" /> Lien au clic (facultatif)</span><input value={banner.linkUrl || ''} onChange={(event) => updateBanner({ linkUrl: event.target.value })} placeholder="https://www.ragt.fr" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900" /></label>
          <button type="button" onClick={() => setShowSchedule((value) => !value)} className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><span>Planifier l’affichage de cette image</span>{showSchedule ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</button>
          {showSchedule && <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-900"><label><span className="mb-1 block text-[10px] font-semibold text-slate-500">Début</span><input type="date" aria-label="Début d’affichage" value={banner.startDate || ''} onChange={(event) => updateBanner({ startDate: event.target.value })} className="w-full rounded border border-slate-200 bg-white px-1.5 py-1 text-[11px] dark:border-slate-700 dark:bg-slate-800" /></label><label><span className="mb-1 block text-[10px] font-semibold text-slate-500">Fin</span><input type="date" aria-label="Fin d’affichage" min={banner.startDate || undefined} value={banner.endDate || ''} onChange={(event) => updateBanner({ endDate: event.target.value })} className="w-full rounded border border-slate-200 bg-white px-1.5 py-1 text-[11px] dark:border-slate-700 dark:bg-slate-800" /></label><p className="col-span-2 text-[10px] text-slate-500">Les dates affectent les nouvelles signatures générées ; une signature déjà collée dans Outlook reste inchangée.</p></div>}
          <button type="button" onClick={() => setShowPlacement((value) => !value)} className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-left text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><span>Position et dimensions</span>{showPlacement ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</button>
          {showPlacement && <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-900">
            <div><span className="mb-1.5 block text-[10px] font-semibold text-slate-500">Position dans la signature</span><div className="grid grid-cols-3 gap-1.5">{(['top', 'left', 'center', 'right', 'bottom'] as const).map((position) => <button key={position} type="button" onClick={() => updateBanner({ position })} className={`rounded border px-2 py-1.5 text-[10px] font-semibold ${banner.position === position ? 'border-[#0C3866] bg-white text-[#0C3866] dark:bg-slate-800 dark:text-amber-400' : 'border-slate-200 bg-white text-slate-600 hover:border-[#0C3866] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>{({ top: 'Haut', left: 'Gauche', center: 'Centre', right: 'Droite', bottom: 'Bas' } as const)[position]}</button>)}</div></div>
            <div className="grid grid-cols-2 gap-2"><label><span className="mb-1 block text-[10px] font-semibold text-slate-500">{isReadyCampaign ? 'Largeur de la signature (px)' : 'Largeur (px)'}</span><input type="number" min="40" max="600" value={isReadyCampaign ? state.layout.dimensions.totalWidth : banner.width} disabled={isReadyCampaign} onChange={(event) => { const width = Math.max(40, Number(event.target.value) || 40); updateBanner({ width, height: banner.maintainRatio ? Math.max(20, Math.round(width * banner.height / Math.max(1, banner.width))) : banner.height }); }} className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:disabled:bg-slate-700" /></label><label><span className="mb-1 block text-[10px] font-semibold text-slate-500">Hauteur (px)</span><input type="number" min="20" max={isReadyCampaign ? READY_CAMPAIGN_MAX_HEIGHT : 400} value={banner.height} onChange={(event) => { const requestedHeight = Math.max(20, Number(event.target.value) || 20); const height = isReadyCampaign ? Math.min(READY_CAMPAIGN_MAX_HEIGHT, requestedHeight) : requestedHeight; updateBanner({ height, width: banner.maintainRatio ? Math.max(40, Math.round(height * banner.width / Math.max(1, banner.height))) : banner.width }); }} className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] dark:border-slate-700 dark:bg-slate-800" /></label></div>
            <label className="flex cursor-pointer items-center gap-2 text-[10px] text-slate-600 dark:text-slate-300"><input type="checkbox" checked={banner.maintainRatio} onChange={(event) => updateBanner({ maintainRatio: event.target.checked })} className="rounded border-slate-300 text-[#0C3866]" />Conserver les proportions de l’image</label>
          </div>}
        </div>
      </section>

    </div>
  );
};
