import React, { useState } from 'react';
import { LogosPanel } from './LogosPanel';
import { BannerPanel } from './BannerPanel';
import { CampaignPanel } from './CampaignPanel';
import { Flag, ImageIcon, Library } from 'lucide-react';

type MediaTab = 'logos' | 'image' | 'campaigns';

export const MediaMasterPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MediaTab>('logos');
  const tabs: Array<{ id: MediaTab; label: string; icon: typeof ImageIcon }> = [
    { id: 'logos', label: 'Logos & bibliothèque', icon: Library },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'campaigns', label: 'Campagnes & slogan', icon: Flag }
  ];

  return <div className="flex h-full flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <div className="shrink-0 border-b border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0C3866] text-[#F7BD00]"><ImageIcon className="h-4 w-4" /></div>
        <div><h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Visuels de la signature</h2><p className="text-[11px] text-slate-500 dark:text-slate-400">Ajoutez et gérez chaque visuel dans sa rubrique.</p></div>
      </div>
      <div role="tablist" aria-label="Rubriques des visuels" className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} role="tab" aria-selected={activeTab === id} type="button" onClick={() => setActiveTab(id)} className={`flex min-h-9 items-center justify-center gap-1 rounded-md px-1.5 text-center text-[10px] font-semibold transition-colors ${activeTab === id ? 'bg-white text-[#0C3866] shadow-sm dark:bg-slate-700 dark:text-amber-300' : 'text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-slate-700/70'}`}><Icon className="h-3.5 w-3.5 shrink-0" />{label}</button>)}
      </div>
    </div>
    <div className="flex-1 overflow-y-auto">
      {activeTab === 'logos' && <LogosPanel />}
      {activeTab === 'image' && <BannerPanel />}
      {activeTab === 'campaigns' && <CampaignPanel />}
    </div>
  </div>;
};
