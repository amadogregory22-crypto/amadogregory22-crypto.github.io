import React from 'react';
import { BookOpenCheck, CheckCircle2, Grid3X3, Info, Layers3, UsersRound } from 'lucide-react';

interface DesignBriefPanelProps {
  onChooseStructure: () => void;
}

const ChecklistItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
    <span>{children}</span>
  </li>
);

export const DesignBriefPanel: React.FC<DesignBriefPanelProps> = ({ onChooseStructure }) => (
  <div className="space-y-5 p-4 text-slate-800 dark:text-slate-100">
    <div>
      <h3 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400">
        <BookOpenCheck className="h-4 w-4 text-[#F7BD00]" /> Brief & grille de la carte
      </h3>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Validez le besoin et l’ordre des informations avant de choisir un rendu visuel.</p>
    </div>

    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start gap-2"><UsersRound className="mt-0.5 h-4 w-4 shrink-0 text-[#F7BD00]" /><div><h4 className="text-xs font-bold">Objectif de la carte</h4><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">Identifier le collaborateur, rendre le contact immédiat et valoriser RAGT sans faire passer l’image avant les coordonnées.</p></div></div>
      <ul className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-700"><ChecklistItem>Le nom, la fonction et l’e-mail sont les informations prioritaires.</ChecklistItem><ChecklistItem>Logo, réseaux et QR Code restent des blocs indépendants, affichables ou masquables.</ChecklistItem><ChecklistItem>Une image ou une campagne est toujours secondaire et modifiable.</ChecklistItem></ul>
    </section>

    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start gap-2"><Grid3X3 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7BD00]" /><div><h4 className="text-xs font-bold">Grille de composition</h4><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">Les gabarits A à I organisent les zones logo, identité, contact, QR, réseaux et campagne sur une largeur de référence de 540 px.</p></div></div>
      <div className="grid grid-cols-2 gap-2 text-[11px]"><div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900"><strong className="block text-[#0C3866] dark:text-amber-400">A–F</strong>Structures de base et compactes</div><div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900"><strong className="block text-[#0C3866] dark:text-amber-400">G–I</strong>Mobile, campagne et carte RAGT</div></div>
      <button type="button" onClick={onChooseStructure} className="w-full rounded-lg bg-[#0C3866] px-3 py-2 text-xs font-bold text-white hover:bg-[#092b50]">Choisir une structure</button>
    </section>

    <section className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-200"><div className="flex gap-2"><Info className="h-4 w-4 shrink-0" /><p>Le référentiel complet précise les couleurs, typographies, espaces, wireframes, composants et cas de recette dans <code className="font-mono text-[11px]">docs/SYSTEME_CARTE_RAGT.md</code>.</p></div></section>
  </div>
);
