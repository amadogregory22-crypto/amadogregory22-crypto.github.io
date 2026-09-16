import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { VerifyPanel } from './VerifyPanel';
import { CopyPanel } from './CopyPanel';
import { CheckCheck, CopyCheck } from 'lucide-react';

export const ExportMasterPanel: React.FC = () => {
  const { activeSubTab, setActiveSubTab, diagnostic } = useSignature();
  const currentSubTab = activeSubTab === 'copy' ? 'copy' : 'verify';

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* En-tête Master Pôle */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-[#0C3866] text-[#F7BD00] flex items-center justify-center">
            <CheckCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Vérifier & installer</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Vérifiez la signature, puis copiez-la ou téléchargez les fichiers utiles.
            </p>
          </div>
        </div>

        {/* Sous-onglets */}
        <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mt-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveSubTab('verify')}
            className={`min-w-0 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'verify'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="truncate">Vérifier</span>
            {diagnostic.summary.errorsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white font-bold ml-0.5">
                {diagnostic.summary.errorsCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('copy')}
            className={`min-w-0 py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              currentSubTab === 'copy'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CopyCheck className="w-3.5 h-3.5" />
            <span className="truncate">Installer</span>
          </button>
        </div>
      </div>

      {/* Contenu complet */}
      <div className="flex-1 overflow-y-auto">
        {currentSubTab === 'verify' ? <VerifyPanel /> : <CopyPanel />}
      </div>
    </div>
  );
};
