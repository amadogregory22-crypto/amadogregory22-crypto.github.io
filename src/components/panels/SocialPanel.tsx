import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { SocialNetwork, SocialConfig } from '../../types/signature';
import { getSocialIconDataUrl } from '../../utils/htmlGenerator';
import { UTMConfig } from '../../types/signature';
import {
  Share2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Sliders,
  ExternalLink,
  Activity
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
              min="14"
              max="24"
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
              max="16"
              step="1"
              value={social.spacing}
              onChange={(e) => updateSocialConfig({ spacing: Number(e.target.value) })}
              className="w-full accent-[#0C3866]"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Block */}
      {visibility.socials && activeSocials.length > 0 && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-700 block mb-2">Aperçu en direct :</label>
          <div className="flex flex-wrap items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm" style={{ gap: `${social.spacing}px` }}>
            {activeSocials.map(item => {
              const iconDataUrl = getSocialIconDataUrl(item.id, design.colors.icons || item.color || '#0C3866');
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
