import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { copyRichSignature, copyRawHtml, downloadHtmlFile } from '../../utils/clipboard';
import { SIGNATURE_PRESETS, APP_VERSION } from '../../constants/presets';
import {
  CopyCheck,
  Copy,
  Download,
  Code2,
  CheckCircle2,
  HelpCircle,
  Laptop,
  Globe,
  Smartphone,
  Sparkles,
  Save
} from 'lucide-react';

export const CopyPanel: React.FC = () => {
  const { rawHtml, showToast, state, exportConfigJson } = useSignature();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopyRich = async () => {
    const res = await copyRichSignature(rawHtml);
    setCopiedType('rich');
    showToast(res.message, res.success ? 'success' : 'error');
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleCopyCode = async () => {
    const res = await copyRawHtml(rawHtml);
    setCopiedType('raw');
    showToast(res.message, res.success ? 'success' : 'error');
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleDownload = () => {
    const safeName = (state.personal.lastName || 'ragt').toLowerCase().replace(/\s+/g, '-');
    downloadHtmlFile(rawHtml, `signature-ragt-${safeName}.html`);
    showToast('Fichier signature.html téléchargé !', 'success');
  };

  const handleExportPreset = (presetId: string) => {
    const presetDef = SIGNATURE_PRESETS.find(p => p.id === presetId);
    if (!presetDef) return;
    const modifiedState = presetDef.apply(state);
    const exportData = {
      app: 'Signature Studio RAGT',
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),
      config: modifiedState
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ragt-preset-${presetId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Modèle ${presetDef.name} exporté`, 'success');
  };

  return (
    <div className="p-4 space-y-5 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <CopyCheck className="w-4 h-4 text-[#F7BD00]" />
          Finalisation &amp; Exportation
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Copiez ou téléchargez votre signature prête à être installée dans vos logiciels de messagerie.
        </p>
      </div>

      {/* Primary Actions Cards (Requirement 32) */}
      <div className="space-y-2.5">
        {/* 32.1 Copier la signature riche */}
        <button
          type="button"
          onClick={handleCopyRich}
          className="w-full bg-[#0C3866] hover:bg-[#08294d] text-white p-3.5 rounded-xl shadow-md flex items-center justify-between text-left transition-all active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F7BD00] shrink-0 group-hover:bg-white/20 transition-colors">
              <Copy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold block">
                {copiedType === 'rich' ? 'Signature copiée !' : 'Copier la signature'}
              </span>
              <span className="text-[11px] text-slate-200 font-normal">
                Format riche prêt à coller dans les options Outlook (Ctrl+V)
              </span>
            </div>
          </div>
          {copiedType === 'rich' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <span className="text-xs bg-[#F7BD00] text-[#0C3866] font-bold px-2 py-0.5 rounded shrink-0">
              Recommandé
            </span>
          )}
        </button>

        {/* 32.2 Copier le code HTML brut */}
        <button
          type="button"
          onClick={handleCopyCode}
          className="w-full bg-white hover:bg-slate-50 text-slate-800 p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between text-left transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">Copier le code HTML brut</span>
              <span className="text-[11px] text-slate-500 font-normal">
                Pour webmail avancé, client web ou serveur de messagerie
              </span>
            </div>
          </div>
          {copiedType === 'raw' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
        </button>

        {/* 32.3 Télécharger signature.html */}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full bg-white hover:bg-slate-50 text-slate-800 p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between text-left transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">Télécharger signature.html</span>
              <span className="text-[11px] text-slate-500 font-normal">
                Fichier autonome complet encodé en UTF-8
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-400">.html</span>
        </button>
      </div>

      {/* Export Presets Section */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
          <Save className="w-4 h-4 text-[#0C3866]" />
          Exporter les configurations
        </h4>
        <p className="text-[11px] text-slate-500">
          Enregistrez les modèles sous forme de fichiers JSON pour les partager avec votre équipe.
        </p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={exportConfigJson}
            className="w-full bg-white hover:bg-[#0C3866] hover:text-white text-slate-700 border border-slate-200 px-3 py-2 rounded-lg text-left transition-colors flex items-center justify-between group"
          >
            <span className="font-medium">Exporter la configuration actuelle</span>
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </button>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleExportPreset('corporate')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Modèle Standard</span>
              <Download className="w-3 h-3 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleExportPreset('compact')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Modèle Compact</span>
              <Download className="w-3 h-3 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleExportPreset('minimalist')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between"
            >
              <span>Modèle Minimal</span>
              <Download className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Guide d'installation étape par étape */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#0C3866]" />
          Guide d'installation dans Microsoft Outlook
        </h4>

        <div className="space-y-2.5">
          {/* Outlook Windows Classique */}
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-[#0C3866] flex items-center gap-1.5 mb-1">
              <Laptop className="w-3.5 h-3.5" />
              Outlook Windows Classique (365 / 2016-2024)
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Cliquez sur le bouton bleu ci-dessus <strong>« Copier la signature »</strong>.</li>
              <li>Dans Outlook, ouvrez <strong>Fichier &gt; Options &gt; Courrier &gt; Signatures...</strong></li>
              <li>Cliquez sur <strong>Nouveau</strong>, nommez votre signature (ex: <em>RAGT 2026</em>).</li>
              <li>Dans la zone d'édition en bas, faites <strong>Ctrl + V</strong> pour coller.</li>
              <li>Définissez-la comme signature par défaut pour les nouveaux messages et réponses, puis cliquez sur <strong>OK</strong>.</li>
            </ol>
          </div>

          {/* New Outlook & Web */}
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <div className="font-bold text-[#0C3866] flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5" />
              New Outlook &amp; Webmail (OWA / Office 365)
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
              <li>Cliquez sur l'icône <strong>Engrenage (Paramètres)</strong> en haut à droite.</li>
              <li>Allez dans <strong>Courrier &gt; Composer et répondre &gt; Signatures électroniques</strong>.</li>
              <li>Créez une signature et collez le contenu avec <strong>Ctrl + V</strong>.</li>
              <li>Enregistrez vos modifications.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
