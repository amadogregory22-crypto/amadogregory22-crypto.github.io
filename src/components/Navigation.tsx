import React from 'react';
import { useSignature, ActiveTab } from '../context/SignatureContext';
import {
  LayoutTemplate,
  Palette,
  UserCheck,
  Image as ImageIcon,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

interface SubNavItem {
  id: string;
  label: string;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badgeCount?: number;
  subItems?: SubNavItem[];
}

export const Navigation: React.FC = () => {
  const { activeTab, activeSubTab, setActiveTab, diagnostic } = useSignature();

  const navItems: NavItem[] = [
    {
      id: 'template',
      label: '1. Gabarit & Modèles',
      sublabel: 'Structures A-I & bibliothèque',
      icon: LayoutTemplate,
      subItems: [
        { id: 'layout', label: 'Mise en page & Gabarits' },
        { id: 'templates', label: 'Modèles & Sauvegardes' }
      ]
    },
    {
      id: 'contact',
      label: '2. Identité & Contact',
      sublabel: 'Coordonnées, réseaux & QR',
      icon: UserCheck,
      subItems: [
        { id: 'info', label: 'Coordonnées' },
        { id: 'social', label: 'Réseaux Sociaux' },
        { id: 'qr', label: 'QR Code vCard' }
      ]
    },
    {
      id: 'media',
      label: '3. Médias & Visuels',
      sublabel: 'Logos RAGT, filiales & bannières',
      icon: ImageIcon,
      subItems: [
        { id: 'logos', label: 'Logos & Filiales (80+)' },
        { id: 'banner', label: 'Bannières & Campagnes' }
      ]
    },
    {
      id: 'style',
      label: '4. Style & Charte',
      sublabel: 'Palette RAGT, polices & bordures',
      icon: Palette,
      subItems: [
        { id: 'design', label: 'Design & Charte' }
      ]
    },
    {
      id: 'export',
      label: '5. Contrôle & Diffusion',
      sublabel: 'Audit Outlook & copie 1-clic',
      icon: CheckCheck,
      badgeCount: diagnostic.summary.errorsCount,
      subItems: [
        { id: 'verify', label: 'Diagnostic & Audit' },
        { id: 'copy', label: 'Copier & Exporter' }
      ]
    }
  ];

  return (
    <nav className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto select-none transition-colors">
      <div className="p-3">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase px-2 mb-1 block">
          Menu du Studio
        </span>
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-[#0C3866] dark:text-amber-400 font-bold shadow-xs border border-slate-200/90 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#0C3866] dark:bg-slate-700 text-[#F7BD00]'
                          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs leading-tight truncate">{item.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal leading-tight truncate">
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {item.badgeCount}
                    </span>
                  )}
                </button>

                {/* Sous-onglets dépliés sous le pôle actif */}
                {isActive && item.subItems && item.subItems.length > 1 && (
                  <div className="ml-5 pl-4 border-l-2 border-[#0C3866]/20 dark:border-amber-400/20 py-1 space-y-0.5">
                    {item.subItems.map((sub) => {
                      const isSubActive = activeSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => setActiveTab(item.id, sub.id)}
                          className={`w-full text-left text-xs py-1 px-2 rounded-md transition-colors flex items-center justify-between ${
                            isSubActive
                              ? 'text-[#0C3866] dark:text-amber-400 font-bold bg-[#0C3866]/5 dark:bg-slate-700/50'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {isSubActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0C3866] dark:bg-amber-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-auto p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-200">
            <span>Compatibilité Outlook</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Validé</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${diagnostic.scorePercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
            Structure HTML tableaux stricts testée pour Word Engine, OWA et mobile.
          </p>
        </div>
      </div>
    </nav>
  );
};
