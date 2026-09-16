import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import { LayoutPanel } from './LayoutPanel';

export const StructureMasterPanel: React.FC = () => (
  <div className="flex h-full flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <div className="shrink-0 border-b border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0C3866] text-[#F7BD00]"><LayoutTemplate className="h-4 w-4" /></div><div><h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Structure</h2><p className="text-[11px] text-slate-500 dark:text-slate-400">Choisissez la disposition, les dimensions et l’ordre des blocs.</p></div></div></div>
    <div className="flex-1 overflow-y-auto"><LayoutPanel /></div>
  </div>
);
