import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, FileCode, Archive, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import { api } from '../../services/api';
import { RenderResult } from '../../types';

export const ExportView: React.FC = () => {
  const { document, setStep } = useStudioStore();
  const [modernResult, setModernResult] = useState<RenderResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!document?.id) return;
    api.renderModern(document.id).then(setModernResult);
  }, [document?.id]);

  const handleCopyHtml = () => {
    if (!modernResult?.html) return;
    navigator.clipboard.writeText(modernResult.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-sky-600" />
            Exportation &amp; Déploiement Outlook
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Générez le package complet prêt pour les utilisateurs et la DSI.
          </p>
        </div>
        <button
          onClick={() => setStep('editor')}
          className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour à l'Éditeur
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Full ZIP Package */}
        <div className="p-6 bg-sky-50/60 border border-sky-200 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4">
              <Archive className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Package d'installation Outlook complet (ZIP)</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Comprend les fichiers <code className="text-sky-700 font-mono">.htm</code> pour New Outlook / OWA, 
              le fichier pour Outlook Classique Desktop (<code className="text-sky-700 font-mono">%appdata%/Microsoft/Signatures</code>), 
              ainsi que le guide d'installation étape par étape.
            </p>
          </div>

          <a
            href={document ? api.getDownloadPackageUrl(document.id) : '#'}
            className="mt-6 w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Télécharger le Package ZIP
          </a>
        </div>

        {/* 1-Click HTML Copy */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Copie directe du code HTML</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Copiez directement le balisage HTML propre avec styles inline stricts pour le coller dans vos paramètres de messagerie.
            </p>
          </div>

          <button
            onClick={handleCopyHtml}
            className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'HTML Copié dans le presse-papier !' : 'Copier le HTML Outlook'}
          </button>
        </div>
      </div>

      {/* HTML Code Inspector / Preview */}
      <div className="bg-slate-900 rounded-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <span className="text-xs font-mono font-semibold text-slate-400">Code HTML Tabulaire Pur Généré</span>
          <button
            onClick={handleCopyHtml}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
          >
            {copied ? 'Copié !' : 'Copier tout'}
          </button>
        </div>

        <pre className="text-[11px] font-mono overflow-x-auto max-h-60 text-slate-300 p-2 bg-slate-950 rounded-lg">
          {modernResult?.html || 'Chargement du code...'}
        </pre>
      </div>
    </div>
  );
};
