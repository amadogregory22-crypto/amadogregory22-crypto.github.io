import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { copyRawHtml } from '../../utils/clipboard';
import { appendUtmParams, sanitizeUrl } from '../../utils/htmlGenerator';
import {
  CheckCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Code2,
  ExternalLink,
  Copy,
  Star,
  HardDrive,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';

export const VerifyPanel: React.FC = () => {
  const { diagnostic, rawHtml, showToast, state } = useSignature();
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'compatibility' | 'links' | 'code'>('checklist');

  const handleCopyCode = async () => {
    const res = await copyRawHtml(rawHtml);
    showToast(res.message, res.success ? 'success' : 'error');
  };

  // Collect all links in the signature for the link tester (Requirement 31)
  const linksList: { type: string; label: string; url: string }[] = [];
  if (state.personal.email) {
    linksList.push({ type: 'E-mail', label: state.personal.email, url: `mailto:${state.personal.email}` });
  }
  if (state.personal.phone) {
    linksList.push({ type: 'Téléphone Fixe', label: state.personal.phone, url: `tel:${state.personal.phone.replace(/\s+/g, '')}` });
  }
  if (state.personal.mobile) {
    linksList.push({ type: 'Mobile', label: state.personal.mobile, url: `tel:${state.personal.mobile.replace(/\s+/g, '')}` });
  }
  if (state.personal.website) {
    const webUrl = appendUtmParams(sanitizeUrl(state.personal.website), state.utm);
    linksList.push({ type: 'Site Web RAGT', label: webUrl, url: webUrl });
  }
  state.social.items.filter((i) => i.active && i.url).forEach((item) => {
    const socUrl = appendUtmParams(sanitizeUrl(item.url), state.utm);
    linksList.push({ type: `Réseau : ${item.name}`, label: socUrl, url: socUrl });
  });
  if (state.visibility.banner && state.banner.enabled && state.banner.linkUrl) {
    const bannerUrl = appendUtmParams(sanitizeUrl(state.banner.linkUrl), state.utm);
    linksList.push({ type: 'Bannière Campagne', label: bannerUrl, url: bannerUrl });
  }

  return (
    <div className="p-4 space-y-4 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <CheckCheck className="w-4 h-4 text-[#F7BD00]" />
          Vérification &amp; Diagnostics
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Audit en temps réel de la conformité Microsoft Outlook, sécurité et accessibilité.
        </p>
      </div>

      {/* Metrics Header Bar (Requirement 74) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Poids du code</span>
          <span className="text-sm font-bold text-[#0C3866] font-mono">{diagnostic.htmlSizeKb} Ko</span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Liens cliquables</span>
          <span className="text-sm font-bold text-slate-800 font-mono">{diagnostic.linksCount}</span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Score Qualité</span>
          <span className="text-sm font-bold text-emerald-700 font-mono">{diagnostic.scorePercent}%</span>
        </div>
      </div>

      {/* Segmented Sub-Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('checklist')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSubTab === 'checklist' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Checklist ({diagnostic.items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('compatibility')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSubTab === 'compatibility' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Clients E-mail
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('links')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSubTab === 'links' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Test Liens ({linksList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('code')}
          className={`flex-1 py-1.5 rounded-md transition-all ${
            activeSubTab === 'code' ? 'bg-white text-[#0C3866] shadow-xs' : 'text-slate-600'
          }`}
        >
          Code HTML
        </button>
      </div>

      {/* 29. CHECKLIST */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-2">
          {diagnostic.items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                item.status === 'ok'
                  ? 'bg-emerald-50/40 border-emerald-200/80 text-emerald-950'
                  : item.status === 'warning'
                  ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                  : 'bg-rose-50/50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.status === 'ok' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : item.status === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-70">
                    {item.status === 'ok' ? 'Conforme' : item.status === 'warning' ? 'Avertissement' : 'Erreur'}
                  </span>
                </div>
                <div className="text-[11px] opacity-85 mt-0.5 leading-relaxed">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 73. DIAGNOSTIC PAR CLIENT DE MESSAGERIE */}
      {activeSubTab === 'compatibility' && (
        <div className="space-y-2.5">
          {diagnostic.clientScores.map((c) => (
            <div key={c.client} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{c.client}</span>
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < c.stars ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{c.notes}</p>
            </div>
          ))}
        </div>
      )}

      {/* 31. TESTEUR DE LIENS */}
      {activeSubTab === 'links' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500 mb-2">
            Cliquez pour vérifier le bon fonctionnement de chaque lien avant l'envoi :
          </p>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden text-xs">
            {linksList.map((link, idx) => (
              <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold text-[#0C3866] block uppercase tracking-wider">
                    {link.type}
                  </span>
                  <span className="font-mono text-slate-700 text-[11px] truncate block max-w-[240px]">
                    {link.label}
                  </span>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#0C3866] hover:text-white text-slate-700 text-[11px] font-semibold transition-colors shrink-0"
                >
                  <span>Tester</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 30. APERÇU DU CODE HTML */}
      {activeSubTab === 'code' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Code HTML final pour e-mail :</span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#0C3866] rounded-md transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copier le HTML</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-auto max-h-[360px] leading-relaxed border border-slate-800">
            {rawHtml}
          </pre>
        </div>
      )}
    </div>
  );
};
