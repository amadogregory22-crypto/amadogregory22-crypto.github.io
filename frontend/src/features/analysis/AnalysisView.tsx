import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Cpu, Eye, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { useStudioStore } from '../../store/useStudioStore';
import { useReviewStore } from '../../store/useReviewStore';

export const AnalysisView: React.FC = () => {
  const { project, setAnalysis, setStep } = useStudioStore();
  const { setCandidates } = useReviewStore();

  const [stepsProgress, setStepsProgress] = useState<{ name: string; done: boolean }[]>([
    { name: 'Prétraitement & Extraction de palette de couleurs', done: false },
    { name: 'OCR & Détection de boîtes textuelles', done: false },
    { name: 'Décodeur QR Code physique', done: false },
    { name: 'Détection des logos et pictogrammes de contact', done: false },
    { name: 'Classification sémantique & Filtrage des slogans', done: false },
    { name: 'Fusion géométrique et dédoublonnage', done: false },
  ]);

  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!project?.source_image_id) return;

    let isMounted = true;

    async function runPipeline() {
      try {
        // Trigger simulated step visual progress while API is running
        const t1 = setTimeout(() => setStepsProgress((prev) => prev.map((s, i) => i === 0 ? { ...s, done: true } : s)), 300);
        const t2 = setTimeout(() => setStepsProgress((prev) => prev.map((s, i) => i <= 1 ? { ...s, done: true } : s)), 700);
        const t3 = setTimeout(() => setStepsProgress((prev) => prev.map((s, i) => i <= 2 ? { ...s, done: true } : s)), 1100);
        const t4 = setTimeout(() => setStepsProgress((prev) => prev.map((s, i) => i <= 3 ? { ...s, done: true } : s)), 1500);

        const result = await api.analyzeImage(project!.source_image_id!);
        
        if (isMounted) {
          setStepsProgress((prev) => prev.map((s) => ({ ...s, done: true })));
          setAnalysis(result);
          setCandidates(result.candidates);
          setCompleted(true);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erreur lors de l'exécution de l'analyse");
        }
      }
    }

    runPipeline();

    return () => {
      isMounted = false;
    };
  }, [project]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Pipeline de Vision par Composants</h2>
            <p className="text-xs text-slate-400">Analyse modulaire parallèle non destructive</p>
          </div>
        </div>

        {error ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
            <p className="font-semibold">Une erreur est survenue pendant l'analyse :</p>
            <p className="mt-1">{error}</p>
            <button
              onClick={() => setStep('import')}
              className="mt-4 px-4 py-2 bg-rose-600 text-white font-medium rounded-lg text-xs"
            >
              Retour à l'import
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {stepsProgress.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  step.done
                    ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  {step.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-sky-600 animate-spin shrink-0" />
                  )}
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200">
                  {step.done ? 'Terminé' : 'En cours...'}
                </span>
              </div>
            ))}

            {completed && (
              <div className="mt-8 pt-4 flex justify-between items-center border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Analyse terminée avec succès (Source originale intacte)
                </div>
                <button
                  onClick={() => setStep('review')}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  Examiner les candidats
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
