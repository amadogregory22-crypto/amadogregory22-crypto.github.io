import React from 'react';
import { useSignature, ActiveTab } from '../context/SignatureContext';
import {
  LayoutTemplate,
  ArchiveRestore,
  House,
  Palette,
  UserCheck,
  Image as ImageIcon,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badgeCount?: number;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, diagnostic } = useSignature();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Accueil',
      sublabel: 'Brief de votre signature',
      icon: House
    },
    {
      id: 'structure',
      label: 'Structure',
      sublabel: 'Disposition et dimensions',
      icon: LayoutTemplate
    },
    {
      id: 'contact',
      label: 'Renseigner mes coordonnées',
      sublabel: 'Contact, réseaux et QR',
      icon: UserCheck
    },
    {
      id: 'media',
      label: 'Visuels',
      sublabel: 'Logos, filiales et images carte',
      icon: ImageIcon
    },
    {
      id: 'style',
      label: 'Mettre en forme',
      sublabel: 'Couleurs, polices et bordures',
      icon: Palette
    },
    {
      id: 'export',
      label: 'Vérifier & Installer',
      sublabel: 'Contrôles, copie et exports',
      icon: CheckCheck,
      badgeCount: diagnostic.summary.errorsCount
    },
    {
      id: 'versions',
      label: 'Versions & sauvegardes',
      sublabel: 'Presets, révisions et historique',
      icon: ArchiveRestore
    }
  ];

  return (
    <nav className="w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto select-none transition-colors">
      <div className="p-4">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase px-2 mb-1 block">
          Menu du Studio
        </span>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id, item.id === 'home' ? 'brief' : item.id === 'structure' ? 'layout' : item.id === 'versions' ? 'storage' : undefined)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all ${
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

              </div>
            );
          })}
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-auto p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-200">
            <span>Contrôles Outlook</span>
            <span className={diagnostic.scorePercent === 100 ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-amber-700 dark:text-amber-400 font-bold'}>
              {diagnostic.scorePercent}% automatique
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${diagnostic.scorePercent}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
            Contrôles automatiques de structure. La recette Outlook reste à consigner.
          </p>
        </div>
      </div>
    </nav>
  );
};
