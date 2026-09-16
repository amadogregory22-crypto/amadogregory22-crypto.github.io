import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { SocialNetwork, SocialConfig, SocialIconStyle } from '../../types/signature';
import { getSocialIconDataUrl } from '../../utils/htmlGenerator';
import { UTMConfig } from '../../types/signature';
import {
  Share2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Sliders,
  ExternalLink,
  Activity,
  Sparkles
} from 'lucide-react';

export const SocialPanel: React.FC = () => {
  const { state, updateState } = useSignature();
  const { social, visibility, design, utm } = state;

  const updateUtm = (patch: Partial<UTMConfig>) => {
    updateState((prev) => ({
      ...prev,
      utm: {
        ...prev.utm,
        ...patch
      }
    }));
  };

  const updateSocialConfig = (patch: Partial<SocialConfig>) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        ...patch
      }
    }));
  };

  const updateNetwork = (id: string, patch: Partial<SocialNetwork>) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        items: prev.social.items.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        )
      }
    }));
  };

  const activeSocials = social.items.filter((item) => item.active);

  return (
    <div className="p-4 space-y-4 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-[#F7BD00]" />
          Réseaux sociaux professionnels
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Gérez les liens officiels RAGT Semences ou comptes régionaux.
        </p>
      </div>

      {/* Global Toggle & Style Settings */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800">Affichage du bloc réseaux :</span>
          <button
            type="button"
            onClick={() => updateState((prev) => ({
              ...prev,
              visibility: { ...prev.visibility, socials: !prev.visibility.socials }
            }))}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
              visibility.socials
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {visibility.socials ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{visibility.socials ? 'Visible' : 'Masqué'}</span>
          </button>
        </div>

        {/* Forme des pictogrammes */}
        <div>
          <label className="text-slate-600 font-semibold block mb-1">Forme des pictogrammes :</label>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { id: 'circle', label: 'Rond' },
              { id: 'square', label: 'Carré' },
              { id: 'outline', label: 'Contour' },
              { id: 'minimal', label: 'Minimal' },
              { id: 'filled', label: 'Plein' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  updateState((prev) => ({
                    ...prev,
                    social: {
                      ...prev.social,
                      iconStyle: st.id as any,
                      items: prev.social.items.map((item) => ({ ...item, iconStyle: st.id as any }))
                    }
                  }));
                }}
                className={`py-1.5 px-1 rounded-lg border text-center text-xs font-semibold ${
                  (social.iconStyle || 'circle') === st.id
                    ? 'bg-[#0C3866] text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* 18.2 Style des labels */}
        <div>
          <label className="text-slate-600 font-semibold block mb-1">Format d'affichage :</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'icons-only', label: 'Icônes seules' },
              { id: 'icons-text', label: 'Icône + Nom' },
              { id: 'text-only', label: 'Texte seul' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateSocialConfig({ style: st.id as any })}
                className={`py-1.5 px-2 rounded-lg border text-center ${
                  social.style === st.id
                    ? 'bg-[#0C3866] text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-600 font-semibold block mb-1">Alignement :</label>
          <p className="text-[10px] text-slate-500 mb-1.5">Détermine la position relative au QR code (si présent).</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'left', label: 'À gauche' },
              { id: 'center', label: 'Au milieu' },
              { id: 'right', label: 'À droite' }
            ].map((al) => (
              <button
                key={al.id}
                type="button"
                onClick={() => updateSocialConfig({ align: al.id as any })}
                className={`py-1.5 px-2 rounded-lg border text-center ${
                  social.align === al.id
                    ? 'bg-[#0C3866] text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {al.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size & Spacing sliders */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Taille des icônes :</span>
              <span className="font-mono font-bold text-[#0C3866]">{social.iconSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="28"
              step="1"
              value={social.iconSize}
              onChange={(e) => updateSocialConfig({ iconSize: Number(e.target.value) })}
              className="w-full accent-[#0C3866]"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Espacement :</span>
              <span className="font-mono font-bold text-[#0C3866]">{social.spacing}px</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="1"
              value={social.spacing}
              onChange={(e) => updateSocialConfig({ spacing: Number(e.target.value) })}
              className="w-full accent-[#0C3866]"
            />
          </div>
        </div>

        {/* Couleurs des pictogrammes */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-slate-600 font-semibold">Mode couleur :</label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => {
                  updateState((prev) => ({
                    ...prev,
                    social: {
                      ...prev.social,
                      useBrandColors: false,
                      items: prev.social.items.map((item) => ({ ...item, color: prev.social.color || '#0C3866' }))
                    }
                  }));
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  !social.useBrandColors
                    ? 'bg-[#0C3866] text-white border-[#0C3866]'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Unifiée
              </button>
              <button
                type="button"
                onClick={() => {
                  const BRAND_COLORS: Record<string, string> = {
                    linkedin: '#0077B5',
                    facebook: '#1877F2',
                    instagram: '#E4405F',
                    youtube: '#CD201F',
                    x: '#000000',
                    tiktok: '#010101',
                    website: '#0C3866',
                    web: '#0C3866',
                    custom: '#0C3866'
                  };
                  updateState((prev) => ({
                    ...prev,
                    social: {
                      ...prev.social,
                      useBrandColors: true,
                      items: prev.social.items.map((item) => ({
                        ...item,
                        color: BRAND_COLORS[item.id] || item.color || '#0C3866'
                      }))
                    }
                  }));
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border flex items-center gap-1 ${
                  social.useBrandColors
                    ? 'bg-[#0C3866] text-white border-[#0C3866]'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#F7BD00]" />
                Marques
              </button>
            </div>
          </div>

          {!social.useBrandColors && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={social.color || '#0C3866'}
                  onChange={(e) => {
                    const c = e.target.value;
                    updateState((prev) => ({
                      ...prev,
                      social: {
                        ...prev.social,
                        color: c,
                        items: prev.social.items.map((item) => ({ ...item, color: c }))
                      }
                    }));
                  }}
                  className="w-7 h-7 rounded border cursor-pointer"
                />
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: 'Bleu RAGT', value: '#0C3866' },
                    { label: 'Or RAGT', value: '#F7BD00' },
                    { label: 'Blanc', value: '#FFFFFF' },
                    { label: 'Ardoise', value: '#334155' }
                  ].map((qc) => (
                    <button
                      key={qc.value}
                      type="button"
                      onClick={() => {
                        updateState((prev) => ({
                          ...prev,
                          social: {
                            ...prev.social,
                            color: qc.value,
                            items: prev.social.items.map((item) => ({ ...item, color: qc.value }))
                          }
                        }));
                      }}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: qc.value }} />
                      <span>{qc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Block */}
      {visibility.socials && activeSocials.length > 0 && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-700 block mb-2">Aperçu en direct :</label>
          <div className="flex flex-wrap items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm" style={{ gap: `${social.spacing}px` }}>
            {activeSocials.map(item => {
              const itemColor = social.useBrandColors ? (item.color || '#0C3866') : (social.color || item.color || '#0C3866');
              const itemStyle = item.iconStyle || social.iconStyle || 'circle';
              const iconDataUrl = getSocialIconDataUrl(item.id, itemColor, itemStyle, '#FDC420');
              return (
                <div key={item.id} className="flex items-center gap-1">
                  <img src={iconDataUrl} alt={item.name} style={{ width: social.iconSize, height: social.iconSize }} />
                  {social.style === 'icons-text' && (
                    <span style={{ fontSize: '11px', fontFamily: design.typography.baseFont, color: design.colors.muted }}>
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 18.1 Liste des réseaux sociaux individuels */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 block">
          Réseaux configurés :
        </label>
        <div className="space-y-2">
          {social.items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all text-xs ${
                item.active
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50/60 border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Custom color picker */}
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) => updateNetwork(item.id, { color: e.target.value })}
                    title="Changer la couleur de l'icône"
                    className="w-5 h-5 rounded border cursor-pointer"
                  />

                  {/* Active Toggle */}
                  <button
                    type="button"
                    onClick={() => updateNetwork(item.id, { active: !item.active })}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
                      item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{item.active ? 'Actif' : 'Inactif'}</span>
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateNetwork(item.id, { url: e.target.value })}
                  placeholder={`Lien vers la page ${item.name}`}
                  className="w-full px-2 py-1 border rounded bg-slate-50 font-mono text-[11px] text-blue-700 focus:bg-white"
                />
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-slate-400 hover:text-blue-600"
                    title="Ouvrir le lien dans un nouvel onglet"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UTM Tracking (Link Builder) */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#0C3866]" />
            <span className="font-bold text-slate-800">Suivi des clics (UTM)</span>
          </div>
          <button
            type="button"
            onClick={() => updateUtm({ enabled: !utm?.enabled })}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
              utm?.enabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {utm?.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{utm?.enabled ? 'Activé' : 'Désactivé'}</span>
          </button>
        </div>
        
        {utm?.enabled && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-500 mb-2">Ajoute automatiquement ces paramètres à tous les liens de la signature (Site web, Réseaux, Bannière).</p>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Source (utm_source) :</label>
                <input
                  type="text"
                  value={utm.source}
                  onChange={(e) => updateUtm({ source: e.target.value })}
                  placeholder="email_signature"
                  className="w-full px-2 py-1.5 border rounded bg-slate-50 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Médium (utm_medium) :</label>
                <input
                  type="text"
                  value={utm.medium}
                  onChange={(e) => updateUtm({ medium: e.target.value })}
                  placeholder="email"
                  className="w-full px-2 py-1.5 border rounded bg-slate-50 font-mono text-[11px]"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-600 font-semibold block mb-1">Campagne (utm_campaign) :</label>
              <input
                type="text"
                value={utm.campaign}
                onChange={(e) => updateUtm({ campaign: e.target.value })}
                placeholder="nom_de_campagne"
                className="w-full px-2 py-1.5 border rounded bg-slate-50 font-mono text-[11px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
