import React, { useEffect, useState } from 'react';
import { Mail, Monitor, Laptop, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import { api } from '../../services/api';
import { RenderResult } from '../../types';

export const PreviewView: React.FC = () => {
  const { document, project, setStep } = useStudioStore();
  const [modernResult, setModernResult] = useState<RenderResult | null>(null);
  const [classicResult, setClassicResult] = useState<RenderResult | null>(null);
  const [activePreview, setActivePreview] = useState<'modern' | 'classic' | 'comparison'>('modern');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!document?.id) return;
    loadRenders();
  }, [document?.id]);

  const loadRenders = async () => {
    if (!document?.id) return;
    try {
      setLoading(true);
      const [m, c] = await Promise.all([
        api.renderModern(document.id),
        api.renderClassic(document.id),
      ]);
      setModernResult(m);
      setClassicResult(c);
    } catch (err: any) {
      console.error('Erreur de rendu:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Aperçus Compatibilité E-mail Outlook</h2>
          <p className="text-xs text-slate-500 mt-1">
            Les deux moteurs consomment le même document logique avec une structure de tableaux HTML stricts.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStep('editor')}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour Studio
          </button>
          <button
            onClick={() => setStep('export')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            Passer à l'Exportation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Selector */}
      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
        <button
          onClick={() => setActivePreview('modern')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activePreview === 'modern' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4 text-sky-600" />
          New Outlook / OWA Web
        </button>
        <button
          onClick={() => setActivePreview('classic')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activePreview === 'classic' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Laptop className="w-4 h-4 text-indigo-600" />
          Outlook Classique (Word Engine)
        </button>
        <button
          onClick={() => setActivePreview('comparison')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activePreview === 'comparison' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Monitor className="w-4 h-4 text-emerald-600" />
          Comparaison avec la Source
        </button>
      </div>

      {/* Preview Simulation Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Mock Email Client Window Bar */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="text-xs text-slate-500 font-medium ml-2">
              {activePreview === 'modern'
                ? 'Outlook sur le Web (OWA) / New Outlook'
                : activePreview === 'classic'
                ? 'Microsoft Outlook Bureau (Windows)'
                : 'Comparatif Visuel'}
            </span>
          </div>

          <button
            onClick={loadRenders}
            className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Actualiser
          </button>
        </div>

        {/* Email Body Simulation */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          <div className="mb-6 text-xs text-slate-400 border-b border-slate-100 pb-4 space-y-1">
            <p><strong>De:</strong> {document?.fields.email || 'collaborateur@ragt.fr'}</p>
            <p><strong>À:</strong> destinataire@client.com</p>
            <p><strong>Objet:</strong> Proposition commerciale &amp; échanges</p>
          </div>

          <div className="text-sm text-slate-700 mb-6 space-y-2">
            <p>Bonjour,</p>
            <p>Veuillez trouver ci-joint les documents relatifs à notre échange.</p>
            <p>Bien cordialement,</p>
          </div>

          {/* Rendered Signature HTML */}
          {activePreview === 'comparison' ? (
            <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-2">Image Source Référence (Immuable)</span>
                {project?.source_image_url ? (
                  <img
                    src={project.source_image_url}
                    alt="Source"
                    className="max-h-48 border border-slate-300 rounded shadow-xs bg-white"
                  />
                ) : (
                  <p className="text-xs text-slate-400">Aucune image source</p>
                )}
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-2">Signature HTML Produite (Outlook)</span>
                <div
                  className="p-3 bg-white border border-slate-200 rounded shadow-xs overflow-auto"
                  dangerouslySetInnerHTML={{ __html: modernResult?.html || '' }}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 inline-block max-w-full overflow-x-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: activePreview === 'modern' ? modernResult?.html || '' : classicResult?.html || '',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Safety Badge */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>
            <strong>Garantie de compatibilité e-mail :</strong> Zéro CSS Grid, Zéro Flexbox requis, Zéro balise bloquante.
            L'image source n'est jamais injectée dans la signature finale.
          </span>
        </div>
      </div>
    </div>
  );
};
