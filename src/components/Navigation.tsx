import React from 'react';
import { useSignature, ActiveTab } from '../context/SignatureContext';
import {
  LayoutTemplate,
  Palette,
  UserCheck,
  Image as ImageIcon,
  QrCode,
  Share2,
  Flag,
  CheckCheck,
  Save,
  CopyCheck,
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
      id: 'layout',
      label: 'Mise en page',
      sublabel: 'Modèles A-H, dimensions & ordre',
      icon: LayoutTemplate
    },
    {
      id: 'design',
      label: 'Design & Styles',
      sublabel: 'Couleurs RAGT, polices & bordures',
      icon: Palette
    },
    {
      id: 'info',
      label: 'Informations',
      sublabel: 'Identité, coordonnées & libellés',
      icon: UserCheck
    },
    {
      id: 'logos',
      label: 'Logos & Icônes',
      sublabel: 'RAGT, filiales & certifications',
      icon: ImageIcon
    },
    {
      id: 'qr',
      label: 'QR Code',
      sublabel: 'vCard dynamique & personnalisation',
      icon: QrCode
    },
    {
      id: 'social',
      label: 'Médias sociaux',
      sublabel: 'LinkedIn, Facebook & réseaux',
      icon: Share2
    },
    {
      id: 'banner',
      label: 'Bannière & Slogan',
      sublabel: 'Campagnes événement & accroches',
      icon: Flag
    },
    {
      id: 'verify',
      label: 'Vérifier & Diagnostic',
      sublabel: 'Score Outlook, sécurité & liens',
      icon: CheckCheck,
      badgeCount: diagnostic.summary.errorsCount
    },
    {
      id: 'templates',
      label: 'Modèles & Sauvegardes',
      sublabel: 'Gérer vos presets personnalisés',
      icon: Save
    },
    {
      id: 'copy',
      label: 'Copier & Exporter',
      sublabel: 'Copier Outlook & signature.html',
      icon: CopyCheck
    }
  ];

  return (
    <nav className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto select-none transition-colors">
      <div className="p-3">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase px-2 mb-1 block">
          Menu du Studio
        </span>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
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
