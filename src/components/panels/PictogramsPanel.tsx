import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { getContactIconDataUrl, getSocialIconDataUrl } from '../../utils/htmlGenerator';
import { SocialIconStyle } from '../../types/signature';
import {
  Palette,
  Phone,
  Share2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ExternalLink,
  Sparkles
} from 'lucide-react';

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

export const PictogramsPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { iconSettings, design, social, visibility } = state;
  const [activeCategory, setActiveCategory] = useState<'contact' | 'social'>('contact');
  const [previewBg, setPreviewBg] = useState<'white' | 'yellow' | 'navy'>('white');

  const contactStyleOptions = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'outline', label: 'Contour' },
    { id: 'filled', label: 'Plein' },
    { id: 'circle', label: 'Rond' },
    { id: 'square', label: 'Carré' }
  ] as const;

  const socialStyleOptions: Array<{ id: SocialIconStyle; label: string }> = [
    { id: 'circle', label: 'Rond' },
    { id: 'square', label: 'Carré' },
    { id: 'outline', label: 'Contour' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'filled', label: 'Plein' }
  ];

  const quickColors = [
    { label: 'Bleu RAGT', value: '#0C3866' },
    { label: 'Or RAGT', value: '#F7BD00' },
    { label: 'Blanc', value: '#FFFFFF' },
    { label: 'Gris Ardoise', value: '#334155' },
    { label: 'Vert Durable', value: '#15803D' }
  ];

  // Contact handlers
  const handleContactStyleChange = (style: typeof contactStyleOptions[number]['id']) => {
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, style }
    }));
    showToast(`Style coordonnées « ${style} » appliqué`, 'info');
  };

  const handleContactColorChange = (color: string) => {
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

  const handleContactSizeChange = (size: number) => {
    const clamped = Math.min(28, Math.max(10, size));
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, size: clamped }
    }));
  };

  const handleContactSpacingChange = (spacing: number) => {
    const clamped = Math.min(20, Math.max(0, spacing));
    updateState((prev) => ({
      ...prev,
      iconSettings: { ...prev.iconSettings, spacing: clamped }
    }));
  };

  // Social handlers
  const currentSocialStyle = social.iconStyle || social.items.find((i) => i.active)?.iconStyle || 'circle';

  const handleSocialStyleChange = (style: SocialIconStyle) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        iconStyle: style,
        items: prev.social.items.map((item) => ({ ...item, iconStyle: style }))
      }
    }));
    showToast(`Style réseaux « ${style} » appliqué`, 'info');
  };

  const handleSocialSizeChange = (iconSize: number) => {
    const clamped = Math.min(28, Math.max(12, iconSize));
    updateState((prev) => ({
      ...prev,
      social: { ...prev.social, iconSize: clamped }
    }));
  };

  const handleSocialSpacingChange = (spacing: number) => {
    const clamped = Math.min(24, Math.max(2, spacing));
    updateState((prev) => ({
      ...prev,
      social: { ...prev.social, spacing: clamped }
    }));
  };

  const handleSocialColorChange = (color: string) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        color,
        useBrandColors: false,
        items: prev.social.items.map((item) => ({ ...item, color }))
      }
    }));
  };

  const handleApplyBrandColors = () => {
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
    showToast('Couleurs officielles de marque appliquées', 'success');
  };

  const handleNetworkToggle = (id: string) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        items: prev.social.items.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item
        )
      }
    }));
  };

  const handleNetworkUrlChange = (id: string, url: string) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        items: prev.social.items.map((item) =>
          item.id === id ? { ...item, url } : item
        )
      }
    }));
  };

  const handleNetworkColorChange = (id: string, color: string) => {
    updateState((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        useBrandColors: false,
        items: prev.social.items.map((item) =>
          item.id === id ? { ...item, color } : item
        )
      }
    }));
  };

  const effectiveContactColor = design.colors.icons || iconSettings.color || '#0C3866';
  const effectiveSocialColor = social.color || '#0C3866';
  const activeSocialItems = social.items.filter((item) => item.active);

  const previewBgStyles = {
    white: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700',
    yellow: 'bg-[#FDC420] border-[#E5AF1B] text-[#0C3866]',
    navy: 'bg-[#0C3866] border-[#082749] text-white'
  };

  return (
    <div className="space-y-4 p-4 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
          <Palette className="h-4 w-4 text-[#F7BD00]" /> Pictogrammes &amp; Icônes
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Personnalisez la forme, la taille et les teintes de l’ensemble des pictogrammes de votre signature.
        </p>
      </div>

      {/* Category Tabs: Coordonnées vs Réseaux sociaux */}
      <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-200/80 p-1 dark:bg-slate-800">
        <button
          type="button"
          onClick={() => setActiveCategory('contact')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
            activeCategory === 'contact'
              ? 'bg-white text-[#0C3866] shadow-xs dark:bg-slate-700 dark:text-amber-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Phone className="h-3.5 w-3.5" />
          <span>Coordonnées</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('social')}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
            activeCategory === 'social'
              ? 'bg-white text-[#0C3866] shadow-xs dark:bg-slate-700 dark:text-amber-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Réseaux sociaux</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONTACT PICTOGRAMS                                             */}
      {/* ========================================================================= */}
      {activeCategory === 'contact' && (
        <div className="space-y-4">
          {/* Style selector */}
          <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Style des pictogrammes de contact :
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {contactStyleOptions.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleContactStyleChange(style.id)}
                  className={`rounded-lg border px-1.5 py-2 text-xs font-semibold transition-all ${
                    iconSettings.style === style.id
                      ? 'border-[#0C3866] bg-[#0C3866] text-white shadow-xs dark:border-amber-400 dark:bg-slate-700 dark:text-amber-300'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </section>

          {/* Dimensions & Spacing card */}
          <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              {/* Size */}
              <div>
                <div className="mb-1 flex items-center justify-between">
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
                  onChange={(e) => handleContactSizeChange(Number(e.target.value) || 16)}
                  className="w-full accent-[#0C3866] dark:accent-amber-400"
                />
              </div>

              {/* Spacing */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Espacement texte
                  </label>
                  <span className="text-xs font-bold text-[#0C3866] dark:text-amber-400">
                    {iconSettings.spacing} px
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={iconSettings.spacing}
                  onChange={(e) => handleContactSpacingChange(Number(e.target.value) || 6)}
                  className="w-full accent-[#0C3866] dark:accent-amber-400"
                />
              </div>
            </div>

            {/* Color Picker */}
            <div className="border-t border-slate-100 pt-3 dark:border-slate-700">
              <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                Couleur des pictogrammes de coordonnées :
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  aria-label="Couleur des pictogrammes"
                  value={effectiveContactColor}
                  onChange={(e) => handleContactColorChange(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-slate-200 p-0.5 dark:border-slate-600"
                />
                <input
                  type="text"
                  value={effectiveContactColor.toUpperCase()}
                  onChange={(e) => handleContactColorChange(e.target.value)}
                  className="w-full rounded border border-slate-200 px-2 py-1 font-mono text-xs uppercase text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Quick color palettes */}
              <div className="mt-2.5">
                <span className="mb-1.5 block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Nuances recommandées RAGT :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickColors.map((qc) => (
                    <button
                      key={qc.value}
                      type="button"
                      onClick={() => handleContactColorChange(qc.value)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium transition-colors hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full border border-black/10"
                        style={{ backgroundColor: qc.value }}
                      />
                      <span className="text-slate-700 dark:text-slate-300">{qc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Live Preview of Contact Pictograms */}
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-2xs dark:border-slate-700 dark:bg-slate-800/60">
            <h4 className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              <span>Aperçu des coordonnées</span>
              <span className="text-[11px] font-normal lowercase text-slate-500">
                style : {iconSettings.style} ({iconSettings.size}px)
              </span>
            </h4>
            <div className="flex items-center justify-around rounded-lg border border-slate-200/80 bg-white p-3.5 dark:border-slate-700/80 dark:bg-slate-900/80">
              {(['phone', 'mobile', 'email', 'address', 'web'] as const).map((type) => {
                const dataUrl = getContactIconDataUrl(
                  type,
                  effectiveContactColor,
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
                    <span className="capitalize text-[10px] text-slate-500 dark:text-slate-400">
                      {type === 'phone' ? 'Tél' : type === 'mobile' ? 'Portable' : type === 'email' ? 'Mail' : type === 'address' ? 'Adresse' : 'Web'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: SOCIAL MEDIA PICTOGRAMS                                       */}
      {/* ========================================================================= */}
      {activeCategory === 'social' && (
        <div className="space-y-4">
          {/* Global Visibility switch */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Afficher le bloc réseaux sociaux :
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Active ou masque les icônes dans la signature e-mail
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateState((prev) => ({
                ...prev,
                visibility: { ...prev.visibility, socials: !prev.visibility.socials }
              }))}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                visibility.socials
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              {visibility.socials ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>{visibility.socials ? 'Visible' : 'Masqué'}</span>
            </button>
          </div>

          {/* Social Icon Style (Forme) */}
          <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Forme des pictogrammes réseaux :
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {socialStyleOptions.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleSocialStyleChange(style.id)}
                  className={`rounded-lg border px-1.5 py-2 text-xs font-semibold transition-all ${
                    currentSocialStyle === style.id
                      ? 'border-[#0C3866] bg-[#0C3866] text-white shadow-xs dark:border-amber-400 dark:bg-slate-700 dark:text-amber-300'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              « Rond » ou « Carré » crée un badge pastille élégant (blanc sur fond jaune, ou coloré). « Contour » ajoute un liseré fin.
            </p>
          </section>

          {/* Dimensions & Spacing */}
          <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs dark:border-slate-700 dark:bg-slate-800 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              {/* Size */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Taille des icônes
                  </label>
                  <span className="text-xs font-bold text-[#0C3866] dark:text-amber-400">
                    {social.iconSize} px
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="28"
                  value={social.iconSize}
                  onChange={(e) => handleSocialSizeChange(Number(e.target.value) || 16)}
                  className="w-full accent-[#0C3866] dark:accent-amber-400"
                />
              </div>

              {/* Spacing */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Espacement
                  </label>
                  <span className="text-xs font-bold text-[#0C3866] dark:text-amber-400">
                    {social.spacing} px
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={social.spacing}
                  onChange={(e) => handleSocialSpacingChange(Number(e.target.value) || 8)}
                  className="w-full accent-[#0C3866] dark:accent-amber-400"
                />
              </div>
            </div>

            {/* Colors Mode: Unified vs Brand colors */}
            <div className="border-t border-slate-100 pt-3 dark:border-slate-700">
              <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                Couleur des pictogrammes réseaux :
              </label>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => handleSocialColorChange(effectiveSocialColor)}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                    !social.useBrandColors
                      ? 'bg-[#0C3866] text-white border-[#0C3866] dark:bg-slate-700 dark:border-amber-400 dark:text-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  Couleur unifiée
                </button>
                <button
                  type="button"
                  onClick={handleApplyBrandColors}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
                    social.useBrandColors
                      ? 'bg-[#0C3866] text-white border-[#0C3866] dark:bg-slate-700 dark:border-amber-400 dark:text-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F7BD00]" />
                  <span>Couleurs de marque</span>
                </button>
              </div>

              {!social.useBrandColors && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="color"
                      aria-label="Couleur unifiée des réseaux sociaux"
                      value={effectiveSocialColor}
                      onChange={(e) => handleSocialColorChange(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded border border-slate-200 p-0.5 dark:border-slate-600"
                    />
                    <input
                      type="text"
                      value={effectiveSocialColor.toUpperCase()}
                      onChange={(e) => handleSocialColorChange(e.target.value)}
                      className="w-full rounded border border-slate-200 px-2 py-1 font-mono text-xs uppercase text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <span className="mb-1.5 block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Nuances recommandées RAGT :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickColors.map((qc) => (
                      <button
                        key={qc.value}
                        type="button"
                        onClick={() => handleSocialColorChange(qc.value)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium transition-colors hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-black/10"
                          style={{ backgroundColor: qc.value }}
                        />
                        <span className="text-slate-700 dark:text-slate-300">{qc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Live Preview of Social Pictograms with background switcher */}
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-2xs dark:border-slate-700 dark:bg-slate-800/60">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Aperçu des réseaux en direct
              </h4>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500 mr-1">Fond :</span>
                {(['white', 'yellow', 'navy'] as const).map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setPreviewBg(bg)}
                    className={`h-5 px-2 rounded text-[10px] font-bold border transition-all ${
                      previewBg === bg
                        ? 'border-[#0C3866] bg-[#0C3866] text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {bg === 'white' ? 'Blanc' : bg === 'yellow' ? 'Jaune RAGT' : 'Bleu RAGT'}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`flex min-h-[56px] flex-wrap items-center justify-center rounded-lg border p-4 transition-colors ${previewBgStyles[previewBg]}`}
              style={{ gap: `${social.spacing}px` }}
            >
              {activeSocialItems.length === 0 ? (
                <span className="text-xs italic text-slate-400">
                  Aucun réseau actif. Activez-en ci-dessous.
                </span>
              ) : (
                activeSocialItems.map((item) => {
                  const itemColor = social.useBrandColors ? (item.color || '#0C3866') : (social.color || item.color || '#0C3866');
                  const itemStyle = item.iconStyle || social.iconStyle || 'circle';
                  const dataUrl = getSocialIconDataUrl(
                    item.id,
                    itemColor,
                    itemStyle,
                    previewBg === 'yellow' ? '#FDC420' : previewBg === 'navy' ? '#0C3866' : '#FFFFFF'
                  );
                  return (
                    <div key={item.id} className="flex items-center gap-1.5">
                      <img
                        src={dataUrl}
                        alt={item.name}
                        style={{
                          width: `${social.iconSize}px`,
                          height: `${social.iconSize}px`
                        }}
                        className="object-contain"
                      />
                      {social.style === 'icons-text' && (
                        <span className="text-[11px] font-medium" style={{ fontFamily: design.typography.baseFont }}>
                          {item.name}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Social Networks List & Configuration */}
          <section className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              Réseaux professionnels configurés :
            </label>
            <div className="space-y-2">
              {social.items.map((item) => {
                const itemColor = social.useBrandColors ? (item.color || '#0C3866') : (social.color || item.color || '#0C3866');
                const itemStyle = item.iconStyle || social.iconStyle || 'circle';
                const previewUrl = getSocialIconDataUrl(item.id, itemColor, itemStyle, '#FDC420');

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-3 text-xs transition-all ${
                      item.active
                        ? 'border-slate-200 bg-white shadow-2xs dark:border-slate-700 dark:bg-slate-800'
                        : 'border-slate-200/60 bg-slate-50/70 opacity-70 dark:border-slate-700/60 dark:bg-slate-900/40'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                        <img
                          src={previewUrl}
                          alt={item.name}
                          className="h-5 w-5 object-contain"
                        />
                        <span>{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Network Color picker */}
                        <input
                          type="color"
                          value={item.color || '#0C3866'}
                          onChange={(e) => handleNetworkColorChange(item.id, e.target.value)}
                          title={`Couleur spécifique pour ${item.name}`}
                          className="h-5 w-5 cursor-pointer rounded border border-slate-300 p-0"
                        />

                        {/* Active Toggle */}
                        <button
                          type="button"
                          onClick={() => handleNetworkToggle(item.id)}
                          className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                            item.active
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                          }`}
                        >
                          {item.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{item.active ? 'Actif' : 'Inactif'}</span>
                        </button>
                      </div>
                    </div>

                    {/* URL Input */}
                    <div className="flex items-center gap-1.5">
                      <LinkIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => handleNetworkUrlChange(item.id, e.target.value)}
                        placeholder={`Lien vers votre page ${item.name}`}
                        className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] text-blue-700 focus:bg-white dark:border-slate-600 dark:bg-slate-900 dark:text-blue-300 dark:focus:bg-slate-800"
                      />
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                          title="Tester le lien"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
