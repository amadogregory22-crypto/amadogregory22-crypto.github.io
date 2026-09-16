import React, { useRef, useState } from 'react';
import {
  Flag,
  Quote,
  Maximize2,
  Sliders,
  CheckCircle2,
  Eye,
  EyeOff,
  Calendar,
  Upload,
  Plus,
  Trash2,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Image as ImageIcon
} from 'lucide-react';
import { useSignature } from '../../context/SignatureContext';
import { CampaignConfig, SloganConfig } from '../../types/signature';
import { SIGNATURES_COM } from '../../constants/assets';

interface CustomCampaignItem {
  id: string;
  title: string;
  campaign: string;
  url: string;
  isCustom?: boolean;
}

const OFFICIAL_CAMPAIGNS: CustomCampaignItem[] = [
  { id: 'ragt-events', title: 'Salon & événements', campaign: 'Actualités RAGT', url: '/assets/bannieres/046805_BD.jpg' },
  { id: 'ragt-varieties', title: 'Innovation variétale', campaign: 'Génétique & performance', url: '/assets/bannieres/046806_BD.jpg' },
  { id: 'ragt-recruitment', title: 'Recrutement', campaign: 'Rejoignez RAGT Semences', url: '/assets/bannieres/046807_BD.jpg' }
];

export const CampaignPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { banner, slogan, visibility } = state;

  const totalWidth = state.layout.dimensions.totalWidth || 540;
  const naturalHeight = Math.round((totalWidth * 450) / 800); // 304px for 540px width (16:9)

  const [customCampaigns, setCustomCampaigns] = useState<CustomCampaignItem[]>(() => {
    try {
      const saved = localStorage.getItem('ragt_custom_campaigns');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveCustomCampaigns = (items: CustomCampaignItem[]) => {
    setCustomCampaigns(items);
    try {
      localStorage.setItem('ragt_custom_campaigns', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save custom campaigns', e);
    }
  };

  const campaignData: CampaignConfig = state.campaign || {
    enabled: Boolean((visibility.campaign ?? visibility.banner) && banner.enabled && banner.campaignName),
    title: banner.campaignName ? banner.title : OFFICIAL_CAMPAIGNS[1].title,
    campaignName: banner.campaignName || OFFICIAL_CAMPAIGNS[1].campaign,
    altText: banner.campaignName ? banner.altText : OFFICIAL_CAMPAIGNS[1].title,
    imageUrl: banner.campaignName ? banner.imageUrl : OFFICIAL_CAMPAIGNS[1].url,
    width: totalWidth,
    height: naturalHeight,
    maintainRatio: true,
    fitMode: 'contain',
    linkUrl: banner.linkUrl || '',
    startDate: banner.startDate || '',
    endDate: banner.endDate || ''
  };

  const isCampaignEnabled = state.campaign
    ? Boolean(state.campaign.enabled && (visibility.campaign ?? true))
    : Boolean(visibility.banner && banner.enabled && banner.campaignName);

  const isMaintainRatio = campaignData.maintainRatio !== false;

  const updateCampaign = (patch: Partial<CampaignConfig>) => {
    updateState((prev) => {
      const current = prev.campaign || campaignData;
      return {
        ...prev,
        visibility: {
          ...prev.visibility,
          campaign: patch.enabled !== undefined ? patch.enabled : isCampaignEnabled
        },
        campaign: {
          ...current,
          ...patch
        }
      };
    });
  };

  const updateSlogan = (patch: Partial<SloganConfig>) =>
    updateState((prev) => ({ ...prev, slogan: { ...prev.slogan, ...patch } }));

  const applyCampaignImage = (params: { title: string; campaign: string; url: string; height?: number }) => {
    updateState((prev) => {
      // If prev.banner was contaminated by a campaign image, restore the official card photo
      let restoredBanner = prev.banner;
      if (prev.banner.imageUrl && (prev.banner.imageUrl.includes('_BD.jpg') || prev.banner.imageUrl.includes('04680') || prev.banner.campaignName)) {
        restoredBanner = {
          ...prev.banner,
          enabled: true,
          imageUrl: '/assets/bannieres/photo_carte_ragt.png',
          altText: 'Photo agronomie RAGT',
          position: 'center',
          width: 175,
          height: 84,
          campaignName: '',
          maintainRatio: true
        };
      }

      const isRatio = prev.campaign?.maintainRatio !== false;
      const width = prev.layout.dimensions.totalWidth || 540;
      const targetHeight = params.height || (isRatio ? Math.round((width * 450) / 800) : (prev.campaign?.height || 120));

      return {
        ...prev,
        banner: restoredBanner,
        visibility: {
          ...prev.visibility,
          campaign: true
        },
        campaign: {
          enabled: true,
          title: params.title,
          campaignName: params.campaign,
          altText: params.title,
          imageUrl: params.url,
          width,
          height: targetHeight,
          maintainRatio: isRatio,
          fitMode: prev.campaign?.fitMode || 'contain',
          linkUrl: prev.campaign?.linkUrl || '',
          startDate: prev.campaign?.startDate || '',
          endDate: prev.campaign?.endDate || ''
        }
      };
    });
  };

  const handleSelectCampaign = (item: CustomCampaignItem) => {
    applyCampaignImage({
      title: item.title,
      campaign: item.campaign,
      url: item.url
    });
    showToast(`Campagne « ${item.title} » appliquée`, 'success');
  };

  const handleFileProcess = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast('Choisissez une image de moins de 5 Mo.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        const naturalWidth = img.naturalWidth || 800;
        const naturalHeight = img.naturalHeight || 450;
        const aspect = naturalWidth / naturalHeight;
        const computedHeight = Math.round(totalWidth / aspect);
        const cleanName = file.name.replace(/\.[^/.]+$/, '');

        const newCampaign: CustomCampaignItem = {
          id: 'custom-' + Date.now(),
          title: cleanName,
          campaign: 'Campagne importée',
          url: dataUrl,
          isCustom: true
        };

        const nextList = [newCampaign, ...customCampaigns.filter(c => c.url !== dataUrl)];
        saveCustomCampaigns(nextList);

        applyCampaignImage({
          title: newCampaign.title,
          campaign: newCampaign.campaign,
          url: newCampaign.url,
          height: computedHeight
        });

        showToast(`Image « ${cleanName} » importée et appliquée`, 'success');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileProcess(file);
    event.target.value = '';
  };

  const handleApplyUrl = () => {
    const url = urlInputValue.trim();
    if (!url) return;

    const img = new Image();
    img.onload = () => {
      const naturalWidth = img.naturalWidth || 800;
      const naturalHeight = img.naturalHeight || 450;
      const aspect = naturalWidth / naturalHeight;
      const computedHeight = Math.round(totalWidth / aspect);
      const name = 'Visuel web';

      const newCampaign: CustomCampaignItem = {
        id: 'custom-' + Date.now(),
        title: name,
        campaign: 'Image en ligne',
        url,
        isCustom: true
      };

      const nextList = [newCampaign, ...customCampaigns.filter(c => c.url !== url)];
      saveCustomCampaigns(nextList);

      applyCampaignImage({
        title: newCampaign.title,
        campaign: newCampaign.campaign,
        url: newCampaign.url,
        height: computedHeight
      });

      setUrlInputValue('');
      setShowUrlInput(false);
      showToast('Image en ligne appliquée avec succès', 'success');
    };
    img.onerror = () => {
      showToast('Impossible de charger l’image depuis cette URL.', 'error');
    };
    img.src = url;
  };

  const handleDeleteCustomCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextList = customCampaigns.filter(c => c.id !== id);
    saveCustomCampaigns(nextList);
    showToast('Image supprimée de vos campagnes', 'info');
  };

  const handleToggle = () => {
    const nextState = !isCampaignEnabled;
    updateCampaign({ enabled: nextState });
    showToast(nextState ? 'Bandeau de campagne affiché sous la signature' : 'Campagne masquée', 'info');
  };

  const allAvailableCampaigns = [...customCampaigns, ...OFFICIAL_CAMPAIGNS];

  return (
    <div className="space-y-5 p-4 text-slate-800 dark:text-slate-200">
      {/* SECTION CAMPAGNE OFFICIELLE RAGT */}
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 text-xs dark:border-slate-700 dark:bg-slate-800 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
              <Flag className="h-4 w-4 text-[#F7BD00]" /> Campagnes institutionnelles
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Bandeau officiel pleine largeur positionné sous la carte, affiché en entier sans aucune coupure.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-colors ${
              isCampaignEnabled
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-600 dark:text-emerald-300'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {isCampaignEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {isCampaignEnabled ? 'Affichée' : 'Masquée'}
          </button>
        </div>

        {/* Boutons d'action : Importer, Lien URL, Bibliothèque */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-[#0C3866] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-[#08284a] transition-all"
          >
            <Upload className="h-3.5 w-3.5 text-[#F7BD00]" />
            Importer une image
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
              showUrlInput
                ? 'border-[#0C3866] bg-slate-100 text-[#0C3866] dark:border-amber-400 dark:bg-slate-700 dark:text-amber-400'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <LinkIcon className="h-3.5 w-3.5" />
            Lien web (URL)
          </button>

          <button
            type="button"
            onClick={() => setShowLibrary((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
              showLibrary
                ? 'border-[#0C3866] bg-slate-100 text-[#0C3866] dark:border-amber-400 dark:bg-slate-700 dark:text-amber-400'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            <FolderOpen className="h-3.5 w-3.5 text-[#0C3866] dark:text-amber-400" />
            Bibliothèque RAGT {showLibrary ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Champ de saisie d'URL d'image */}
        {showUrlInput && (
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-900">
            <input
              type="url"
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              placeholder="https://domaine.com/mon-visuel.jpg"
              className="flex-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-300"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="rounded bg-[#0C3866] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#08284a]"
            >
              Appliquer
            </button>
          </div>
        )}

        {/* Tiroir de la bibliothèque officielle RAGT */}
        {showLibrary && (
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                Visuels & bannières de communication RAGT
              </span>
              <span className="text-[10px] text-slate-500">
                {SIGNATURES_COM.length} visuels officiels
              </span>
            </div>
            <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto p-1">
              {SIGNATURES_COM.map((url, idx) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => {
                    handleSelectCampaign({
                      id: `ragt-lib-${idx}`,
                      title: `Bandeau RAGT #${idx + 1}`,
                      campaign: 'Communication RAGT',
                      url
                    });
                  }}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white p-1 text-left transition-all hover:border-[#0C3866] dark:border-slate-700 dark:bg-slate-800"
                >
                  <img
                    src={url}
                    alt={`Bandeau RAGT ${idx + 1}`}
                    className="h-12 w-full rounded object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="mt-1 block truncate text-[9px] font-bold text-slate-700 dark:text-slate-300">
                    Bandeau #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grille des campagnes disponibles (importées + officielles) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Campagnes disponibles
            </span>
            {customCampaigns.length > 0 && (
              <span className="text-[10px] text-slate-500">
                {customCampaigns.length} image{customCampaigns.length > 1 ? 's' : ''} importée{customCampaigns.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Carte rapide pour importer une nouvelle image */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileProcess(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition-all ${
                isDragOver
                  ? 'border-[#0C3866] bg-amber-50 dark:border-amber-400 dark:bg-slate-700'
                  : 'border-slate-200 hover:border-[#0C3866] hover:bg-slate-50 dark:border-slate-700 dark:hover:border-amber-400 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[#0C3866] group-hover:bg-[#0C3866] group-hover:text-white dark:bg-slate-700 dark:text-amber-400 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-900 transition-colors">
                <Plus className="h-4 w-4" />
              </div>
              <span className="mt-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                + Importer
              </span>
              <span className="text-[8px] text-slate-400">
                Glisser ou cliquer
              </span>
            </div>

            {/* Liste combinée des campagnes */}
            {allAvailableCampaigns.map((item) => {
              const isSelected = isCampaignEnabled && campaignData.imageUrl === item.url;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectCampaign(item)}
                  className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border p-1.5 text-left transition-all ${
                    isSelected
                      ? 'border-[#0C3866] ring-2 ring-[#0C3866]/30 bg-amber-50/50 dark:bg-slate-700 dark:border-amber-400'
                      : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-700'
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-900">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 rounded-full bg-[#0C3866] p-0.5 text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#F7BD00]" />
                      </span>
                    )}
                    {item.isCustom && (
                      <button
                        type="button"
                        aria-label="Supprimer cette campagne importée"
                        onClick={(e) => handleDeleteCustomCampaign(item.id, e)}
                        className="absolute bottom-1 right-1 rounded bg-black/60 p-1 text-white opacity-0 transition-opacity hover:bg-rose-600 group-hover:opacity-100"
                        title="Supprimer cette image"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <span className="mt-1.5 block truncate text-[10px] font-bold text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>
                  <span className="block truncate text-[9px] text-slate-500 dark:text-slate-400">
                    {item.campaign}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mode d'affichage et proportions */}
        <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/50">
          <span className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            Mode d'affichage du visuel
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateCampaign({ maintainRatio: true, height: naturalHeight })}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all ${
                isMaintainRatio
                  ? 'border-[#0C3866] bg-white text-[#0C3866] shadow-xs ring-2 ring-[#0C3866]/20 dark:border-amber-400 dark:bg-slate-800 dark:text-amber-400'
                  : 'border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
              }`}
            >
              <Maximize2 className="h-4 w-4 text-[#0C3866] dark:text-amber-400" />
              <span className="text-[11px] font-bold">Image entière</span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400">
                100% visible (Non coupée)
              </span>
            </button>

            <button
              type="button"
              onClick={() => updateCampaign({ maintainRatio: false })}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all ${
                !isMaintainRatio
                  ? 'border-[#0C3866] bg-white text-[#0C3866] shadow-xs ring-2 ring-[#0C3866]/20 dark:border-amber-400 dark:bg-slate-800 dark:text-amber-400'
                  : 'border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400'
              }`}
            >
              <Sliders className="h-4 w-4 text-[#0C3866] dark:text-amber-400" />
              <span className="text-[11px] font-bold">Hauteur sur-mesure</span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400">
                Hauteur personnalisée
              </span>
            </button>
          </div>

          {isMaintainRatio ? (
            <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-1.5 text-[10px] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Proportions réelles préservées : l'image est affichée en totalité sans aucun rognage (~{campaignData.height || naturalHeight} px de haut).</span>
            </div>
          ) : (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Hauteur : {campaignData.height || 120} px
                </span>
                <input
                  type="number"
                  min="60"
                  max="350"
                  value={campaignData.height || 120}
                  onChange={(e) =>
                    updateCampaign({
                      height: Math.max(60, Math.min(350, Number(e.target.value) || 120)),
                      maintainRatio: false
                    })
                  }
                  className="w-16 rounded border border-slate-200 px-1.5 py-1 text-right text-xs font-mono dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <input
                type="range"
                min="60"
                max="350"
                step="5"
                value={campaignData.height || 120}
                onChange={(e) =>
                  updateCampaign({ height: Number(e.target.value), maintainRatio: false })
                }
                className="w-full accent-[#0C3866] dark:accent-amber-400"
              />

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => updateCampaign({ fitMode: 'contain', maintainRatio: false })}
                  className={`rounded border px-2 py-1 text-[10px] font-semibold transition-all ${
                    (campaignData.fitMode || 'contain') === 'contain'
                      ? 'border-[#0C3866] bg-white text-[#0C3866] dark:border-amber-400 dark:bg-slate-800 dark:text-amber-400'
                      : 'border-slate-200 bg-white/70 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  Ajuster (sans rogner)
                </button>
                <button
                  type="button"
                  onClick={() => updateCampaign({ fitMode: 'cover', maintainRatio: false })}
                  className={`rounded border px-2 py-1 text-[10px] font-semibold transition-all ${
                    campaignData.fitMode === 'cover'
                      ? 'border-[#0C3866] bg-white text-[#0C3866] dark:border-amber-400 dark:bg-slate-800 dark:text-amber-400'
                      : 'border-slate-200 bg-white/70 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  Remplir (rognage auto)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Paramètres de lien et dates */}
        <div className="space-y-2.5">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Lien de redirection au clic
            </span>
            <input
              value={campaignData.linkUrl || ''}
              onChange={(e) => updateCampaign({ linkUrl: e.target.value })}
              placeholder="https://www.ragt-semences.fr/..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <Calendar className="h-3 w-3" /> Date de début
              </span>
              <input
                type="date"
                value={campaignData.startDate || ''}
                onChange={(e) => updateCampaign({ startDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
            <label className="block">
              <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                <Calendar className="h-3 w-3" /> Date de fin
              </span>
              <input
                type="date"
                min={campaignData.startDate || undefined}
                value={campaignData.endDate || ''}
                onChange={(e) => updateCampaign({ endDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Slogan */}
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-[#0C3866] dark:text-amber-400">
            <Quote className="h-4 w-4 text-[#F7BD00]" />
            Slogan
          </h3>
          <button
            type="button"
            onClick={() =>
              updateState((prev) => ({
                ...prev,
                visibility: { ...prev.visibility, slogan: !prev.visibility.slogan },
                slogan: { ...prev.slogan, enabled: !prev.visibility.slogan }
              }))
            }
            className="text-[11px] font-bold text-[#0C3866] dark:text-amber-400"
          >
            {visibility.slogan && slogan.enabled ? 'Masquer' : 'Afficher'}
          </button>
        </div>
        <textarea
          value={slogan.text}
          onChange={(event) => updateSlogan({ text: event.target.value })}
          rows={2}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
        />
        <div className="grid grid-cols-3 gap-2">
          <label>
            <span className="mb-1 block text-[10px] font-semibold">Taille</span>
            <input
              type="number"
              min="9"
              max="16"
              value={slogan.fontSize}
              onChange={(event) => updateSlogan({ fontSize: Number(event.target.value) || 11 })}
              className="w-full rounded border border-slate-200 px-2 py-1 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label>
            <span className="mb-1 block text-[10px] font-semibold">Couleur</span>
            <input
              type="color"
              aria-label="Couleur du slogan"
              value={slogan.color}
              onChange={(event) => updateSlogan({ color: event.target.value })}
              className="h-7 w-full rounded border border-slate-200"
            />
          </label>
          <label>
            <span className="mb-1 block text-[10px] font-semibold">Alignement</span>
            <select
              value={slogan.align}
              onChange={(event) => updateSlogan({ align: event.target.value as SloganConfig['align'] })}
              className="w-full rounded border border-slate-200 px-1 py-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </label>
        </div>
      </section>
    </div>
  );
};
