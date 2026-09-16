import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { ISO_9001_LOGO_SVG, HVE_LOGO_SVG } from '../../constants/logos';
import {
  Award,
  Check,
  EyeOff,
  ShieldCheck,
  Leaf,
  Link,
  Sliders,
  ExternalLink
} from 'lucide-react';

export const RagtBadgesPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { visibility, logos } = state;

  const isCurrentCertified =
    logos.secondary?.url === ISO_9001_LOGO_SVG ||
    (logos.secondary?.alt && logos.secondary.alt.includes('ISO'));
  const isCurrentSustainable =
    logos.secondary?.url === HVE_LOGO_SVG ||
    (logos.secondary?.alt &&
      (logos.secondary.alt.includes('HVE') || logos.secondary.alt.includes('Durable')));

  const handleToggleBadge = (enabled: boolean) => {
    updateState((prev) => {
      const currentSecondary = prev.logos.secondary;
      const defaultBadge = {
        id: 'iso-9001',
        label: 'AFAQ ISO 9001 Qualité Certifiée',
        url: ISO_9001_LOGO_SVG,
        alt: 'AFAQ ISO 9001 Qualité Certifiée RAGT',
        width: 96,
        height: 48,
        keepRatio: true,
        linkUrl: 'https://www.ragt-semences.fr',
        align: 'left' as const,
        visible: enabled
      };

      return {
        ...prev,
        visibility: {
          ...prev.visibility,
          secondaryLogo: enabled
        },
        logos: {
          ...prev.logos,
          secondary: {
            ...(currentSecondary?.url ? currentSecondary : defaultBadge),
            visible: enabled
          }
        }
      };
    });
    showToast(
      enabled
        ? 'Badge officiel activé sur la signature'
        : 'Badge masqué de la signature',
      'info'
    );
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
            width: prev.logos.secondary?.width || 96,
            height: Math.round((prev.logos.secondary?.width || 96) / 2),
            keepRatio: true,
            linkUrl: prev.logos.secondary?.linkUrl || 'https://www.ragt-semences.fr',
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
            width: prev.logos.secondary?.width || 96,
            height: Math.round((prev.logos.secondary?.width || 96) / 2),
            keepRatio: true,
            linkUrl: prev.logos.secondary?.linkUrl || 'https://www.ragt-semences.fr',
            align: 'left',
            visible: true
          }
        }
      }));
      showToast('Badge « Développement Durable (HVE) » appliqué', 'success');
    }
  };

  return (
    <div className="p-4 space-y-5 text-slate-800 dark:text-slate-100">
      {/* Introduction Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#F7BD00]" />
          Badges &amp; Certifications RAGT
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Valorisez vos accréditations officielles (ISO 9001, HVE) directement associées au logo institutionnel.
        </p>
      </div>

      {/* Main Activation Card */}
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
              id="signature-badge-toggle"
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
              Badge visible sur la signature (Outlook &amp; Mobile)
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
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wide">
          Choisir le badge officiel RAGT :
        </label>

        {/* Option 1: Certified Quality ISO 9001 */}
        <div
          onClick={() => handleSelectBadgeType('certified')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            isCurrentCertified && visibility.secondaryLogo
              ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20 ring-1 ring-[#0C3866] dark:ring-amber-400 shadow-xs'
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
            <img
              src={ISO_9001_LOGO_SVG}
              alt="ISO 9001 Qualité Certifiée"
              className="h-10 object-contain"
            />
          </div>
        </div>

        {/* Option 2: Sustainable Development HVE */}
        <div
          onClick={() => handleSelectBadgeType('sustainable')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            isCurrentSustainable && visibility.secondaryLogo
              ? 'border-emerald-600 dark:border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-600 dark:ring-emerald-400 shadow-xs'
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
            <img
              src={HVE_LOGO_SVG}
              alt="HVE Haute Valeur Environnementale"
              className="h-10 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Badge Sizing & Link Configuration */}
      {visibility.secondaryLogo && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3.5 shadow-2xs">
          <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#0C3866] dark:text-amber-400" />
            Paramètres d'affichage du badge
          </h5>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Largeur d'affichage :</span>
              <span className="font-mono font-bold text-[#0C3866] dark:text-amber-400">
                {logos.secondary?.width || 96}px
              </span>
            </div>
            <input
              type="range"
              min="60"
              max="140"
              step="4"
              value={logos.secondary?.width || 96}
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
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-1">
              <Link className="w-3 h-3 text-slate-400" />
              Lien web au clic sur le badge :
            </label>
            <div className="relative">
              <input
                type="url"
                value={logos.secondary?.linkUrl || ''}
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
                className="w-full text-xs px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-mono"
              />
              {logos.secondary?.linkUrl && (
                <a
                  href={logos.secondary.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-[#0C3866]"
                  title="Tester le lien"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
