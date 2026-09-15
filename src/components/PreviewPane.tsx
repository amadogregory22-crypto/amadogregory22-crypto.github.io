import React, { useRef } from 'react';
import { useSignature } from '../context/SignatureContext';
import { copyRichSignature } from '../utils/clipboard';
import {
  Sun,
  Moon,
  Mail,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  EyeOff,
  Copy,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const PreviewPane: React.FC = () => {
  const {
    rawHtml,
    previewEnv,
    setPreviewEnv,
    zoomLevel,
    setZoomLevel,
    simulateBlockedImages,
    setSimulateBlockedImages,
    referenceOverlay,
    setReferenceOverlay,
    state,
    updateState,
    showToast
  } = useSignature();

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const assetUrl = e.dataTransfer.getData('application/ragt-asset') || e.dataTransfer.getData('text/uri-list');
    if (!assetUrl) return;

    let target = e.target as HTMLElement;
    let dropzoneId = null;

    while (target && target !== previewContainerRef.current && target !== e.currentTarget) {
      if (target.dataset && target.dataset.ragtDropzone) {
        dropzoneId = target.dataset.ragtDropzone;
        break;
      }
      target = target.parentElement as HTMLElement;
    }

    if (!dropzoneId) {
      showToast('Glissez l\'image sur un logo ou la bannière pour la remplacer.', 'info');
      return;
    }

    if (dropzoneId === 'logo-primary') {
      updateState((prev) => ({
        ...prev,
        logos: { ...prev.logos, primary: { ...prev.logos.primary, url: assetUrl } },
        visibility: { ...prev.visibility, logo: true }
      }));
      showToast('Logo principal mis à jour', 'success');
    } else if (dropzoneId === 'logo-secondary') {
      updateState((prev) => ({
        ...prev,
        logos: { ...prev.logos, secondary: { ...prev.logos.secondary, url: assetUrl } },
        visibility: { ...prev.visibility, secondaryLogo: true }
      }));
      showToast('Logo secondaire mis à jour', 'success');
    } else if (dropzoneId === 'banner') {
      updateState((prev) => ({
        ...prev,
        banner: { ...prev.banner, imageUrl: assetUrl, enabled: true },
        visibility: { ...prev.visibility, banner: true }
      }));
      showToast('Bannière mise à jour', 'success');
    }
  };

  const handleCopy = async () => {
    const res = await copyRichSignature(rawHtml);
    showToast(res.message, res.success ? 'success' : 'error');
  };

  // Modify rawHtml if simulating blocked images (replace src with broken or empty)
  const displayHtml = simulateBlockedImages
    ? rawHtml.replace(/<img\s+([^>]*?)src="[^"]*"([^>]*?)>/gi, (match, p1, p2) => {
        return `<span style="display:inline-block; border:1px dashed #CBD5E0; background:#EDF2F7; padding:4px 8px; font-size:10px; color:#718096; font-family:Arial;">[Image bloquée]</span>`;
      })
    : rawHtml;

  return (
    <div 
      className="flex-1 flex flex-col h-full bg-slate-100/70 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 overflow-hidden relative select-none"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Top Preview Control Bar */}
      <div className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between shadow-2xs z-10 shrink-0">
        {/* Environment Modes */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setPreviewEnv('light')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              previewEnv === 'light'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Aperçu sur fond clair standard"
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Clair</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewEnv('dark')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              previewEnv === 'dark'
                ? 'bg-slate-800 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Aperçu dans un client de messagerie en mode sombre"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sombre</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewEnv('outlook')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              previewEnv === 'outlook'
                ? 'bg-white text-[#0C3866] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Simulation réaliste de fenêtre de messagerie Outlook"
          >
            <Mail className="w-3.5 h-3.5 text-[#0C3866]" />
            <span>Outlook</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewEnv('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              previewEnv === 'mobile'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Simulation sur smartphone (largeur 375px)"
          >
            <Smartphone className="w-3.5 h-3.5 text-slate-700" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Zoom & Inspection Controls */}
        <div className="flex items-center gap-2">
          {/* Simulate blocked images (Requirement 48 & 75) */}
          <button
            type="button"
            onClick={() => setSimulateBlockedImages(!simulateBlockedImages)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
              simulateBlockedImages
                ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Tester la lisibilité de la signature si le destinataire bloque les images distantes"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Images bloquées</span>
          </button>

          {/* Zoom Buttons (Requirement 23) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel(Math.max(0.5, Number((zoomLevel - 0.25).toFixed(2))))}
              title="Zoom arrière"
              className="p-1 text-slate-600 hover:text-slate-900 rounded"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono font-medium text-[11px] text-slate-700 min-w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(Math.min(1.5, Number((zoomLevel + 0.25).toFixed(2))))}
              title="Zoom avant"
              className="p-1 text-slate-600 hover:text-slate-900 rounded"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              title="Réinitialiser zoom 100%"
              className="p-1 text-slate-500 hover:text-slate-900 rounded"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-[#0C3866] hover:bg-[#08284a] text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-xs transition-all"
            title="Copier immédiatement la signature formatée"
          >
            <Copy className="w-3.5 h-3.5 text-[#F7BD00]" />
            <span className="hidden md:inline">Copier</span>
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div
        ref={previewContainerRef}
        className={`flex-1 overflow-auto p-6 flex flex-col items-center justify-center transition-colors duration-200 ${
          previewEnv === 'dark' ? 'bg-[#1E242B]' : 'bg-slate-200/60'
        }`}
      >
        {/* Environment-specific container */}
        {previewEnv === 'outlook' ? (
          /* Realistic Outlook Window Simulation */
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden flex flex-col my-auto">
            {/* Outlook Window Header */}
            <div className="bg-[#0078D4] text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Mail className="w-4 h-4" />
                <span>Nouveau message — Microsoft Outlook</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs opacity-90 font-mono">
                HTML &bull; UTF-8
              </div>
            </div>

            {/* Outlook Email Header Fields */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex items-center">
                <span className="w-16 font-semibold text-slate-500">De :</span>
                <span className="font-medium text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {state.personal.firstName} {state.personal.lastName} &lt;{state.personal.email}&gt;
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 font-semibold text-slate-500">À :</span>
                <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  partenaire@agricole.fr
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 font-semibold text-slate-500">Objet :</span>
                <span className="font-semibold text-slate-800">
                  Sélection variétale &amp; Semences RAGT — Saison 2026/2027
                </span>
              </div>
            </div>

            {/* Simulated Email Body Content */}
            <div className="p-6 bg-white min-h-[300px]">
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Bonjour,<br /><br />
                Veuillez trouver ci-joint les fiches techniques de nos nouvelles variétés RAGT Semences adaptées à votre bassin de production. Restant à votre entière disposition pour tout échange complémentaire.<br /><br />
                Bien cordialement,
              </p>

              {/* The actual injected signature */}
              <div
                className="mt-6 pt-4 border-t border-slate-200/80 transition-transform origin-top-left"
                style={{ transform: `scale(${zoomLevel})` }}
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />
            </div>
          </div>
        ) : previewEnv === 'mobile' ? (
          /* Mobile Smartphone Simulation */
          <div className="w-[375px] bg-slate-900 p-3 rounded-[36px] shadow-2xl border-4 border-slate-800 my-auto">
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
            <div className="bg-white rounded-[24px] p-4 min-h-[460px] max-h-[580px] overflow-y-auto">
              <div className="text-[10px] text-slate-400 font-mono mb-2 pb-1 border-b border-slate-100 flex justify-between">
                <span>10:42</span>
                <span>Mail &bull; 4G</span>
              </div>
              <p className="text-[11px] text-slate-600 mb-3">
                Bonjour, voici mes coordonnées RAGT Semences :
              </p>
              {(!['layout-c', 'layout-d', 'layout-g'].includes(state.layout.preset)) && (
                <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200/80 text-[10px] text-amber-900 flex items-center justify-between gap-1 shadow-2xs">
                  <span>Modèle desktop actif sur téléphone.</span>
                  <button
                    type="button"
                    onClick={() => updateState(prev => ({ ...prev, layout: { ...prev.layout, preset: 'layout-c' } }))}
                    className="font-bold underline text-[#0C3866] hover:text-[#092b50] shrink-0"
                  >
                    Passer en Modèle C &rarr;
                  </button>
                </div>
              )}
              <div
                className="transition-transform origin-top-left overflow-x-auto"
                style={{
                  transform: `scale(${
                    ['layout-c', 'layout-d', 'layout-g'].includes(state.layout.preset)
                      ? Math.min(1, zoomLevel)
                      : Math.min(zoomLevel, 335 / (state.layout.dimensions.totalWidth || 540))
                  })`
                }}
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />
            </div>
          </div>
        ) : (
          /* Standard Light / Dark Canvas */
          <div
            className={`p-8 rounded-xl shadow-lg border transition-all relative ${
              previewEnv === 'dark'
                ? 'bg-[#2A323D] border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              maxWidth: '100%'
            }}
          >
            {/* Optional Overlay Guide Model (Requirement 24) */}
            {referenceOverlay.enabled && referenceOverlay.imageUrl && (
              <div
                className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-8"
                style={{ opacity: referenceOverlay.opacity }}
              >
                <img
                  src={referenceOverlay.imageUrl}
                  alt="Gabarit de référence"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* Actual Email HTML rendering */}
            <div dangerouslySetInnerHTML={{ __html: displayHtml }} />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span>Modèle : <strong className="text-slate-700 dark:text-slate-200">{state.presetName}</strong></span>
          <span>&bull;</span>
          <span>Largeur : <strong className="text-slate-700 dark:text-slate-200">{state.layout.dimensions.totalWidth}px</strong></span>
          <span>&bull;</span>
          <span>Blocs : {state.visibility.qr ? 'Avec QR' : 'Sans QR'} | {state.visibility.banner ? 'Avec Bannière' : 'Standard'}</span>
        </div>
        <div className="flex items-center gap-2">
          {simulateBlockedImages && (
            <span className="text-amber-600 font-semibold flex items-center gap-1">
              <EyeOff className="w-3 h-3" /> Simulation sans images active
            </span>
          )}
          <span>Outlook Word Engine Compatible</span>
        </div>
      </div>
    </div>
  );
};
