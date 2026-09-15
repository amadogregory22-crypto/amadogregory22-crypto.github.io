import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { InfoPanel } from './InfoPanel';
import { SocialPanel } from './SocialPanel';
import { QrPanel } from './QrPanel';
import { UserCheck, Share2, QrCode } from 'lucide-react';

export const ContactMasterPanel: React.FC = () => {
  const { activeSubTab, setActiveSubTab } = useSignature();
  const currentSubTab = activeSubTab === 'social' ? 'social' : activeSubTab === 'qr' ? 'qr' : 'info';

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* En-tête Master Pôle */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-[#0C3866] text-[#F7BD00] flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">2. Identité & Contact</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Coordonnées détaillées, réseaux sociaux & QR Code vCard
            </p>
          </div>
        </div>

        {/* Sous-onglets */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mt-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveSubTab('info')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'info'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Coordonnées</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('social')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'social'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Réseaux Sociaux</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('qr')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'qr'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* Contenu complet */}
      <div className="flex-1 overflow-y-auto">
        {currentSubTab === 'info' && <InfoPanel />}
        {currentSubTab === 'social' && <SocialPanel />}
        {currentSubTab === 'qr' && <QrPanel />}
      </div>
    </div>
  );
};
