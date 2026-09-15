import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { LogosPanel } from './LogosPanel';
import { BannerPanel } from './BannerPanel';
import { ImageIcon, Flag } from 'lucide-react';

export const MediaMasterPanel: React.FC = () => {
  const { activeSubTab, setActiveSubTab } = useSignature();
  const currentSubTab = activeSubTab === 'banner' ? 'banner' : 'logos';

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* En-tête Master Pôle */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-[#0C3866] text-[#F7BD00] flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">3. Médias & Visuels</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Logos officiels RAGT, 80+ filiales, certifications & bannières de communication
            </p>
          </div>
        </div>

        {/* Sous-onglets */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mt-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveSubTab('logos')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'logos'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Logos & Certifications</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('banner')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'banner'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Bannières & Campagnes</span>
          </button>
        </div>
      </div>

      {/* Contenu complet */}
      <div className="flex-1 overflow-y-auto">
        {currentSubTab === 'logos' ? <LogosPanel /> : <BannerPanel />}
      </div>
    </div>
  );
};
