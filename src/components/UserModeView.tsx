import React, { useState } from 'react';
import { useSignature } from '../context/SignatureContext';
import { copyRichSignature, copyRawHtml, downloadHtmlFile } from '../utils/clipboard';
import {
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Globe,
  Copy,
  Download,
  CheckCircle2,
  Lock,
  Sliders,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const UserModeView: React.FC = () => {
  const { state, updateState, rawHtml, showToast, setAppMode } = useSignature();
  const { personal, labels, visibility } = state;
  const [copied, setCopied] = useState(false);

  const updatePersonal = (key: keyof typeof personal, value: string) => {
    updateState((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [key]: value
      }
    }));
  };

  const handleCopy = async () => {
    const res = await copyRichSignature(rawHtml);
    setCopied(true);
    showToast(res.message, res.success ? 'success' : 'error');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    downloadHtmlFile(rawHtml, `signature-ragt-${personal.lastName.toLowerCase()}.html`);
    showToast('Fichier signature.html téléchargé !', 'success');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-100">
      {/* Left Form: Clean, user-friendly, no complicated design menus */}
      <div className="w-full lg:w-[480px] bg-white border-r border-slate-200 flex flex-col shrink-0 h-full overflow-y-auto p-6 space-y-6">
        {/* Banner info for user */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#F7BD00]" />
              Charte graphique officielle RAGT Semences
            </span>
            <button
              type="button"
              onClick={() => setAppMode('studio')}
              className="text-[11px] font-semibold text-[#0C3866] hover:underline flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              Mode Studio
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Renseignez simplement vos informations personnelles ci-dessous. Votre signature se met à jour en direct avec la mise en page validée par le service Communication.
          </p>
        </div>

        {/* Coordonnées */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#0C3866] flex items-center gap-2">
            <User className="w-4 h-4 text-[#0C3866]" />
            Votre identité
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Prénom *</label>
              <input
                type="text"
                value={personal.firstName}
                onChange={(e) => updatePersonal('firstName', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white"
                placeholder="Prénom"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Nom *</label>
              <input
                type="text"
                value={personal.lastName}
                onChange={(e) => updatePersonal('lastName', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white font-bold uppercase"
                placeholder="NOM"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Fonction / Poste *</label>
            <input
              type="text"
              value={personal.jobTitle}
              onChange={(e) => updatePersonal('jobTitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white"
              placeholder="Ex: Responsable Développement Variétal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Département</label>
              <input
                type="text"
                value={personal.department}
                onChange={(e) => updatePersonal('department', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Société</label>
              <input
                type="text"
                value={personal.company}
                onChange={(e) => updatePersonal('company', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white font-semibold text-[#0C3866]"
              />
            </div>
          </div>
        </div>

        {/* Contact direct */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-[#0C3866] flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0C3866]" />
            Coordonnées professionnelles
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">E-mail professionnel *</label>
            <input
              type="email"
              value={personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white font-medium text-[#0C3866]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Ligne fixe directe</label>
              <input
                type="text"
                value={personal.phone}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Téléphone mobile</label>
              <input
                type="text"
                value={personal.mobile}
                onChange={(e) => updatePersonal('mobile', e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-slate-200 space-y-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full bg-[#0C3866] hover:bg-[#092b50] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 text-[#F7BD00]" />}
            <span>{copied ? 'Signature copiée dans le presse-papier !' : 'Copier ma signature pour Outlook'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Télécharger le fichier signature.html</span>
          </button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 bg-slate-200/70 p-8 flex flex-col items-center justify-center overflow-auto">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-slate-300">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Aperçu en temps réel
              </span>
              <h4 className="text-base font-extrabold text-[#0C3866]">
                Votre signature e-mail RAGT Semences
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Prête à l’emploi
            </span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
        </div>
      </div>
    </div>
  );
};
