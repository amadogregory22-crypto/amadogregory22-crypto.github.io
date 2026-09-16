import React, { useEffect, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { FontChoice, TypographyItem } from '../../types/signature';
import { RAGT_PALETTE } from '../../constants/presets';
import { MOTIFS_IMAGES } from '../../constants/assets';
import { getContrastRatio, suggestAccessibleColor } from '../../utils/contrast';
import {
  Palette,
  Type,
  Square,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface CorporateTypographyOption {
  id: string;
  label: string;
  subtitle: string;
  value: FontChoice;
  category: string;
  badge: string;
  sampleText: string;
}

export const DesignPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { design } = state;
  const [activeSubTab, setActiveSubTab] = useState<'colors' | 'typography' | 'background' | 'borders'>('colors');

  useEffect(() => {
    const focusRequestedControl = (event: Event) => {
      if ((event as CustomEvent<{ target?: string }>).detail?.target !== 'corporate-typography-dropdown') return;
      setActiveSubTab('typography');
      window.setTimeout(() => document.getElementById('corporate-typography-dropdown')?.focus(), 0);
    };
    window.addEventListener('ragt:focus-control', focusRequestedControl);
    return () => window.removeEventListener('ragt:focus-control', focusRequestedControl);
  }, []);

  const corporateTypographyOptions: CorporateTypographyOption[] = [
    {
      id: 'arial',
      label: 'Charte Corporate RAGT (Arial / Helvetica)',
      subtitle: 'Moderne, universel, netteté optimale sur tous écrans',
      value: 'Arial, Helvetica, sans-serif',
      category: 'Charte Officielle',
      badge: 'Recommandé RAGT',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'calibri',
      label: 'Microsoft 365 Standard (Calibri / Segoe UI)',
      subtitle: 'Harmonie parfaite avec l’écosystème Outlook et Word',
      value: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
      category: 'Bureautique Office',
      badge: 'Outlook 365',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'georgia',
      label: 'Direction & Institutionnel (Georgia Serif)',
      subtitle: 'Typographie avec empattements élégante et solennelle',
      value: 'Georgia, serif',
      category: 'Institutionnel',
      badge: 'Prestige',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'times',
      label: 'Classique Traditionnel (Times New Roman)',
      subtitle: 'Contrats, juridique et correspondance formelle',
      value: 'Times New Roman, Times, serif',
      category: 'Juridique & Formel',
      badge: 'Classique',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'verdana',
      label: 'Technique & R&D Semences (Verdana)',
      subtitle: 'Lisibilité exceptionnelle des chiffres et codes variétaux',
      value: 'Verdana, Geneva, sans-serif',
      category: 'R&D / Agronomie',
      badge: 'Haute Lisibilité',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'tahoma',
      label: 'Commercial & Export Compact (Tahoma)',
      subtitle: 'Compacité pour coordonnées longues et mobiles internationaux',
      value: 'Tahoma, Geneva, sans-serif',
      category: 'Commercial',
      badge: 'Compact',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    },
    {
      id: 'trebuchet',
      label: 'Communication & Événements (Trebuchet MS)',
      subtitle: 'Géométrique, convivial et dynamique',
      value: 'Trebuchet MS, Helvetica, sans-serif',
      category: 'Communication',
      badge: 'Dynamique',
      sampleText: 'RAGT Semences • Cultivons l’avenir ensemble'
    }
  ];

  const selectedCorporateOption = corporateTypographyOptions.find(
    (o) => o.value === design.typography.baseFont
  ) || corporateTypographyOptions[0];

  const handleSelectCorporateTypography = (fontValue: FontChoice) => {
    const selectedOption = corporateTypographyOptions.find(o => o.value === fontValue);
    updateState((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        typography: {
          ...prev.design.typography,
          baseFont: fontValue,
          name: { ...prev.design.typography.name, fontFamily: fontValue },
          jobTitle: { ...prev.design.typography.jobTitle, fontFamily: fontValue },
          company: { ...prev.design.typography.company, fontFamily: fontValue },
          coordinates: { ...prev.design.typography.coordinates, fontFamily: fontValue },
          slogan: { ...prev.design.typography.slogan, fontFamily: fontValue }
        }
      },
      slogan: { ...prev.slogan, fontFamily: fontValue }
    }));
    showToast(`Typographie corporate « ${selectedOption ? selectedOption.label.split('(')[0].trim() : fontValue} » appliquée`, 'info');
  };

  const updateColor = (key: keyof typeof design.colors, value: string) => {
    updateState((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        colors: {
          ...prev.design.colors,
          [key]: value,
          ...(key === 'firstName' ? { lastName: value } : {}),
          ...(key === 'phone' ? { mobile: value } : {})
        }
      },
      layout: key === 'separator'
        ? { ...prev.layout, separator: { ...prev.layout.separator, color: value } }
        : prev.layout,
      qr: key === 'qrFg'
        ? { ...prev.qr, fgColor: value }
        : prev.qr,
      slogan: key === 'slogan'
        ? { ...prev.slogan, color: value }
        : prev.slogan
    }));
  };

  const updateTypographyItem = (key: keyof typeof design.typography, patch: Partial<TypographyItem>) => {
    updateState((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        typography: {
          ...prev.design.typography,
          [key]: {
            ...(prev.design.typography[key] as TypographyItem),
            ...patch
          }
        }
      },
      slogan: key === 'slogan'
        ? {
            ...prev.slogan,
            ...(patch.fontFamily !== undefined ? { fontFamily: patch.fontFamily } : {}),
            ...(patch.fontSize !== undefined ? { fontSize: patch.fontSize } : {}),
            ...(patch.fontWeight !== undefined ? { fontWeight: patch.fontWeight } : {}),
            ...(patch.fontStyle !== undefined ? { fontStyle: patch.fontStyle } : {}),
            ...(patch.color !== undefined ? { color: patch.color } : {})
          }
        : prev.slogan
    }));
  };

  const updateBorder = (patch: Partial<typeof design.border>) => {
    updateState((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        border: {
          ...prev.design.border,
          ...patch
        }
      }
    }));
  };

  return (
    <div className="p-4 space-y-4 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-[#F7BD00]" />
          Design &amp; Charte Graphique
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Harmonisation des couleurs RAGT, typographies e-mail et bordures.
        </p>
      </div>

      {/* Segmented Sub-Tabs sur 2 lignes */}
      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('colors')}
          className={`py-2 px-2.5 rounded-md text-center transition-all ${
            activeSubTab === 'colors' ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Couleurs
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('typography')}
          className={`py-2 px-2.5 rounded-md text-center transition-all ${
            activeSubTab === 'typography' ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Typographie
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('background')}
          className={`py-2 px-2.5 rounded-md text-center transition-all ${
            activeSubTab === 'background' ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Fond &amp; Motifs
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('borders')}
          className={`py-2 px-2.5 rounded-md text-center transition-all ${
            activeSubTab === 'borders' ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Bordures
        </button>
      </div>

      {/* 9.1 COULEURS */}
      {activeSubTab === 'colors' && (
        <div className="space-y-4">
          {/* Quick RAGT Swatches */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Nuancier officiel RAGT :
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { name: 'Bleu RAGT', hex: RAGT_PALETTE.primaryNavy },
                { name: 'Jaune RAGT', hex: RAGT_PALETTE.accentYellow },
                { name: 'Bleu Pétrole', hex: RAGT_PALETTE.secondaryTeal },
                { name: 'Vert Terroir', hex: RAGT_PALETTE.leafGreen },
                { name: 'Gris Ardoise', hex: RAGT_PALETTE.darkGray },
                { name: 'Gris Muted', hex: RAGT_PALETTE.mediumGray },
                { name: 'Blanc', hex: RAGT_PALETTE.white }
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    updateColor('primary', c.hex);
                    updateColor('firstName', c.hex);
                    updateColor('lastName', c.hex);
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition-colors shadow-2xs"
                  title={`Appliquer ${c.name} (${c.hex})`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Colors Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden text-xs shadow-2xs">
            {[
              { label: 'Nom & Prénom', key: 'firstName' },
              { label: 'Poste / Fonction', key: 'jobTitle' },
              { label: 'Entreprise (RAGT)', key: 'company' },
              { label: 'Téléphone fixe', key: 'phone' },
              { label: 'Téléphone portable', key: 'mobile' },
              { label: 'Adresse e-mail', key: 'email' },
              { label: 'Site web', key: 'website' },
              { label: 'Adresse postale', key: 'address' },
              { label: 'Icônes de contact', key: 'icons' },
              { label: 'Filet séparateur', key: 'separator' },
              { label: 'Slogan RAGT', key: 'slogan' },
              { label: 'QR Code (Contraste)', key: 'qrFg' }
            ].map((row) => (
              <div key={row.key} className="flex items-center justify-between p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <span className="font-medium text-slate-700 dark:text-slate-300">{row.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.colors[row.key as keyof typeof design.colors] || '#0C3866'}
                    onChange={(e) => updateColor(row.key as keyof typeof design.colors, e.target.value)}
                    className="w-7 h-7 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.colors[row.key as keyof typeof design.colors] || '#0C3866'}
                    onChange={(e) => updateColor(row.key as keyof typeof design.colors, e.target.value)}
                    className="w-20 text-xs font-mono uppercase px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-center"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Contrast Checker */}
          {(() => {
            const bg = design.background.type === 'color' ? design.background.color : '#FFFFFF';
            const fg = design.colors.firstName || '#0C3866';
            const ratio = getContrastRatio(fg, bg);
            const isPass = ratio >= 4.5;
            const suggestedFg = suggestAccessibleColor(fg, bg, 4.5);
            return (
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Contraste (Texte Principal vs Fond)</span>
                  {isPass ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3.5 h-3.5" /> AA ({ratio.toFixed(2)}:1)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                      <AlertTriangle className="w-3.5 h-3.5" /> Échec ({ratio.toFixed(2)}:1)
                    </span>
                  )}
                </div>
                {!isPass && (
                  <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-2 rounded-lg mt-2">
                    <p className="text-amber-800 dark:text-amber-300 text-[11px] mb-2">
                      Le contraste actuel est insuffisant pour une bonne lisibilité (WCAG AA). 
                      Couleur suggérée : <strong className="font-mono">{suggestedFg}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => updateColor('firstName', suggestedFg)}
                      className="w-full text-center bg-amber-200 dark:bg-amber-500 hover:bg-amber-300 dark:hover:bg-amber-600 text-amber-900 dark:text-slate-950 py-1.5 rounded font-semibold transition-colors"
                    >
                      Appliquer la suggestion
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 9.2 TYPOGRAPHIE */}
      {activeSubTab === 'typography' && (
        <div className="space-y-4">
          {/* Corporate Typography Dropdown Selector */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-[#0C3866] dark:text-amber-400 shrink-0">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <label htmlFor="corporate-typography-dropdown" className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                    Options Typographiques Corporate RAGT
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Sélectionnez la typographie officielle de votre signature e-mail
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-800">
                100% Web-Safe
              </span>
            </div>

            {/* The Dropdown Selector */}
            <div className="space-y-1">
              <label htmlFor="corporate-typography-dropdown" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                Police de caractères corporate :
              </label>
              <select
                id="corporate-typography-dropdown"
                value={design.typography.baseFont}
                onChange={(e) => handleSelectCorporateTypography(e.target.value as FontChoice)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#0C3866]/20 cursor-pointer"
              >
                {corporateTypographyOptions.map((f) => (
                  <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                    {f.label} — [{f.badge}]
                  </option>
                ))}
              </select>
            </div>

            {/* Live Typographic Specimen / Preview Box */}
            {selectedCorporateOption && (
              <div
                className="p-3.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 transition-all space-y-1.5"
                style={{ fontFamily: design.typography.baseFont }}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 dark:text-slate-500 font-sans text-[10px] uppercase tracking-wider font-bold">
                    Spécimen en direct • {selectedCorporateOption.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#0C3866] dark:text-amber-400 font-sans px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                    {selectedCorporateOption.badge}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {state.personal.firstName || 'Jean'} {state.personal.lastName || 'DUPONT'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {state.personal.jobTitle || 'Responsable Agronomique & Innovation'} — {state.personal.company || 'RAGT Semences'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  « {selectedCorporateOption.sampleText} »
                </p>
              </div>
            )}
          </div>

          {/* Independent Elements Fine-tuning */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wide">
              Ajustement des tailles &amp; graisses par bloc :
            </span>

            {[
              { label: 'Nom & Prénom', key: 'name' as const },
              { label: 'Poste / Fonction', key: 'jobTitle' as const },
              { label: 'Entreprise & Filiale', key: 'company' as const },
              { label: 'Coordonnées (Tél / Mail / Adr)', key: 'coordinates' as const }
            ].map((el) => {
              const item = design.typography[el.key];
              return (
                <div key={el.key} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{el.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{item.fontSize}px</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {/* Size */}
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Taille (px)</span>
                      <input
                        type="number"
                        min="9"
                        max="24"
                        value={item.fontSize}
                        onChange={(e) => updateTypographyItem(el.key, { fontSize: Number(e.target.value) })}
                        className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono"
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Graisse</span>
                      <select
                        value={item.fontWeight}
                        onChange={(e) => updateTypographyItem(el.key, { fontWeight: e.target.value as any })}
                        className="w-full px-1.5 py-1 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-[11px]"
                      >
                        <option value="normal">Normale</option>
                        <option value="500">Medium</option>
                        <option value="bold">Gras</option>
                      </select>
                    </div>

                    {/* Italic */}
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Style</span>
                      <button
                        type="button"
                        onClick={() => updateTypographyItem(el.key, { fontStyle: item.fontStyle === 'italic' ? 'normal' : 'italic' })}
                        className={`w-full py-1 border rounded text-xs font-medium text-center transition-colors ${
                          item.fontStyle === 'italic'
                            ? 'bg-[#0C3866] text-white font-bold border-[#0C3866]'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        Italique
                      </button>
                    </div>
                  </div>

                  {el.key === 'coordinates' && (
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 mt-2">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                          Soulignement des liens
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Téléphones, e-mail, site web et adresse
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateTypographyItem('coordinates', { textDecoration: item.textDecoration === 'underline' ? 'none' : 'underline' })}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                          item.textDecoration === 'underline'
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                        }`}
                      >
                        {item.textDecoration === 'underline' ? 'Souligné' : 'Non souligné (Recommandé Outlook)'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 9.4 FOND & MOTIFS */}
      {activeSubTab === 'background' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs shadow-2xs">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">Type d’arrière-plan :</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'Aucun' },
                { id: 'color', label: 'Couleur' },
                { id: 'image', label: 'Image / Motif' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updateState((prev) => ({
                    ...prev,
                    design: {
                      ...prev.design,
                      background: { ...prev.design.background, type: opt.id as any }
                    }
                  }))}
                  className={`p-2 rounded-lg border font-medium text-center transition-colors ${
                    design.background.type === opt.id
                      ? 'border-[#0C3866] dark:border-amber-400 bg-[#0C3866]/5 dark:bg-amber-400/10 font-bold text-[#0C3866] dark:text-amber-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {design.background.type === 'image' && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-2">
                <span className="text-slate-600 dark:text-slate-400 block font-semibold mb-2">Choisir un motif d'arrière-plan :</span>
                <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
                  {MOTIFS_IMAGES.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => updateState((prev) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          background: { ...prev.design.background, imageUrl: img }
                        }
                      }))}
                      className={`relative rounded overflow-hidden border-2 focus:outline-none transition-all ${
                        design.background.imageUrl === img ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <img src={img} alt="Motif" className="w-full h-10 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {design.background.type === 'color' && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-2">
                <span className="text-slate-600 dark:text-slate-400 block">Couleur du fond :</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.background.color || '#FFFFFF'}
                    onChange={(e) => updateState((prev) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        background: { ...prev.design.background, color: e.target.value }
                      }
                    }))}
                    className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={design.background.color || '#FFFFFF'}
                    onChange={(e) => updateState((prev) => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        background: { ...prev.design.background, color: e.target.value }
                      }
                    }))}
                    className="w-24 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs uppercase"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9.7 BORDURES */}
      {activeSubTab === 'borders' && (
        <div className="space-y-3 bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
          <label className="font-semibold text-slate-700 dark:text-slate-300 block">Encadrement de la signature :</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'none', label: 'Aucune' },
              { id: 'all', label: 'Complète' },
              { id: 'left', label: 'Bord gauche' },
              { id: 'bottom', label: 'Bord bas' },
              { id: 'top', label: 'Bord haut' },
              { id: 'right', label: 'Bord droit' }
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => updateBorder({ type: b.id as any })}
                className={`py-1.5 px-2 rounded-lg border text-center transition-colors ${
                  design.border.type === b.id
                    ? 'bg-[#0C3866] dark:bg-amber-400 text-white dark:text-slate-950 font-bold border-[#0C3866] dark:border-amber-400'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {design.border.type !== 'none' && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Épaisseur (px) :</span>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={design.border.thickness}
                    onChange={(e) => updateBorder({ thickness: Number(e.target.value) })}
                    className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded font-mono bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Couleur :</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={design.border.color}
                      onChange={(e) => updateBorder({ color: e.target.value })}
                      className="w-7 h-7 rounded border border-slate-200 dark:border-slate-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={design.border.color}
                      onChange={(e) => updateBorder({ color: e.target.value })}
                      className="w-full px-1 py-0.5 text-[11px] font-mono border border-slate-200 dark:border-slate-700 rounded uppercase bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
