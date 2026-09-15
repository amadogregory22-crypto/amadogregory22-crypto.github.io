import React, { useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { QRCodeConfig } from '../../types/signature';
import { getQrRawContent, generateQrSvgString } from '../../utils/qrGenerator';
import { QrPositionMiniature } from '../layout/LayoutMiniatures';
import {
  QrCode,
  Eye,
  EyeOff,
  CheckCircle,
  Copy,
  Smartphone,
  Info,
  Sliders,
  Download
} from 'lucide-react';

export const QrPanel: React.FC = () => {
  const { state, updateState, qrDataUrl, showToast } = useSignature();
  const { qr, visibility } = state;
  const [showTestModal, setShowTestModal] = useState(false);

  const updateQr = (patch: Partial<QRCodeConfig>) => {
    updateState((prev) => ({
      ...prev,
      qr: {
        ...prev.qr,
        ...patch
      }
    }));
  };

  const rawContent = getQrRawContent(state);

  const copyQrContent = () => {
    navigator.clipboard.writeText(rawContent);
    showToast('Données brutes du QR copiées !', 'success');
  };

  const handleExportPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `ragt-qrcode-${state.personal.lastName || 'contact'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('QR Code PNG téléchargé.', 'success');
  };

  const handleExportSvg = async () => {
    try {
      const svgStr = await generateQrSvgString(state);
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ragt-qrcode-${state.personal.lastName || 'contact'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('QR Code SVG téléchargé.', 'success');
    } catch (e) {
      showToast('Erreur lors de la génération SVG.', 'error');
    }
  };

  return (
    <div className="p-4 space-y-4 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <QrCode className="w-4 h-4 text-[#F7BD00]" />
          Générateur de QR Code vCard
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Véritable QR Code mathématique encodant vos coordonnées complètes.
        </p>
      </div>

      {/* Main Activation Card */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Intégration dans la signature</span>
            <span className="text-[11px] text-slate-500">
              {visibility.qr ? 'Le QR code est visible et scannable' : 'Le QR code est masqué'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => updateState((prev) => ({
              ...prev,
              visibility: { ...prev.visibility, qr: !prev.visibility.qr },
              qr: { ...prev.qr, visible: !prev.visibility.qr }
            }))}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
              visibility.qr
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {visibility.qr ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{visibility.qr ? 'Activé' : 'Désactivé'}</span>
          </button>
        </div>

        {/* Real-time QR Preview Box */}
        <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center">
          {qrDataUrl ? (
            <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-200 flex flex-col items-center">
              <img
                src={qrDataUrl}
                alt="QR Code vCard RAGT"
                style={{ width: `${qr.size}px`, height: `${qr.size}px` }}
                className="block"
              />
              <span className="text-[10px] text-slate-400 font-mono mt-1">vCard 3.0 Standard</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">Génération en cours...</span>
          )}

          {/* Test & Inspection button */}
          <button
            type="button"
            onClick={() => setShowTestModal(!showTestModal)}
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0C3866] hover:underline"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{showTestModal ? 'Masquer les détails' : 'Tester le QR Code & vérifier les données'}</span>
          </button>
          
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200/50 w-full justify-center">
            <button type="button" onClick={handleExportPng} className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#0C3866] hover:text-[#0C3866] transition-colors shadow-sm">
              <Download className="w-3 h-3" /> PNG
            </button>
            <button type="button" onClick={handleExportSvg} className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#0C3866] hover:text-[#0C3866] transition-colors shadow-sm">
              <Download className="w-3 h-3" /> SVG
            </button>
          </div>
        </div>

        {/* Inspection Panel */}
        {showTestModal && (
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-2 text-xs">
            <div className="flex items-center justify-between text-blue-900 font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Données réelles encodées :
              </span>
              <button
                type="button"
                onClick={copyQrContent}
                className="flex items-center gap-1 text-[11px] text-blue-800 hover:text-blue-950 font-medium"
              >
                <Copy className="w-3 h-3" />
                Copier
              </button>
            </div>
            <pre className="p-2 bg-white rounded border border-blue-200/80 font-mono text-[10px] text-slate-700 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
              {rawContent}
            </pre>
            <p className="text-[10px] text-slate-500">
              En scannant ce QR avec l'appareil photo d'un smartphone, un contact complet s'enregistre automatiquement dans le carnet d'adresses.
            </p>
          </div>
        )}
      </div>

      {/* 17.1 Type de QR */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5 text-xs">
        <label className="font-semibold text-slate-700 block">Type de données encodées :</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'vcard', label: 'Carte de visite (vCard 3.0)' },
            { id: 'url', label: 'Lien Web (Site RAGT)' },
            { id: 'email', label: 'Envoi d’un e-mail direct' },
            { id: 'phone', label: 'Numéro de téléphone' },
            { id: 'custom', label: 'Texte ou lien personnalisé' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateQr({ type: item.id as any })}
              className={`p-2 rounded-lg border text-left font-medium transition-all ${
                qr.type === item.id
                  ? 'border-[#0C3866] bg-[#0C3866]/5 font-bold text-[#0C3866]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {qr.type === 'custom' && (
          <div className="pt-2">
            <label className="text-[11px] text-slate-600 block mb-1">Texte ou URL à encoder :</label>
            <input
              type="text"
              placeholder="https://..."
              value={qr.customText}
              onChange={(e) => updateQr({ customText: e.target.value })}
              className="w-full px-2.5 py-1.5 border rounded-lg bg-slate-50 font-mono text-xs"
            />
          </div>
        )}
      </div>

      {/* 17.3 Personnalisation visuelle & Position */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <label className="font-semibold text-slate-700 block">Position dans la signature :</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'right', label: 'À droite' },
            { id: 'left', label: 'À gauche' },
            { id: 'bottom', label: 'En bas' }
          ].map((pos) => {
            const isSelected = qr.position === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => updateQr({ position: pos.id as any })}
                className={`p-2 rounded-xl border text-center flex flex-col items-center justify-between transition-all ${
                  isSelected
                    ? 'border-[#0C3866] bg-blue-50/50 ring-2 ring-[#0C3866]/20 font-bold'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <QrPositionMiniature position={pos.id as any} active={isSelected} />
                <span className={`text-[11px] mt-1.5 ${isSelected ? 'text-[#0C3866] font-bold' : 'text-slate-600'}`}>
                  {pos.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-slate-600 mb-1">
              <span>Taille :</span>
              <span className="font-mono font-bold text-[#0C3866]">{qr.size}px</span>
            </div>
            <input
              type="range"
              min="50"
              max="110"
              step="5"
              value={qr.size}
              onChange={(e) => updateQr({ size: Number(e.target.value) })}
              className="w-full accent-[#0C3866]"
            />
          </div>

          <div>
            <span className="text-slate-600 block mb-1">Correction d'erreurs :</span>
            <select
              value={qr.errorCorrectionLevel}
              onChange={(e) => updateQr({ errorCorrectionLevel: e.target.value as any })}
              className="w-full px-2 py-1 border rounded bg-slate-50 text-xs"
            >
              <option value="L">L (7% redondance)</option>
              <option value="M">M (15% standard)</option>
              <option value="Q">Q (25% recommandé)</option>
              <option value="H">H (30% haute fidélité)</option>
            </select>
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Couleur des motifs :</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={qr.fgColor}
                onChange={(e) => updateQr({ fgColor: e.target.value })}
                className="w-7 h-7 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={qr.fgColor}
                onChange={(e) => updateQr({ fgColor: e.target.value })}
                className="w-full text-[11px] font-mono border rounded uppercase px-1 py-0.5 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Arrière-plan :</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={qr.bgColor}
                onChange={(e) => updateQr({ bgColor: e.target.value })}
                className="w-7 h-7 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={qr.bgColor}
                onChange={(e) => updateQr({ bgColor: e.target.value })}
                className="w-full text-[11px] font-mono border rounded uppercase px-1 py-0.5 bg-slate-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
