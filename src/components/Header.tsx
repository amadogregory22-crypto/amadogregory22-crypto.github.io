import React, { useRef, useState } from 'react';
import { useSignature } from '../context/SignatureContext';
import { SIGNATURE_PRESETS, APP_VERSION } from '../constants/presets';
import { copyRichSignature } from '../utils/clipboard';
import { HelpOverlay } from './HelpOverlay';
import {
  Undo2,
  Redo2,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Copy,
  Users,
  Sliders,
  CheckCircle2,
  Moon,
  Sun,
  HelpCircle
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    state,
    undo,
    redo,
    canUndo,
    canRedo,
    resetState,
    applyPreset,
    exportConfigJson,
    importConfigJson,
    appMode,
    setAppMode,
    isDarkMode,
    setIsDarkMode,
    rawHtml,
    showToast,
    saveRevision
  } = useSignature();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [revisionName, setRevisionName] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await importConfigJson(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleQuickCopy = async () => {
    const res = await copyRichSignature(rawHtml);
    showToast(res.message, res.success ? 'success' : 'error');
  };

  return (
    <header className="min-h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xs select-none z-30 shrink-0 transition-colors sm:px-4">
      {/* Brand & Identity */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          {/* RAGT Stylized Mark */}
          <div className="flex items-center justify-center shrink-0">
            <img src="/assets/uploads/logo_ragt.png" alt="RAGT Logo" className="h-10 object-contain" />
          </div>
        </div>

        {/* Separator */}
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block" />

        {/* Mode Switch: Studio vs Collaborateur (Requirement 33 & 34) */}
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
          <button
            type="button"
            onClick={() => setAppMode('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              appMode === 'studio'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Accès complet aux réglages de mise en page, design, logos et exports"
          >
            <Sliders className="w-3.5 h-3.5" />
            Studio Communication
          </button>
          <button
            type="button"
            onClick={() => setAppMode('user')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              appMode === 'user'
                ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Mode simplifié pour les collaborateurs : mise à jour des coordonnées sans altérer le design"
          >
            <Users className="w-3.5 h-3.5" />
            Signature Collaborateur
          </button>
        </div>
        <button
          type="button"
          onClick={() => setAppMode(appMode === 'studio' ? 'user' : 'studio')}
          className="lg:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#0C3866] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-amber-400"
          title={appMode === 'studio' ? 'Passer en mode collaborateur' : 'Passer au Studio Communication'}
          aria-label={appMode === 'studio' ? 'Passer en mode collaborateur' : 'Passer au Studio Communication'}
        >
          {appMode === 'studio' ? <Users className="h-4 w-4" /> : <Sliders className="h-4 w-4" />}
        </button>
      </div>

      {/* Center: Presets Picker */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {appMode === 'studio' && (
          <div className="hidden xl:flex items-center gap-2 ml-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              Modèle :
            </span>
            <select
              value={state.presetName}
              onChange={(e) => {
                const selected = SIGNATURE_PRESETS.find((p) => p.name === e.target.value);
                if (selected) applyPreset(selected.id);
              }}
              className="text-xs font-semibold text-[#0C3866] dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#0C3866]/20 cursor-pointer"
            >
              {SIGNATURE_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.name} className="dark:bg-slate-800">
                  {preset.name} ({preset.category})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: History & Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Command Palette Trigger */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Rechercher un panneau (Cmd/Ctrl + K)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="font-mono text-[10px] bg-slate-200/50 dark:bg-slate-700 px-1 rounded border border-slate-200 dark:border-slate-600">⌘K</span>
        </button>

        {/* Ergonomic Studio Theme Toggle (Light / Dark) */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Passer en mode clair (Studio RAGT)" : "Passer en mode sombre ergonomique (Studio RAGT)"}
          aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-xs font-semibold transition-all sm:px-2.5 ${
            isDarkMode
              ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600 shadow-xs'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900 shadow-2xs'
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden text-[11px] sm:inline">Mode Clair</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden text-[11px] sm:inline">Mode Sombre</span>
            </>
          )}
        </button>

        {/* Help Toggle */}
        <button
          type="button"
          onClick={() => setShowHelp(true)}
          title="Guide RAGT (IA)"
          className="hidden p-1.5 text-slate-500 dark:text-slate-400 hover:text-[#0C3866] dark:hover:text-amber-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors sm:block"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        
        {/* Separator */}
        <div className="hidden w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 sm:block"></div>

        {/* Undo / Redo */}
        <div className="hidden items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 sm:flex">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title="Annuler la dernière action (Ctrl+Z)"
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title="Rétablir l'action annulée (Ctrl+Y)"
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Save a persistent version. Restore and deletion live with templates. */}
        <div className="hidden md:block">
          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowRevisionDialog(true)}
              title="Sauvegarder une révision de la configuration (Snapshot)"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-[#0C3866] dark:hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-700 px-3 py-1.5 transition-colors border-r border-slate-200 dark:border-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              <span className="hidden lg:inline">Sauvegarder</span>
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="hidden w-px h-5 bg-slate-200 mx-1 sm:block"></div>

        {/* Config JSON Import / Export */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={exportConfigJson}
            title="Exporter la configuration (JSON)"
            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Exporter</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Importer une configuration existante (JSON)"
            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Importer</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResetDialog(true)}
            title="Réinitialiser la signature aux réglages par défaut"
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Button: Copy */}
        <button
          type="button"
          onClick={handleQuickCopy}
          className="flex items-center gap-2 bg-[#0C3866] hover:bg-[#092b50] text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95"
          title="Copier la signature formatée pour la coller directement dans Outlook (Ctrl+V)"
        >
          <Copy className="w-3.5 h-3.5 text-[#F7BD00]" />
          <span>Copier la signature</span>
        </button>
      </div>

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
      {showRevisionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="revision-title">
          <form
            className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl dark:bg-slate-800"
            onSubmit={(event) => {
              event.preventDefault();
              saveRevision(revisionName.trim() || undefined);
              setRevisionName('');
              setShowRevisionDialog(false);
            }}
          >
            <h2 id="revision-title" className="text-base font-bold text-slate-900 dark:text-white">Sauvegarder une révision</h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Elle sera conservée sur cet appareil et pourra être restaurée après rechargement.</p>
            <label className="mt-4 block text-xs font-semibold text-slate-700 dark:text-slate-200" htmlFor="revision-name">Nom de la révision</label>
            <input id="revision-name" autoFocus value={revisionName} onChange={(event) => setRevisionName(event.target.value)} placeholder="Ex. Avant campagne automne" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white" />
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => { setRevisionName(''); setShowRevisionDialog(false); }} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Annuler</button>
              <button type="submit" className="rounded-lg bg-[#0C3866] px-3 py-2 text-xs font-bold text-white hover:bg-[#092b50]">Sauvegarder</button>
            </div>
          </form>
        </div>
      )}
      {showResetDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="reset-title">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl dark:bg-slate-800">
            <h2 id="reset-title" className="text-base font-bold text-slate-900 dark:text-white">Réinitialiser la signature ?</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">Les réglages actuels seront remplacés par le modèle officiel. Une révision « Avant réinitialisation » sera créée pour pouvoir revenir en arrière.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowResetDialog(false)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Annuler</button>
              <button type="button" onClick={() => { resetState(); setShowResetDialog(false); }} className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white hover:bg-rose-700">Réinitialiser</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
