import React from 'react';
import { DesignPanel } from './DesignPanel';
import { Palette } from 'lucide-react';

export const StyleMasterPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* En-tête Master Pôle */}
      <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#0C3866] text-[#F7BD00] flex items-center justify-center">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">4. Style & Charte Graphique</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Palette officielle RAGT, contraste WCAG, typographies certifiées & bordures
            </p>
          </div>
        </div>
      </div>

      {/* Contenu complet */}
      <div className="flex-1 overflow-y-auto">
        <DesignPanel />
      </div>
    </div>
  );
};
