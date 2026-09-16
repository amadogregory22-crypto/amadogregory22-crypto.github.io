import React from 'react';
import { Flag, Quote } from 'lucide-react';
import { useSignature } from '../../context/SignatureContext';
import { CampaignConfig, SloganConfig } from '../../types/signature';

const CAMPAIGNS = [
  { title: 'Salon & événements', campaign: 'Actualités RAGT', url: '/assets/bannieres/046805_BD.jpg' },
  { title: 'Innovation variétale', campaign: 'Génétique & performance', url: '/assets/bannieres/046806_BD.jpg' },
  { title: 'Recrutement', campaign: 'Rejoignez RAGT Semences', url: '/assets/bannieres/046807_BD.jpg' }
];

export const CampaignPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { banner, slogan, visibility } = state;

  const campaignData: CampaignConfig = state.campaign || {
    enabled: Boolean((visibility.campaign ?? visibility.banner) && banner.enabled && banner.campaignName),
    title: banner.campaignName ? banner.title : CAMPAIGNS[1].title,
    campaignName: banner.campaignName || CAMPAIGNS[1].campaign,
    altText: banner.campaignName ? banner.altText : CAMPAIGNS[1].title,
    imageUrl: banner.campaignName ? banner.imageUrl : CAMPAIGNS[1].url,
    width: state.layout.dimensions.totalWidth,
    height: 90,
    linkUrl: banner.linkUrl || '',
    startDate: banner.startDate || '',
    endDate: banner.endDate || ''
  };

  const isCampaignEnabled = state.campaign
    ? Boolean(state.campaign.enabled && (visibility.campaign ?? true))
    : Boolean(visibility.banner && banner.enabled && banner.campaignName);

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

  const handleSelectCampaign = (item: typeof CAMPAIGNS[number]) => {
    updateState((prev) => {
      // If prev.banner was overwritten by a campaign image, restore card image in layout-i
      let restoredBanner = prev.banner;
      if (prev.layout.preset === 'layout-i' && (prev.banner.campaignName || prev.banner.position === 'bottom')) {
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

      return {
        ...prev,
        banner: restoredBanner,
        visibility: {
          ...prev.visibility,
          campaign: true
        },
        campaign: {
          enabled: true,
          title: item.title,
          campaignName: item.campaign,
          altText: item.title,
          imageUrl: item.url,
          width: prev.layout.dimensions.totalWidth,
          height: prev.campaign?.height || 90,
          linkUrl: prev.campaign?.linkUrl || '',
          startDate: prev.campaign?.startDate || '',
          endDate: prev.campaign?.endDate || ''
        }
      };
    });
    showToast(`Campagne « ${item.title} » appliquée`, 'success');
  };

  const handleToggle = () => {
    const nextState = !isCampaignEnabled;
    updateCampaign({ enabled: nextState });
    showToast(nextState ? 'Bandeau de campagne affiché sous la signature' : 'Campagne masquée', 'info');
  };

  return (
    <div className="space-y-5 p-4 text-slate-800 dark:text-slate-200">
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
              <Flag className="h-4 w-4 text-[#F7BD00]" /> Campagnes
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Un bandeau pleine largeur positionné sous la signature, limité à 90 px de haut.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
              isCampaignEnabled
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-600 dark:text-emerald-300'
                : 'border-slate-200 text-slate-600 dark:border-slate-600 dark:text-slate-400'
            }`}
          >
            {isCampaignEnabled ? 'Affichée' : 'Masquée'}
          </button>
        </div>

        {/* Cartes de sélection des campagnes */}
        <div className="grid grid-cols-3 gap-2">
          {CAMPAIGNS.map((item) => {
            const isSelected = isCampaignEnabled && campaignData.imageUrl === item.url;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => handleSelectCampaign(item)}
                className={`rounded-lg border p-1.5 text-left transition-all ${
                  isSelected
                    ? 'border-[#0C3866] ring-2 ring-[#0C3866]/20 bg-amber-50/40 dark:bg-slate-700 dark:border-amber-400'
                    : 'border-slate-200 hover:border-[#0C3866] dark:border-slate-700'
                }`}
              >
                <img src={item.url} alt="" className="mb-1 h-12 w-full rounded object-cover" />
                <span className="block truncate text-[10px] font-bold">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Paramètres de la campagne */}
        <div className="grid grid-cols-2 gap-2">
          <label>
            <span className="mb-1 block text-[11px] font-semibold">Lien au clic</span>
            <input
              value={campaignData.linkUrl || ''}
              onChange={(e) => updateCampaign({ linkUrl: e.target.value })}
              placeholder="https://…"
              className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label>
            <span className="mb-1 block text-[11px] font-semibold">Hauteur (20–90 px)</span>
            <input
              type="number"
              min="20"
              max="90"
              value={Math.min(90, campaignData.height || 90)}
              onChange={(e) =>
                updateCampaign({ height: Math.min(90, Math.max(20, Number(e.target.value) || 20)) })
              }
              className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label>
            <span className="mb-1 block text-[11px] font-semibold">Début</span>
            <input
              type="date"
              value={campaignData.startDate || ''}
              onChange={(e) => updateCampaign({ startDate: e.target.value })}
              className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label>
            <span className="mb-1 block text-[11px] font-semibold">Fin</span>
            <input
              type="date"
              min={campaignData.startDate || undefined}
              value={campaignData.endDate || ''}
              onChange={(e) => updateCampaign({ endDate: e.target.value })}
              className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
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
