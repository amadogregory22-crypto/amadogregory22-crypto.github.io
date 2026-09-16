import React, { useState, useEffect, useRef } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { SignatureState } from '../../types/signature';
import { createSignatureExport, normalizeSignatureConfig } from '../../utils/signatureConfig';
import { analyzeCardImage, DetectedCardField } from '../../utils/cardOcr';
import { composePreconfiguredCard } from '../../utils/composePreconfiguredCard';
import { COMMUNICATION_SIGNATURES, CommunicationSignatureGraphic } from '../../constants/logos';
import {
  BookmarkPlus,
  BookmarkCheck,
  FolderHeart,
  Plus,
  Trash2,
  DownloadCloud,
  FileText,
  History,
  Clock,
  RotateCcw,
  Sparkles,
  Upload,
  Download,
  Check,
  Layers,
  Award,
  Type,
  Palette,
  Copy,
  ExternalLink
  ,ScanText
} from 'lucide-react';

interface SavedPreset {
  id: string;
  name: string;
  category?: string;
  date: string;
  state: SignatureState;
}

const PRESETS_STORAGE_KEY = 'ragt_signature_presets';
const LEGACY_STORAGE_KEY = 'ragt_saved_templates';

export const TemplatesPanel: React.FC<{ initialTab?: 'presets' | 'com_signatures' | 'history'; storageOnly?: boolean; cardsOnly?: boolean }> = ({ initialTab = 'presets', storageOnly = false, cardsOnly = false }) => {
  const {
    state,
    updateState,
    showToast,
    history,
    revertToHistoryIndex,
    savedRevisions,
    restoreRevision,
    deleteRevision
  } = useSignature();
  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [presetCategory, setPresetCategory] = useState('Général');
  const [activeTab, setActiveTab] = useState<'presets' | 'com_signatures' | 'history'>(initialTab);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardImageInputRef = useRef<HTMLInputElement>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [detectedFields, setDetectedFields] = useState<DetectedCardField[]>([]);
  const [applyingCardId, setApplyingCardId] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleApplyComSignature = async (sig: CommunicationSignatureGraphic) => {
    setApplyingCardId(sig.id);
    try {
      const cardImage = await composePreconfiguredCard(state, sig.url);
      updateState((prev) => ({
      ...prev,
      presetName: `${sig.name} (avec ma signature)`,
      renderMode: 'flattened-card',
      cardTemplateUrl: sig.url,
      layout: {
        ...prev.layout,
        preset: 'layout-d',
        alignH: 'left',
        alignV: 'middle',
        dimensions: {
          ...prev.layout.dimensions,
          totalWidth: 540,
          logoColumnWidth: 120,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 18,
          paddingRight: 18,
          innerSpacing: 16
        },
        separator: {
          ...prev.layout.separator,
          type: 'none'
        }
      },
      design: {
        ...prev.design,
        background: {
          ...prev.design.background,
          type: 'color',
          color: '#FFFFFF',
          borderRadius: 8,
          padding: 14
        },
        colors: {
          ...prev.design.colors,
          primary: '#0C3866', // Bleu nuit élégant
          secondary: '#285D63', // Vert foncé corporate
          text: '#1E4143', // Contraste optimal lisible
          icons: '#ffffff' // Icônes blanches sur fond jaune
        },
        contactIconsStyle: 'circle'
      },
      logos: {
        ...prev.logos,
        primary: {
          id: 'ragt-new-logo',
          label: 'Logo Officiel RAGT Semences',
          url: '/assets/uploads/logo_ragt.png',
          alt: 'Logo RAGT Semences',
          width: 95,
          height: 100,
          keepRatio: true,
          linkUrl: 'https://www.ragt-semences.fr',
          align: 'left',
          visible: true
        }
      },
      banner: {
        ...prev.banner,
        enabled: true,
        title: sig.name,
        imageUrl: cardImage,
        altText: `Carte personnalisée ${sig.name}`,
        linkUrl: '',
        campaignName: '',
        startDate: '',
        endDate: '',
        position: 'top',
        width: 540,
        height: 270,
        marginTop: 0,
        marginBottom: 10
      },
      visibility: {
        ...prev.visibility,
        logo: false,
        banner: true,
        socials: false,
        qr: false,
        phone: false,
        mobile: false,
        email: false,
        address: false,
        website: false,
        jobTitle: false,
        firstName: false,
        lastName: false,
        company: false,
        slogan: false
      }
      }));
      showToast(`Carte « ${sig.name} » personnalisée et chargée.`, 'success');
    } catch {
      showToast(`Impossible de générer la carte « ${sig.name} ».`, 'error');
    } finally {
      setApplyingCardId(null);
    }
  };

  const handleAnalyzeCardImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    setOcrStatus('loading');
    setOcrProgress(0);
    try {
      const fields = await analyzeCardImage(imageUrl, setOcrProgress);
      setDetectedFields(fields);
      setOcrStatus('done');
      showToast(`${fields.length} zone(s) de texte détectée(s) dans la carte`, 'success');
    } catch {
      setDetectedFields([]);
      setOcrStatus('error');
      showToast('Analyse OCR impossible pour cette image.', 'error');
    } finally {
      event.target.value = '';
    }
  };

  const handleCopyComHtml = async (sig: CommunicationSignatureGraphic) => {
    try {
      const fullUrl = sig.url.startsWith('http') ? sig.url : `${window.location.origin}${sig.url}`;
      const htmlSnippet = `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td><a href="https://www.ragt.fr" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;"><img src="${fullUrl}" alt="${sig.name}" width="${sig.width}" height="${sig.height}" style="display:block;border:0;outline:none;" /></a></td></tr></table>`;
      await navigator.clipboard.writeText(htmlSnippet);
      showToast('Code HTML de la signature copié !', 'success');
    } catch {
      showToast('Impossible de copier dans le presse-papier', 'error');
    }
  };

  const handleDownloadComImage = (sig: CommunicationSignatureGraphic) => {
    const link = document.createElement('a');
    link.href = sig.url;
    link.download = `${sig.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Image « ${sig.name} » téléchargée`, 'info');
  };

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
      if (saved) {
        setPresets(JSON.parse(saved));
      } else {
        // Fallback to legacy key
        const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          setPresets(parsed);
          localStorage.setItem(PRESETS_STORAGE_KEY, legacy);
        }
      }
    } catch (e) {
      console.error('Failed to load presets', e);
    }
  }, []);

  const persistPresets = (newPresets: SavedPreset[]) => {
    setPresets(newPresets);
    try {
      localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(newPresets));
    } catch (e) {
      console.error('Failed to save presets to localStorage', e);
      showToast('Erreur lors de la sauvegarde du preset.', 'error');
    }
  };

  const handleSaveAsPreset = () => {
    const finalName = presetName.trim() || `${state.personal.firstName ? `${state.personal.firstName} ${state.personal.lastName}` : 'Signature RAGT'} - ${new Date().toLocaleDateString('fr-FR')}`;

    const newPreset: SavedPreset = {
      id: Date.now().toString(),
      name: finalName,
      category: presetCategory,
      date: new Date().toISOString(),
      state: JSON.parse(JSON.stringify(state)) // deep copy
    };

    persistPresets([newPreset, ...presets]);
    setPresetName('');
    showToast(`Preset « ${newPreset.name} » enregistré dans le stockage local !`, 'success');
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    const normalized = normalizeSignatureConfig(preset.state);
    if (!normalized) {
      showToast('Ce modèle est incomplet et ne peut pas être chargé.', 'error');
      return;
    }
    updateState(() => normalized);
    showToast(`Preset « ${preset.name} » chargé avec succès !`, 'success');
  };

  const handleOverwritePreset = (id: string, name: string) => {
    if (window.confirm(`Voulez-vous écraser le preset « ${name} » avec la configuration actuelle de la signature ?`)) {
      const updated = presets.map((p) =>
        p.id === id
          ? {
              ...p,
              date: new Date().toISOString(),
              state: JSON.parse(JSON.stringify(state))
            }
          : p
      );
      persistPresets(updated);
      showToast(`Preset « ${name} » mis à jour avec la signature active.`, 'success');
    }
  };

  const handleDeletePreset = (id: string, name: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le preset « ${name} » ?`)) {
      persistPresets(presets.filter((p) => p.id !== id));
      showToast(`Preset supprimé.`, 'info');
    }
  };

  const handleExportPresetJson = (preset: SavedPreset) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(createSignatureExport(preset.state), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `preset-ragt-${preset.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = normalizeSignatureConfig(JSON.parse(event.target?.result as string));
        if (imported) {
          const newPreset: SavedPreset = {
            id: Date.now().toString(),
            name: file.name.replace(/\.json$/i, ''),
            category: 'Importé',
            date: new Date().toISOString(),
            state: imported
          };
          persistPresets([newPreset, ...presets]);
          showToast(`Preset importé avec succès : « ${newPreset.name} »`, 'success');
        } else {
          showToast('Format JSON de configuration de signature invalide.', 'error');
        }
      } catch (err) {
        showToast('Erreur lors de la lecture du fichier JSON.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="p-4 space-y-4 text-slate-800 dark:text-slate-200">
      {!cardsOnly && <>
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
          <BookmarkPlus className="w-4 h-4 text-[#F7BD00]" />
          Presets &amp; Sauvegardes Locales
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Enregistrez vos configurations personnalisées dans le stockage local et chargez-les à tout moment.
        </p>
      </div>

      {/* Segmented Control */}
      <div className={`flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold mb-4 ${storageOnly ? 'gap-1' : ''}`}>
          <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-md transition-colors ${
            activeTab === 'presets'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <FolderHeart className="w-3.5 h-3.5" />
          Mes Presets ({presets.length})
          </button>
        {!storageOnly && <button
          type="button"
          onClick={() => setActiveTab('com_signatures')}
          className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-md transition-colors ${
            activeTab === 'com_signatures'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Signatures Com ({COMMUNICATION_SIGNATURES.length})
        </button>}
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-md transition-colors ${
            activeTab === 'history'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Versions ({savedRevisions.length + history.length})
        </button>
      </div>
      </>}

      {!cardsOnly && activeTab === 'presets' && (
        <div className="space-y-5">
          {/* Save Current as Preset Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <BookmarkPlus className="w-4 h-4 text-[#0C3866] dark:text-amber-400" />
                Enregistrer la configuration comme Preset
              </label>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">
                Stockage local
              </span>
            </div>

            {/* Current Configuration Summary */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 text-[11px] flex flex-wrap gap-2 text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#0C3866] dark:text-amber-400" />
                Disposition : <strong>{state.layout.preset.toUpperCase()}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Type className="w-3 h-3 text-[#0C3866] dark:text-amber-400" />
                Typo : <strong>{state.design.typography.baseFont.split(',')[0]}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-[#0C3866] dark:text-amber-400" />
                Badge : <strong>{state.visibility.secondaryLogo ? (state.logos.secondary?.alt?.includes('HVE') ? 'HVE' : 'ISO 9001') : 'Aucun'}</strong>
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Ex: RAGT Commercial France, Direction R&D..."
                  className="flex-1 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0C3866]/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveAsPreset()}
                />
                <select
                  value={presetCategory}
                  onChange={(e) => setPresetCategory(e.target.value)}
                  className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-2 text-slate-700 dark:text-slate-200 font-medium"
                >
                  <option value="Général">Général</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Direction">Direction</option>
                  <option value="R&D">R&amp;D Semences</option>
                  <option value="Régional">Régional / Agence</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSaveAsPreset}
                className="w-full bg-[#0C3866] hover:bg-[#092b50] dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-xs shadow-2xs"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Enregistrer comme Preset</span>
              </button>
            </div>
          </div>

          {/* List of Saved Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Vos Presets sauvegardés ({presets.length})
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportJson}
                  accept=".json"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-[#0C3866] dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  title="Importer un fichier JSON"
                >
                  <Upload className="w-3 h-3" />
                  Importer
                </button>
              </div>
            </div>

            {presets.length === 0 ? (
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center text-slate-500 dark:text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto opacity-40 text-[#0C3866] dark:text-amber-400" />
                <p className="text-xs font-medium">Aucun preset sauvegardé dans le stockage local.</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Personnalisez votre signature puis cliquez sur « Enregistrer comme Preset » ci-dessus.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {presets.map((preset) => (
                  <div
                    key={preset.id}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-2 hover:border-[#0C3866]/40 dark:hover:border-amber-400/40 transition-colors shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                            {preset.name}
                          </h5>
                          {preset.category && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                              {preset.category}
                            </span>
                          )}
                          <span className="px-1.5 py-0.5 text-[9px] font-mono bg-blue-50 dark:bg-blue-950/60 text-[#0C3866] dark:text-blue-300 rounded uppercase">
                            {preset.state.layout?.preset || 'A'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                          Enregistré le {new Date(preset.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleLoadPreset(preset)}
                          className="px-2.5 py-1.5 bg-[#0C3866] hover:bg-[#092b50] dark:bg-amber-400 dark:hover:bg-amber-500 text-white dark:text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          title="Charger ce preset"
                        >
                          <DownloadCloud className="w-3.5 h-3.5" />
                          <span>Charger</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExportPresetJson(preset)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Exporter en JSON"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePreset(preset.id, preset.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Supprimer ce preset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Metadata chips */}
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700/60">
                      <span>Typo : {preset.state.design?.typography?.baseFont?.split(',')[0] || 'Arial'}</span>
                      <span>•</span>
                      <span>{preset.state.visibility?.qr ? 'Avec QR' : 'Sans QR'}</span>
                      <span>•</span>
                      <span>{preset.state.visibility?.secondaryLogo ? 'Badge actif' : 'Sans badge'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(cardsOnly || activeTab === 'com_signatures') && (
        <div className="space-y-4">
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0C3866] dark:text-amber-400"><ScanText className="h-4 w-4 text-[#F7BD00]" /> Analyser une image de carte</h3><p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Importez une carte : l’OCR repère les textes d’exemple pour préparer leur remplacement par les données de l’application.</p></div>
              <input ref={cardImageInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAnalyzeCardImage} className="hidden" />
              <button type="button" onClick={() => cardImageInputRef.current?.click()} disabled={ocrStatus === 'loading'} className="shrink-0 rounded-lg bg-[#0C3866] px-2.5 py-1.5 text-[11px] font-bold text-white disabled:opacity-60"><Upload className="mr-1 inline h-3.5 w-3.5" />{ocrStatus === 'loading' ? `Analyse ${ocrProgress} %` : 'Importer'}</button>
            </div>
            {ocrStatus === 'done' && <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-2.5 text-[11px] dark:border-emerald-800 dark:bg-slate-800"><p className="mb-1 font-semibold text-emerald-800 dark:text-emerald-300">Champs détectés : ils seront remplacés par vos coordonnées lors de la mise en carte.</p><div className="flex flex-wrap gap-1.5">{detectedFields.slice(0, 10).map((field, index) => <span key={`${field.text}-${index}`} className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 dark:bg-slate-700 dark:text-slate-200">{field.kind} : {field.text}</span>)}</div></div>}
            {ocrStatus === 'error' && <p className="mt-2 text-[11px] text-rose-700 dark:text-rose-300">Utilisez une image nette, lisible et orientée horizontalement.</p>}
          </section>
          {/* Cartes préconfigurées du service Communication */}
          <div className="space-y-4">
            {COMMUNICATION_SIGNATURES.map((sig) => {
              const isCurrentlyActive = state.presetName?.includes(sig.name) ?? false;
              return (
                <div
                  key={sig.id}
                  className={`bg-white dark:bg-slate-800 border rounded-xl p-4 space-y-3.5 transition-all shadow-2xs ${
                    isCurrentlyActive
                      ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/20 dark:ring-amber-400/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {sig.name}
                      </h5>
                      {isCurrentlyActive && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                          Actif dans le studio
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                      {sig.width} × {sig.height} px
                    </span>
                  </div>

                  {/* Cleaned Card Visual Preview */}
                  <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center relative group">
                    <img
                      src={sig.url}
                      alt={sig.name}
                      className="max-w-full h-auto object-contain rounded shadow-2xs"
                      style={{ maxHeight: '135px' }}
                    />
                    <div className="mt-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Coordonnées factices vidées — Prêt à afficher votre signature</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {sig.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => handleApplyComSignature(sig)}
                      disabled={applyingCardId !== null}
                      className="flex-1 min-w-[200px] py-2 px-3 bg-[#0C3866] hover:bg-[#092b50] disabled:cursor-wait disabled:opacity-60 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>{applyingCardId === sig.id ? 'Création de la carte…' : 'Remplacer par ma signature'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyComHtml(sig)}
                      className="py-2 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      title="Copier le code HTML de l'image cliquable"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier HTML</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadComImage(sig)}
                      className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Télécharger l'image PNG nettoyée"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!cardsOnly && activeTab === 'history' && (
        <div className="space-y-3">
          <section className="rounded-xl border border-[#0C3866]/20 bg-[#0C3866]/[0.03] p-3 dark:border-amber-400/20 dark:bg-amber-400/[0.04]">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">
              <BookmarkCheck className="h-4 w-4 text-[#0C3866] dark:text-amber-400" />
              Versions sauvegardées ({savedRevisions.length})
            </h4>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Conservées sur cet appareil, même après fermeture. Utilisez « Sauvegarder » dans l’en-tête pour créer une version.
            </p>
            {savedRevisions.length === 0 ? (
              <p className="mt-3 rounded-lg bg-white/70 p-3 text-center text-[11px] text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                Aucune version sauvegardée pour le moment.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {savedRevisions.map((revision) => (
                  <div key={revision.id} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">{revision.name}</p>
                      <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
                        {new Date(revision.timestamp).toLocaleString('fr-FR')} · {revision.state.presetName || revision.state.layout.preset}
                      </p>
                    </div>
                    <button type="button" onClick={() => restoreRevision(revision.id)} className="rounded-lg border border-[#0C3866]/25 px-2 py-1.5 text-[10px] font-bold text-[#0C3866] hover:bg-[#0C3866] hover:text-white dark:border-amber-400/30 dark:text-amber-300 dark:hover:bg-amber-400 dark:hover:text-slate-950" aria-label={`Restaurer ${revision.name}`}>
                      Restaurer
                    </button>
                    <button type="button" onClick={() => deleteRevision(revision.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30" aria-label={`Supprimer ${revision.name}`} title="Supprimer cette version">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            Historique de la session ({history.length})
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            Restaurez la signature dans un état précédent au cours de votre session de travail.
          </p>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {history.slice().reverse().map((pastState, reverseIdx) => {
              const actualIdx = history.length - 1 - reverseIdx;
              return (
                <button
                  key={actualIdx}
                  type="button"
                  onClick={() => revertToHistoryIndex(actualIdx)}
                  className="w-full text-left bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex items-center justify-between hover:border-[#0C3866] dark:hover:border-amber-400 hover:shadow-xs transition-all"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                      Version {actualIdx + 1}
                      {actualIdx === history.length - 1 && (
                        <span className="text-[9px] uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">Actuel</span>
                      )}
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {pastState.presetName || 'Signature'} • {pastState.layout.preset}
                    </p>
                  </div>
                  <RotateCcw className="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-[#0C3866] dark:hover:text-amber-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
