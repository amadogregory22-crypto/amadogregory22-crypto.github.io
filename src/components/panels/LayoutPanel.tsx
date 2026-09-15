import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { LayoutPreset, BlockOrderKey } from '../../types/signature';
import { ISO_9001_LOGO_SVG, HVE_LOGO_SVG } from '../../constants/logos';
import { DesktopLayoutMiniature, MobileLayoutMiniature } from '../layout/LayoutMiniatures';
import {
  Columns,
  Rows,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sliders,
  Sparkles,
  LayoutTemplate,
  Maximize,
  Move,
  ListOrdered,
  Monitor,
  Smartphone,
  Award,
  ShieldCheck,
  Leaf,
  Check,
  ExternalLink
} from 'lucide-react';

export const LayoutPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { layout, visibility, logos } = state;
  const p = layout.dimensions;
  const sep = layout.separator;
  
  const [activeSubTab, setActiveSubTab] = useState<'structure' | 'badges' | 'dimensions' | 'alignments' | 'order'>('structure');

  const handlePresetSelect = (preset: LayoutPreset) => {
    updateState((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        preset
      }
    }));
  };

  const handleToggleBadge = (enabled: boolean) => {
    updateState((prev) => {
      const currentUrl = prev.logos.secondary?.url;
      const fallbackSecondary = !currentUrl ? {
        id: 'iso-9001',
        label: 'AFAQ ISO 9001 Qualité Certifiée',
        url: ISO_9001_LOGO_SVG,
        alt: 'AFAQ ISO 9001 Qualité Certifiée RAGT',
        width: 96,
        height: 48,
        keepRatio: true,
        linkUrl: 'https://www.ragt-semences.fr',
        align: 'left' as const,
        visible: true
      } : prev.logos.secondary;

      return {
        ...prev,
        visibility: {
          ...prev.visibility,
          secondaryLogo: enabled
        },
        logos: {
          ...prev.logos,
          secondary: {
            ...fallbackSecondary,
            visible: enabled
          }
        }
      };
    });
    showToast(enabled ? 'Badge officiel activé sur la signature' : 'Badge masqué de la signature', 'info');
  };

  const handleSelectBadgeType = (type: 'certified' | 'sustainable') => {
    if (type === 'certified') {
      updateState((prev) => ({
        ...prev,
        visibility: {
          ...prev.visibility,
          secondaryLogo: true
        },
        logos: {
          ...prev.logos,
          secondary: {
            id: 'iso-9001',
            label: 'AFAQ ISO 9001 Qualité Certifiée',
            url: ISO_9001_LOGO_SVG,
            alt: 'AFAQ ISO 9001 Qualité Certifiée RAGT',
            width: 96,
            height: 48,
            keepRatio: true,
            linkUrl: 'https://www.ragt-semences.fr',
            align: 'left',
            visible: true
          }
        }
      }));
      showToast('Badge « Certifié Qualité (ISO 9001) » appliqué', 'success');
    } else {
      updateState((prev) => ({
        ...prev,
        visibility: {
          ...prev.visibility,
          secondaryLogo: true
        },
        logos: {
          ...prev.logos,
          secondary: {
            id: 'hve-sustainable',
            label: 'Certification HVE - Agriculture Durable',
            url: HVE_LOGO_SVG,
            alt: 'Haute Valeur Environnementale (HVE) RAGT',
            width: 96,
            height: 48,
            keepRatio: true,
            linkUrl: 'https://www.ragt-semences.fr',
            align: 'left',
            visible: true
          }
        }
      }));
      showToast('Badge « Développement Durable (HVE) » appliqué', 'success');
    }
  };

  const isCurrentCertified = logos.secondary?.url === ISO_9001_LOGO_SVG || (logos.secondary?.alt && logos.secondary.alt.includes('ISO'));
  const isCurrentSustainable = logos.secondary?.url === HVE_LOGO_SVG || (logos.secondary?.alt && (logos.secondary.alt.includes('HVE') || logos.secondary.alt.includes('Durable')));

  const handleDimensionChange = (key: keyof typeof p, value: number) => {
    updateState((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        dimensions: {
          ...prev.layout.dimensions,
          [key]: value
        }
      }
    }));
  };

  const handleSeparatorChange = (patch: Partial<typeof sep>) => {
    updateState((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        separator: {
          ...prev.layout.separator,
          ...patch
        }
      }
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= layout.blockOrder.length) return;

    const newOrder = [...layout.blockOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    updateState((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        blockOrder: newOrder
      }
    }));
  };

  const blockLabels: Record<BlockOrderKey, string> = {
    logo: 'Logo institutionnel',
    identity: 'Nom & Prénom',
    job: 'Poste & Service',
    company: 'Entreprise & Filiale',
    coordinates: 'Coordonnées (Tél, Mail, Adr)',
    social: 'Réseaux sociaux',
    qr: 'QR Code vCard',
    slogan: 'Slogan RAGT',
    banner: 'Bannière campagne'
  };

  return (
    <div className="p-4 space-y-5 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
          <Columns className="w-4 h-4 text-[#F7BD00]" />
          Structure générale &amp; Disposition
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Sélectionnez l’agencement global sans modifier vos données.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-medium overflow-x-auto hide-scrollbar">
        {[
          { id: 'structure', label: 'Modèles', icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
          { id: 'badges', label: 'Badges RAGT', icon: <Award className="w-3.5 h-3.5" /> },
          { id: 'dimensions', label: 'Dimensions', icon: <Maximize className="w-3.5 h-3.5" /> },
          { id: 'alignments', label: 'Position', icon: <Move className="w-3.5 h-3.5" /> },
          { id: 'order', label: 'Ordre', icon: <ListOrdered className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-1.5 flex-1 justify-center py-2 px-2 rounded-md whitespace-nowrap transition-colors ${
              activeSubTab === tab.id ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 8.1 Presets Modèle A à I */}
      {activeSubTab === 'structure' && (
      <div className="space-y-4">
        {/* Quick Toggle: Corporate Badges 'Certified' / 'Sustainable' */}
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                  Badges RAGT Corporate
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {visibility.secondaryLogo ? 'Badge actif sur la signature' : 'Badge masqué'}
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!visibility.secondaryLogo}
                onChange={(e) => handleToggleBadge(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[2.5px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0C3866]"></div>
            </label>
          </div>

          {visibility.secondaryLogo && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate pr-2">
                Badge : <strong className="text-[#0C3866] dark:text-amber-400">{isCurrentSustainable ? 'Développement Durable (HVE)' : 'Certifié Qualité (ISO 9001)'}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveSubTab('badges')}
                className="text-[11px] text-[#0C3866] dark:text-amber-400 font-semibold hover:underline shrink-0"
              >
                Gérer &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Desktop Layouts */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-[#0C3866] dark:text-amber-400" />
              Modèles Ordinateur (Formats Horizontaux Outlook & Web)
            </label>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              6 dispositions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'layout-a', label: 'Modèle A — Classique', desc: 'Logo à gauche, séparateur vertical doré, coordonnées à droite' },
              { id: 'layout-b', label: 'Modèle B — Inversé', desc: 'Coordonnées à gauche, séparateur vertical, logo à droite' },
              { id: 'layout-e', label: 'Modèle E — 3 Colonnes & QR', desc: 'Logo gauche, coordonnées centre, QR code vCard latéral droit' },
              { id: 'layout-f', label: 'Modèle F — Compact Épuré', desc: 'Logo compact et 2 lignes directes pour réponses rapides' },
              { id: 'layout-h', label: 'Modèle H — Avec Bannière', desc: 'Disposition standard complétée par un bandeau de campagne' },
              { id: 'layout-i', label: 'Modèle I — Carte RAGT Institutionnelle', desc: 'Structure carte : logo gauche, photo au centre avec votre signature, réseaux droite' }
            ].map((item) => {
              const isSelected = layout.preset === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePresetSelect(item.id as LayoutPreset)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#0C3866] dark:border-amber-400 bg-white dark:bg-slate-800 ring-2 ring-[#0C3866]/20 dark:ring-amber-400/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs'
                  }`}
                >
                  {/* Miniature diagram illustrating spatial positioning */}
                  <DesktopLayoutMiniature preset={item.id as LayoutPreset} active={isSelected} />

                  <div className="mt-2.5 flex items-start justify-between gap-1.5 w-full">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span className="truncate">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    {isSelected ? (
                      <span className="shrink-0 w-4 h-4 rounded-full bg-[#0C3866] dark:bg-amber-400 text-white dark:text-slate-950 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="shrink-0 w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-[#0C3866]/40" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Layouts - Entièrement refaits pour écrans smartphones */}
        <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Modèles Téléphone (Formats Verticaux & Responsives)
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Spécifiquement dessinés pour éviter toute déformation sur iPhone et Android.
              </p>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              100% Mobile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'layout-c',
                label: 'Modèle C',
                title: 'Vertical Empilé',
                desc: 'Logo en haut, séparateur doré horizontal et coordonnées empilées en dessous.'
              },
              {
                id: 'layout-d',
                label: 'Modèle D',
                title: 'Centré Institutionnel',
                desc: 'Logo et coordonnées parfaitement alignés au centre pour un rendu sobre et épuré.'
              },
              {
                id: 'layout-g',
                label: 'Modèle G',
                title: 'Carte Mobile-First',
                desc: 'Structure carte de visite digitale avec boutons contacts tactiles anti-écrasement.'
              }
            ].map((item) => {
              const isSelected = layout.preset === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePresetSelect(item.id as LayoutPreset)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col items-center group ${
                    isSelected
                      ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs'
                  }`}
                >
                  {/* Phone Silhouette Miniature - Strictly proportional, non-deformed */}
                  <div className="py-1">
                    <MobileLayoutMiniature preset={item.id as LayoutPreset} active={isSelected} />
                  </div>

                  {/* Details */}
                  <div className="w-full mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1 text-center">
                      {item.desc}
                    </p>

                    <div className="mt-2.5 flex justify-center">
                      {isSelected ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                          <span>✓</span> Modèle actif
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                          Choisir ce modèle
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Badges & Certifications RAGT SubTab */}
      {activeSubTab === 'badges' && (
      <div className="space-y-4">
        {/* Main Badge Toggle Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Badge Corporate sur la signature
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Afficher ou masquer l'overlay de certification RAGT
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!visibility.secondaryLogo}
                onChange={(e) => handleToggleBadge(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0C3866]"></div>
            </label>
          </div>

          <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
            {visibility.secondaryLogo ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Badge visible sur la signature (Outlook & Mobile)
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <EyeOff className="w-3.5 h-3.5" />
                Badge masqué — activez l'interrupteur ci-dessus pour l'afficher
              </span>
            )}
          </div>
        </div>

        {/* Corporate Badges Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wide">
            Choisir le badge officiel RAGT :
          </label>

          {/* Option 1: Certified Quality ISO 9001 */}
          <div
            onClick={() => handleSelectBadgeType('certified')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              isCurrentCertified && visibility.secondaryLogo
                ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20 ring-1 ring-[#0C3866] dark:ring-amber-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[#0C3866] dark:text-blue-300 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Badge « Certifié Qualité » (ISO 9001)
                    </h5>
                    {isCurrentCertified && visibility.secondaryLogo && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#0C3866] text-white rounded">
                        Sélectionné
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Norme internationale AFAQ ISO 9001. Atteste de la conformité rigoureuse du management qualité et des semences RAGT.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Visual Preview */}
            <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <img src={ISO_9001_LOGO_SVG} alt="ISO 9001 Qualité Certifiée" className="h-10 object-contain" />
            </div>
          </div>

          {/* Option 2: Sustainable Development HVE */}
          <div
            onClick={() => handleSelectBadgeType('sustainable')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              isCurrentSustainable && visibility.secondaryLogo
                ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-600 dark:ring-emerald-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      Badge « Développement Durable » (HVE)
                    </h5>
                    {isCurrentSustainable && visibility.secondaryLogo && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-700 text-white rounded">
                        Sélectionné
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Haute Valeur Environnementale (HVE) &amp; Agriculture Durable. Valorise l'engagement RSE et la biodiversité des filières RAGT.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Preview */}
            <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <img src={HVE_LOGO_SVG} alt="HVE Haute Valeur Environnementale" className="h-10 object-contain" />
            </div>
          </div>
        </div>

        {/* Badge Sizing & Link Configuration */}
        {visibility.secondaryLogo && (
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Paramètres du badge
            </h5>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Largeur d'affichage :</span>
              <span className="font-mono font-bold text-[#0C3866] dark:text-amber-400">{logos.secondary.width}px</span>
            </div>
            <input
              type="range"
              min="60"
              max="140"
              step="4"
              value={logos.secondary.width}
              onChange={(e) => {
                const w = Number(e.target.value);
                const h = Math.round(w / 2);
                updateState((prev) => ({
                  ...prev,
                  logos: {
                    ...prev.logos,
                    secondary: {
                      ...prev.logos.secondary,
                      width: w,
                      height: h
                    }
                  }
                }));
              }}
              className="w-full accent-[#0C3866] cursor-pointer"
            />

            <div>
              <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">
                Lien web au clic sur le badge :
              </label>
              <input
                type="text"
                value={logos.secondary.linkUrl || ''}
                onChange={(e) => {
                  const url = e.target.value;
                  updateState((prev) => ({
                    ...prev,
                    logos: {
                      ...prev.logos,
                      secondary: {
                        ...prev.logos.secondary,
                        linkUrl: url
                      }
                    }
                  }));
                }}
                placeholder="https://www.ragt-semences.fr"
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        )}
      </div>
      )}

      {/* 8.2 Dimensions Sliders + Numeric inputs */}
      {activeSubTab === 'dimensions' && (
      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#0C3866] dark:text-amber-400" />
            Dimensions &amp; Espacements (px)
          </label>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Max 650px (Outlook)</span>
        </div>

        {/* Largeur totale */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-400">Largeur totale :</span>
            <input
              type="number"
              value={p.totalWidth}
              onChange={(e) => handleDimensionChange('totalWidth', Number(e.target.value))}
              className="w-16 text-right px-1.5 py-0.5 text-xs font-mono font-bold text-[#0C3866] dark:text-amber-400 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900"
            />
          </div>
          <input
            type="range"
            min="320"
            max="650"
            step="10"
            value={p.totalWidth}
            onChange={(e) => handleDimensionChange('totalWidth', Number(e.target.value))}
            className="w-full accent-[#0C3866] cursor-pointer"
          />
        </div>

        {/* Colonne logo */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Largeur colonne logo :</span>
            <input
              type="number"
              value={p.logoColumnWidth}
              onChange={(e) => handleDimensionChange('logoColumnWidth', Number(e.target.value))}
              className="w-16 text-right px-1.5 py-0.5 text-xs font-mono font-bold text-[#0C3866] border rounded bg-white"
            />
          </div>
          <input
            type="range"
            min="90"
            max="220"
            step="5"
            value={p.logoColumnWidth}
            onChange={(e) => handleDimensionChange('logoColumnWidth', Number(e.target.value))}
            className="w-full accent-[#0C3866] cursor-pointer"
          />
        </div>

        {/* Espacement intérieur */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600">Espacement intérieur (gap) :</span>
            <input
              type="number"
              value={p.innerSpacing}
              onChange={(e) => handleDimensionChange('innerSpacing', Number(e.target.value))}
              className="w-16 text-right px-1.5 py-0.5 text-xs font-mono font-bold text-[#0C3866] border rounded bg-white"
            />
          </div>
          <input
            type="range"
            min="6"
            max="30"
            step="2"
            value={p.innerSpacing}
            onChange={(e) => handleDimensionChange('innerSpacing', Number(e.target.value))}
            className="w-full accent-[#0C3866] cursor-pointer"
          />
        </div>

        {/* Paddings */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
          <div>
            <label className="text-[11px] text-slate-600 block">Padding V (px) :</label>
            <input
              type="number"
              min="0"
              max="40"
              value={p.paddingTop}
              onChange={(e) => {
                const val = Number(e.target.value);
                handleDimensionChange('paddingTop', val);
                handleDimensionChange('paddingBottom', val);
              }}
              className="w-full px-2 py-1 text-xs border rounded bg-white font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-600 block">Padding H (px) :</label>
            <input
              type="number"
              min="0"
              max="40"
              value={p.paddingLeft}
              onChange={(e) => {
                const val = Number(e.target.value);
                handleDimensionChange('paddingLeft', val);
                handleDimensionChange('paddingRight', val);
              }}
              className="w-full px-2 py-1 text-xs border rounded bg-white font-mono"
            />
          </div>
        </div>
      </div>
      )}

      {activeSubTab === 'alignments' && (
      <div className="space-y-6">
      {/* 8.3 Alignement */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 block">Alignements :</label>
        <div className="grid grid-cols-2 gap-2">
          {/* Horizontal */}
          <div>
            <span className="text-[11px] text-slate-500 block mb-1">Horizontal :</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => updateState((prev) => ({ ...prev, layout: { ...prev.layout, alignH: align } }))}
                  className={`flex-1 py-1 text-xs font-medium rounded capitalize flex justify-center ${
                    layout.alignH === align ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {align === 'left' ? 'Gauche' : align === 'center' ? 'Centre' : 'Droite'}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical */}
          <div>
            <span className="text-[11px] text-slate-500 block mb-1">Vertical :</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(['top', 'middle', 'bottom'] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => updateState((prev) => ({ ...prev, layout: { ...prev.layout, alignV: align } }))}
                  className={`flex-1 py-1 text-xs font-medium rounded capitalize flex justify-center ${
                    layout.alignV === align ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {align === 'top' ? 'Haut' : align === 'middle' ? 'Milieu' : 'Bas'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 8.4 Séparateurs */}
      <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <label className="text-xs font-semibold text-slate-700 block">
          Filet séparateur :
        </label>
        <div className="flex bg-white p-0.5 rounded-lg border border-slate-200 text-xs">
          {[
            { id: 'none', label: 'Aucun' },
            { id: 'vertical', label: 'Vertical' },
            { id: 'horizontal', label: 'Horizontal' }
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSeparatorChange({ type: s.id as any })}
              className={`flex-1 py-1 font-medium rounded ${
                sep.type === s.id ? 'bg-[#0C3866] text-white font-bold' : 'text-slate-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {sep.type !== 'none' && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
            <div>
              <label className="text-[11px] text-slate-600 block">Couleur :</label>
              <div className="flex items-center gap-1 mt-0.5">
                <input
                  type="color"
                  value={sep.color}
                  onChange={(e) => handleSeparatorChange({ color: e.target.value })}
                  className="w-7 h-7 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={sep.color}
                  onChange={(e) => handleSeparatorChange({ color: e.target.value })}
                  className="w-full text-[11px] font-mono px-1 py-0.5 border rounded bg-white uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-600 block">Épaisseur (px) :</label>
              <input
                type="number"
                min="1"
                max="8"
                value={sep.thickness}
                onChange={(e) => handleSeparatorChange({ thickness: Number(e.target.value) })}
                className="w-full text-xs px-2 py-1 border rounded bg-white font-mono mt-0.5"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-600 block">Style :</label>
              <select
                value={sep.style}
                onChange={(e) => handleSeparatorChange({ style: e.target.value as any })}
                className="w-full text-xs px-2 py-1 border rounded bg-white mt-0.5"
              >
                <option value="solid">Continu</option>
                <option value="dashed">Tirets</option>
                <option value="dotted">Pointillés</option>
              </select>
            </div>
          </div>
        )}
      </div>
      </div>
      )}

      {activeSubTab === 'order' && (
      <div className="space-y-2">
        {/* 8.5 Ordre des blocs (Boutons monter / descendre) */}
        <label className="text-xs font-semibold text-slate-700 block">
          Ordre des éléments dans la signature :
        </label>
        <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {layout.blockOrder.map((key, index) => (
            <div
              key={key}
              className="flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-50 transition-colors"
            >
              <span className="font-medium text-slate-700">
                {index + 1}. {blockLabels[key] || key}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveBlock(index, 'up')}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Monter"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === layout.blockOrder.length - 1}
                  onClick={() => moveBlock(index, 'down')}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Descendre"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};
