import React, { useState, useEffect, useRef } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { SignatureState } from '../../types/signature';
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

export const TemplatesPanel: React.FC = () => {
  const { state, updateState, showToast, history, revertToHistoryIndex } = useSignature();
  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [presetCategory, setPresetCategory] = useState('Général');
  const [activeTab, setActiveTab] = useState<'presets' | 'com_signatures' | 'history'>('presets');
  const [selectedCardPhoto, setSelectedCardPhoto] = useState<string>('/assets/bannieres/photo_carte_ragt.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardPhotoInputRef = useRef<HTMLInputElement>(null);

  const CARD_PHOTOS = [
    {
      id: 'carte-ragt-agronomes',
      name: 'Photo originale de la Carte',
      desc: 'Agronomes RAGT devant le tracteur vert',
      url: '/assets/bannieres/photo_carte_ragt.png',
      badge: 'Officiel'
    },
    {
      id: 'carte-ragt-bags',
      name: 'Sacs de Semences RAGT',
      desc: 'Emballages officiels certifiés',
      url: '/assets/bannieres/bags_signature.png',
      badge: 'Institutionnel'
    },
    {
      id: 'carte-ragt-field',
      name: 'Champs & Cultures RAGT',
      desc: 'Parcelles et recherche variétale',
      url: '/assets/bannieres/image_signature.png',
      badge: 'Génétique'
    }
  ];

  const handleUploadCardPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      if (url) {
        setSelectedCardPhoto(url);
        showToast('Votre photo a été chargée pour l’emplacement de la carte !', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyComSignature = (sig: CommunicationSignatureGraphic) => {
    const photoToUse = selectedCardPhoto || '/assets/bannieres/photo_carte_ragt.png';
    updateState((prev) => ({
      ...prev,
      presetName: `${sig.name} (avec ma signature)`,
      layout: {
        ...prev.layout,
        preset: 'layout-i', // Structure carte corporate 3 colonnes : Logo | Photo + Coordonnées | Réseaux
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
          color: '#FDC420', // Fond jaune officiel corporate RAGT
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
        imageUrl: photoToUse,
        altText: 'Photo carte RAGT',
        position: 'center', // Positionné au-dessus des coordonnées
        width: 175,
        height: 84,
        marginTop: 0,
        marginBottom: 10
      },
      social: {
        ...prev.social,
        style: 'icons-only',
        iconSize: 20,
        align: 'center',
        items: prev.social.items.map((item) => ({ ...item, iconStyle: 'circle', color: '#ffffff' }))
      },
      visibility: {
        ...prev.visibility,
        logo: true,
        banner: true,
        socials: true,
        phone: true,
        mobile: true,
        email: true,
        address: true,
        website: true,
        jobTitle: true
      }
    }));
    showToast(`Carte appliquée : coordonnées d'exemple remplacées par votre signature !`, 'success');
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
    updateState(() => JSON.parse(JSON.stringify(preset.state)));
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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(preset.state, null, 2));
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
        const imported = JSON.parse(event.target?.result as string);
        if (imported.layout && imported.personal) {
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
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold mb-4">
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
        <button
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
        </button>
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
          Historique ({history.length})
        </button>
      </div>

      {activeTab === 'presets' && (
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

      {activeTab === 'com_signatures' && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl p-3.5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Cartes Institutionnelles RAGT (Service Communication)
              </h4>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-700">
                Coordonnées d'exemple vidées
              </span>
            </div>
            <p className="text-[11px] text-amber-900/90 dark:text-amber-300/90 leading-relaxed">
              Les coordonnées d'exemple factices ont été <strong>entièrement effacées</strong> de chaque carte. Vous pouvez choisir <strong>l'image de la carte ou une autre image de votre choix</strong> pour l'emplacement photo supérieur, et vos coordonnées réelles s'intègrent automatiquement dans la signature.
            </p>
          </div>

          {/* SÉLECTEUR D'IMAGE POUR L'EMPLACEMENT DE LA CARTE ("À cet endroit") */}
          <div className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700/60 rounded-xl p-3.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0C3866] dark:text-amber-300 block">
                  Image à positionner à cet endroit (En haut des coordonnées) :
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Choisissez la photo de la carte ou importez votre propre visuel
                </span>
              </div>
              <input
                ref={cardPhotoInputRef}
                type="file"
                accept="image/*"
                onChange={handleUploadCardPhoto}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => cardPhotoInputRef.current?.click()}
                className="px-2.5 py-1 text-[10px] font-bold bg-[#0C3866]/10 hover:bg-[#0C3866]/20 text-[#0C3866] dark:bg-amber-400/20 dark:hover:bg-amber-400/30 dark:text-amber-300 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <Upload className="w-3 h-3" />
                <span>Autre image...</span>
              </button>
            </div>

            {/* Grid of photo choices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CARD_PHOTOS.map((photo) => {
                const isSelected = selectedCardPhoto === photo.url;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      setSelectedCardPhoto(photo.url);
                      // If the banner is currently active in layout-i, update it dynamically
                      if (state.layout.preset === 'layout-i') {
                        updateState((prev) => ({
                          ...prev,
                          banner: {
                            ...prev.banner,
                            enabled: true,
                            imageUrl: photo.url
                          }
                        }));
                      }
                      showToast(`Image « ${photo.name} » sélectionnée pour la carte`, 'info');
                    }}
                    className={`p-2 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0C3866] dark:border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-[#0C3866] dark:ring-amber-400'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-full h-14 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden mb-1.5 flex items-center justify-center">
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate pr-1">
                        {photo.name}
                      </span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#0C3866] dark:text-amber-400 shrink-0" />
                      ) : (
                        <span className="text-[9px] text-slate-400 font-mono">{photo.badge}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 VARIANTES DE CARTES RAGT */}
          <div className="space-y-4">
            {COMMUNICATION_SIGNATURES.map((sig) => {
              const isCurrentlyActive = state.layout.preset === 'layout-i' && state.presetName?.includes(sig.name);
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
                      className="flex-1 min-w-[200px] py-2 px-3 bg-[#0C3866] hover:bg-[#092b50] dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>Remplacer par ma signature</span>
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

      {activeTab === 'history' && (
        <div className="space-y-3">
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
