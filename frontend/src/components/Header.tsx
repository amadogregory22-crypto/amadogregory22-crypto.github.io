import React from 'react';
import { Sparkles, Upload, Cpu, CheckSquare, Edit3, Eye, Download } from 'lucide-react';
import { useStudioStore } from '../store/useStudioStore';

export const Header: React.FC = () => {
  const { currentStep, setStep, project } = useStudioStore();

  const STEPS = [
    { id: 'import', label: '1. Importer', icon: Upload },
    { id: 'analysis', label: '2. Analyser', icon: Cpu },
    { id: 'review', label: '3. Revoir', icon: CheckSquare },
    { id: 'editor', label: '4. Éditer', icon: Edit3 },
    { id: 'preview', label: '5. Vérifier', icon: Eye },
    { id: 'export', label: '6. Exporter', icon: Download },
  ] as const;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between select-none z-30">
      {/* Brand & Project name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-sm font-bold tracking-wider text-sm">
          SS
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">Signature Studio</span>
            <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">v2.0 Clean</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium truncate max-w-48">
            {project?.name || 'Nouveau projet'}
          </p>
        </div>
      </div>

      {/* Stepper Navigation */}
      <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setStep(step.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{step.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status pill */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Moteur Pure Outlook
        </span>
      </div>
    </header>
  );
};
