import React, { useRef, useState } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { PRESET_LOGOS, COMMUNICATION_SIGNATURES, isCommunicationSignatureUrl } from '../../constants/logos';
import { CLASSIFIED_PNG_ASSETS } from '../../constants/assets';
import { LogoItem } from '../../types/signature';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Check,
  Sliders,
  Eye,
  EyeOff,
  Trash2,
  Library,
  GripHorizontal,
  Edit2,
  Download,
  Search,
  X,
  AlertTriangle,
  BookmarkPlus,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

interface AssetGalleryItem {
  id: string;
  url: string;
  name: string;
  type: 'upload' | 'ai';
  category?: string;
  notes?: string;
  altText?: string;
}

const DEFAULT_CLASSIFIED_ASSETS: AssetGalleryItem[] = CLASSIFIED_PNG_ASSETS.map((item) => ({
  id: item.id,
  url: item.url,
  name: item.name,
  type: 'upload',
  category: item.subCategory,
  notes: `${item.originalFileName} — ${item.description}`,
  altText: item.name
}));

export const LogosPanel: React.FC = () => {
  const { state, updateState, showToast, setActiveTab } = useSignature();
  const { logos, visibility, iconSettings } = state;
  const [activeSubTab, setActiveSubTab] = useState<'primary' | 'signatures' | 'secondary' | 'icons' | 'gallery'>('primary');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetLogoRef = useRef<'primary' | 'secondary'>('primary');

  const [assets, setAssets] = useState<AssetGalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ragt_gallery_assets');
      if (saved) {
        const parsed: AssetGalleryItem[] = JSON.parse(saved);
        const existingUrls = new Set(parsed.map((p) => p.url));
        const missingDefaults = DEFAULT_CLASSIFIED_ASSETS.filter((d) => !existingUrls.has(d.url));
        return [...missingDefaults, ...parsed];
      }
      return DEFAULT_CLASSIFIED_ASSETS;
    } catch (e) {
      return DEFAULT_CLASSIFIED_ASSETS;
    }
  });

  const [editingAsset, setEditingAsset] = useState<AssetGalleryItem | null>(null);
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('all');
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  const addAsset = async (url: string, name: string, type: 'upload' | 'ai') => {
    const id = Date.now().toString();
    const newAsset: AssetGalleryItem = { id, url, name, type, category: 'Analyse en cours...' };
    
    setAssets(prev => {
      const next = [newAsset, ...prev];
      localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
      return next;
    });

    try {
      const res = await fetch('/api/categorize-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url })
      });
      if (res.ok) {
        const data = await res.json();
        setAssets(prev => {
          const next = prev.map(a => a.id === id ? { ...a, category: data.category } : a);
          localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
          return next;
        });
      }
    } catch (e) {
      console.error('Categorization failed', e);
      setAssets(prev => {
        const next = prev.map(a => a.id === id ? { ...a, category: 'Autre' } : a);
        localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
        return next;
      });
    }
  };

  const updateAsset = (id: string, updates: Partial<AssetGalleryItem>) => {
    setAssets(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...updates } : a);
      localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
      return next;
    });
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => {
      const next = prev.filter(a => a.id !== id);
      localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
      return next;
    });
  };

  const handleBulkDelete = () => {
    if (selectedAssets.size === 0) return;
    if (window.confirm(`Supprimer ${selectedAssets.size} élément(s) ?`)) {
      setAssets(prev => {
        const next = prev.filter(a => !selectedAssets.has(a.id));
        localStorage.setItem('ragt_gallery_assets', JSON.stringify(next));
        return next;
      });
      setSelectedAssets(new Set());
    }
  };

  const handleBulkExport = () => {
    selectedAssets.forEach(id => {
      const asset = assets.find(a => a.id === id);
      if (asset) {
        const a = document.createElement('a');
        a.href = asset.url;
        a.download = asset.name || 'asset.png';
        a.click();
      }
    });
    showToast('Exportation de la sélection lancée.', 'success');
  };

  const handleApplyAsset = (asset: AssetGalleryItem | { id?: string; name?: string; url: string; category?: string }) => {
    const cat = (asset.category || '').toLowerCase();
    const name = (asset.name || '').toLowerCase();
    const isComSignature = isCommunicationSignatureUrl(asset.url) ||
      cat.includes('signature') ||
      name.includes('signature') ||
      name.includes('carte ragt') ||
      name.includes('variante') ||
      asset.id?.includes('ragt-com');

    if (isComSignature) {
      let photoUrl = '/assets/bannieres/photo_carte_ragt.png';
      if (name.includes('variante 2') || asset.url.includes('a3d7dcd5') || asset.id?.includes('2')) {
        photoUrl = '/assets/bannieres/bags_signature.png';
      } else if (name.includes('variante 3') || asset.url.includes('23c4cf0f') || asset.id?.includes('3')) {
        photoUrl = '/assets/bannieres/image_signature.png';
      }

      updateState((prev) => ({
        ...prev,
        presetName: `${asset.name || 'Carte RAGT Officielle'} (avec ma signature)`,
        layout: {
          ...prev.layout,
          preset: 'layout-i',
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
          separator: { ...prev.layout.separator, type: 'none' }
        },
        design: {
          ...prev.design,
          background: {
            ...prev.design.background,
            type: 'color',
            color: '#FDC420',
            borderRadius: 8,
            padding: 14
          },
          colors: {
            ...prev.design.colors,
            primary: '#0C3866',
            secondary: '#285D63',
            text: '#1E4143',
            icons: '#ffffff'
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
          imageUrl: photoUrl,
          altText: 'Photo carte RAGT',
          position: 'center',
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
      showToast(`Fond de carte corporate « ${asset.name || 'RAGT'} » appliqué avec vos coordonnées !`, 'success');
    } else if (cat.includes('bandeau') || cat.includes('fond') || name.includes('bannière') || name.includes('photo')) {
      updateState((prev) => ({
        ...prev,
        banner: {
          ...prev.banner,
          enabled: true,
          imageUrl: asset.url
        },
        visibility: { ...prev.visibility, banner: true }
      }));
      showToast(`Bannière « ${asset.name} » appliquée`, 'success');
    } else {
      updateLogo('primary', {
        url: asset.url,
        width: 95,
        height: 100,
        alt: asset.name
      });
      updateState((prev) => ({
        ...prev,
        visibility: { ...prev.visibility, logo: true }
      }));
      showToast(`Logo principal défini sur « ${asset.name} »`, 'success');
    }
  };

  const filteredAssets = assets.filter((a) => {
    const term = gallerySearch.toLowerCase();
    const matchesSearch =
      !term ||
      a.name.toLowerCase().includes(term) ||
      (a.category && a.category.toLowerCase().includes(term)) ||
      (a.notes && a.notes.toLowerCase().includes(term));
    const matchesCategory =
      galleryCategoryFilter === 'all' ||
      (galleryCategoryFilter === 'logos' && (a.category?.toLowerCase().includes('logo') || a.category?.toLowerCase().includes('emblème'))) ||
      (galleryCategoryFilter === 'signatures' && a.category?.toLowerCase().includes('signature')) ||
      (galleryCategoryFilter === 'banners' && (a.category?.toLowerCase().includes('bandeau') || a.category?.toLowerCase().includes('fond')));
    return matchesSearch && matchesCategory;
  });

  const toggleAssetSelection = (id: string) => {
    setSelectedAssets(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAiGenerate = async (target: 'primary' | 'secondary') => {
    if (!aiPrompt.trim()) {
      showToast('Veuillez entrer une description.', 'warning');
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur lors de la génération');
      
      updateLogo(target, {
        url: data.imageUrl,
        width: 120,
        height: 120,
        alt: 'AI Generated Logo'
      });
      addAsset(data.imageUrl, 'Logo Généré', 'ai');
      showToast('Logo IA généré et ajouté à la galerie.', 'success');
      setAiPrompt('');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateLogo = (target: 'primary' | 'secondary', patch: Partial<LogoItem>) => {
    if (target === 'primary' && patch.url && isCommunicationSignatureUrl(patch.url)) {
      handleApplyAsset({
        id: 'ragt-com-card',
        name: 'Carte RAGT Officielle',
        url: patch.url,
        category: 'signature'
      });
      return;
    }

    updateState((prev) => ({
      ...prev,
      logos: {
        ...prev.logos,
        [target]: {
          ...prev.logos[target],
          ...patch
        }
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'primary' | 'secondary') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image trop volumineuse. Veuillez choisir une image de moins de 2 Mo.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      // Load image to get natural dimensions
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        const targetWidth = Math.min(160, img.width);
        const targetHeight = Math.round(targetWidth / ratio);

        updateLogo(target, {
          url: dataUrl,
          width: targetWidth,
          height: targetHeight,
          alt: file.name.replace(/\.[^/.]+$/, '')
        });
        addAsset(dataUrl, file.name.replace(/\.[^/.]+$/, ''), 'upload');
        showToast('Logo importé et ajouté à la galerie', 'success');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerUpload = (target: 'primary' | 'secondary') => {
    targetLogoRef.current = target;
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 space-y-4 text-slate-800 dark:text-slate-200">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, targetLogoRef.current)}
        accept="image/png, image/jpeg, image/svg+xml, image/webp"
        className="hidden"
      />

      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#F7BD00]" />
          Logos institutionnels &amp; Icônes
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Sélectionnez les logos RAGT ou importez vos visuels certifiés.
        </p>
      </div>

      {/* Segmented Sub-Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold overflow-x-auto gap-0.5">
        <button
          type="button"
          onClick={() => setActiveSubTab('primary')}
          className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
            activeSubTab === 'primary'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Logo principal
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('signatures')}
          className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
            activeSubTab === 'signatures'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Signatures Com
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('secondary')}
          className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
            activeSubTab === 'secondary'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Logo secondaire
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('icons')}
          className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
            activeSubTab === 'icons'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Icônes
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('gallery')}
          className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
            activeSubTab === 'gallery'
              ? 'bg-white dark:bg-slate-700 text-[#0C3866] dark:text-amber-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Galerie PNG
        </button>
      </div>

      {/* LOGO PRINCIPAL */}
      {activeSubTab === 'primary' && (
        <div className="space-y-4">
          {/* Warning banner if a full communication signature is set as the isolated logo */}
          {isCommunicationSignatureUrl(logos.primary.url) && (
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl space-y-2.5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-amber-900 dark:text-amber-300">
                    Signature graphique complète détectée dans le champ Logo
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-400/90 mt-0.5 leading-relaxed">
                    L'image actuellement affectée au logo est une <strong>signature intégrale réalisée par la communication</strong>. Pour conserver un affichage propre avec vos coordonnées textuelles HTML, utilisez l'emblème officiel RAGT ou consultez l'onglet Modèles.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    updateLogo('primary', {
                      url: '/assets/uploads/logo_ragt.png',
                      width: 95,
                      height: 100,
                      alt: 'Logo Officiel RAGT Semences'
                    });
                    showToast('Logo officiel RAGT rétabli avec succès !', 'success');
                  }}
                  className="px-3 py-1.5 bg-[#0C3866] hover:bg-[#092b50] dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Rétablir le logo officiel RAGT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('templates')}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 text-[11px] font-semibold rounded-lg hover:bg-amber-100/50 transition-colors flex items-center gap-1.5"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Accéder aux signatures complètes</span>
                </button>
              </div>
            </div>
          )}

          {/* Current preview card */}
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Aperçu du logo actuel :</span>
              <button
                type="button"
                onClick={() => updateState((prev) => ({
                  ...prev,
                  visibility: { ...prev.visibility, logo: !prev.visibility.logo }
                }))}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  visibility.logo ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'
                }`}
              >
                {visibility.logo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{visibility.logo ? 'Affiché' : 'Masqué'}</span>
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[90px]">
              {logos.primary.url ? (
                <img
                  src={logos.primary.url}
                  alt={logos.primary.alt}
                  style={{ width: `${logos.primary.width}px`, height: `${logos.primary.height}px` }}
                  className="object-contain max-h-[90px]"
                />
              ) : (
                <span className="text-xs text-slate-400">Aucun logo configuré</span>
              )}
            </div>

            {/* Upload Button */}
            <button
              type="button"
              onClick={() => triggerUpload('primary')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#0C3866] dark:text-amber-400" />
              <span>Importer un autre logo (PNG, JPG, SVG)</span>
            </button>

            {/* AI Generator */}
            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/60">
              <label className="text-[11px] font-semibold text-[#0C3866] dark:text-amber-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F7BD00]" />
                Générer un logo / portrait avec l'IA
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: Un portrait professionnel..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleAiGenerate('primary')}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="px-3 py-1.5 bg-[#0C3866] dark:bg-amber-500 dark:text-slate-950 text-white rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? '...' : 'Générer'}
                </button>
              </div>
            </div>
          </div>

          {/* Preset Library (Requirement 14.3) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Bibliothèque officielle RAGT :
              </label>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                Logos &amp; Emblèmes
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_LOGOS.filter((l) => l.category === 'ragt').map((item) => {
                const isSelected = logos.primary.url === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      updateLogo('primary', {
                        url: item.url,
                        width: item.defaultWidth,
                        height: item.defaultHeight,
                        alt: item.name
                      });
                      showToast(`${item.name} appliqué`, 'info');
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#0C3866] dark:border-amber-400 bg-[#0C3866]/5 dark:bg-amber-400/10 ring-1 ring-[#0C3866] dark:ring-amber-400'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                        <img src={item.url} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0C3866] dark:text-slate-100">{item.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</div>
                        <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                          {item.defaultWidth} × {item.defaultHeight} px
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#0C3866] dark:text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dedicated callout explaining communication full signatures */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0C3866] dark:text-amber-400">
                <BookmarkPlus className="w-4 h-4 text-[#F7BD00]" />
                <span>Signatures Graphiques Complètes (Com)</span>
              </div>
              <span className="text-[10px] font-bold bg-[#0C3866]/10 dark:bg-amber-400/20 text-[#0C3866] dark:text-amber-300 px-2 py-0.5 rounded-full">
                3 variantes
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Les variantes 1, 2 et 3 créées par la communication sont des <strong>signatures intégrales clé en main</strong> (visuels prêts à l'emploi incluant le logo, le fond jaune et la mise en page). Retrouvez-les dans l'onglet <strong>Modèles &amp; Presets</strong>.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className="w-full text-center py-2 px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold text-[#0C3866] dark:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Ouvrir les signatures complètes de la communication</span>
            </button>
          </div>

          {/* Dimensions Controls */}
          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Dimensions du logo (px) :</span>
              <span className="font-mono text-slate-500 dark:text-slate-400">{logos.primary.width} × {logos.primary.height} px</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Largeur :</label>
                <input
                  type="number"
                  min="40"
                  max="280"
                  value={logos.primary.width}
                  onChange={(e) => {
                    const w = Number(e.target.value);
                    const ratio = logos.primary.width / (logos.primary.height || 1);
                    updateLogo('primary', {
                      width: w,
                      height: logos.primary.keepRatio ? Math.round(w / ratio) : logos.primary.height
                    });
                  }}
                  className="w-full px-2 py-1 border rounded bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Hauteur :</label>
                <input
                  type="number"
                  min="20"
                  max="140"
                  value={logos.primary.height}
                  onChange={(e) => updateLogo('primary', { height: Number(e.target.value) })}
                  className="w-full px-2 py-1 border rounded bg-slate-50 font-mono"
                />
              </div>
            </div>

            {/* Redirection Link */}
            <div>
              <label className="text-[11px] text-slate-600 block mb-1">Lien de redirection au clic :</label>
              <div className="flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="https://www.ragt.fr"
                  value={logos.primary.linkUrl}
                  onChange={(e) => updateLogo('primary', { linkUrl: e.target.value })}
                  className="w-full px-2 py-1 border rounded bg-slate-50 text-blue-700 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIGNATURES GRAPHIQUES COMMUNICATION (PNG) */}
      {activeSubTab === 'signatures' && (
        <div className="space-y-4">
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl p-3.5 space-y-1.5 shadow-2xs">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Signatures Graphiques du Service Communication (Fond de carte)
            </h4>
            <p className="text-[11px] text-amber-800 dark:text-amber-400/90 leading-relaxed">
              Ces visuels correspondent aux variantes de la <strong>Carte RAGT Officielle</strong>. En cliquant sur « Appliquer comme fond de carte », le modèle configure le fond jaune officiel, l'emblème RAGT à gauche, la photo de campagne correspondante et vos coordonnées réelles.
            </p>
          </div>

          <div className="space-y-3">
            {COMMUNICATION_SIGNATURES.map((sig) => {
              const isApplied = state.layout.preset === 'layout-i' && (
                state.presetName?.includes(sig.name) ||
                (sig.id === 'ragt-com-signature-1' && state.banner.imageUrl?.includes('photo_carte_ragt')) ||
                (sig.id === 'ragt-com-signature-2' && state.banner.imageUrl?.includes('bags_signature')) ||
                (sig.id === 'ragt-com-signature-3' && state.banner.imageUrl?.includes('image_signature'))
              );
              return (
                <div
                  key={sig.id}
                  className={`bg-white dark:bg-slate-800 border rounded-xl p-3.5 space-y-3 transition-all ${
                    isApplied
                      ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{sig.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">{sig.width} × {sig.height} px</span>
                    </div>
                    {isApplied && (
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
                        Actif
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <img
                      src={sig.url}
                      alt={sig.name}
                      className="max-w-full h-auto object-contain rounded"
                      style={{ maxHeight: '110px' }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleApplyAsset(sig as any)}
                      className="flex-1 py-1.5 px-3 bg-[#0C3866] hover:bg-[#092b50] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Appliquer comme fond de carte</span>
                    </button>
                    <a
                      href={sig.url}
                      download={`${sig.id}.png`}
                      className="p-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Télécharger l'image PNG nettoyée"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LOGO SECONDAIRE / CERTIFICATION */}
      {activeSubTab === 'secondary' && (
        <div className="space-y-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Logo certification / partenaire :</span>
              <button
                type="button"
                onClick={() => updateState((prev) => ({
                  ...prev,
                  visibility: { ...prev.visibility, secondaryLogo: !prev.visibility.secondaryLogo }
                }))}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  visibility.secondaryLogo ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {visibility.secondaryLogo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{visibility.secondaryLogo ? 'Actif' : 'Désactivé'}</span>
              </button>
            </div>

            {/* Certifications Presets */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {PRESET_LOGOS.filter((l) => l.category === 'certification').map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    updateLogo('secondary', {
                      url: item.url,
                      width: item.defaultWidth,
                      height: item.defaultHeight,
                      alt: item.name
                    });
                    updateState((prev) => ({
                      ...prev,
                      visibility: { ...prev.visibility, secondaryLogo: true }
                    }));
                    showToast(`${item.name} activé`, 'success');
                  }}
                  className="p-2 border rounded-lg hover:border-slate-400 bg-slate-50 text-left transition-colors"
                >
                  <div className="h-10 flex items-center justify-center mb-1">
                    <img src={item.url} alt={item.name} className="max-h-full object-contain" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 truncate">{item.name}</div>
                </button>
              ))}
            </div>

            {/* Upload Custom Secondary */}
            <button
              type="button"
              onClick={() => triggerUpload('secondary')}
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#0C3866]" />
              <span>Importer un logo personnalisé</span>
            </button>

            {/* AI Generator for Secondary */}
            <div className="pt-2 mt-2 border-t border-slate-100">
              <label className="text-[11px] font-semibold text-[#0C3866] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F7BD00]" />
                Générer avec l'IA
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: Un badge de certification minimaliste..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleAiGenerate('secondary')}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="px-3 py-1.5 bg-[#0C3866] text-white rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? '...' : 'Générer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ICÔNES DE COORDONNÉES */}
      {activeSubTab === 'icons' && (
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
          <label className="font-semibold text-slate-700 block">
            Style des icônes de contact :
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'circle', label: 'Cercle discret' },
              { id: 'minimal', label: 'Minimaliste épuré' },
              { id: 'square', label: 'Carré doux' },
              { id: 'outline', label: 'Ligne simple' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateState((prev) => ({
                  ...prev,
                  iconSettings: { ...prev.iconSettings, style: st.id as any }
                }))}
                className={`py-2 px-2.5 rounded-lg border text-center ${
                  iconSettings.style === st.id
                    ? 'bg-[#0C3866] text-white font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[11px] text-slate-600 block mb-1">Taille (px) :</span>
              <input
                type="number"
                min="10"
                max="20"
                value={iconSettings.size}
                onChange={(e) => updateState((prev) => ({
                  ...prev,
                  iconSettings: { ...prev.iconSettings, size: Number(e.target.value) }
                }))}
                className="w-full px-2 py-1 border rounded bg-slate-50 font-mono"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-600 block mb-1">Couleur :</span>
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={iconSettings.color}
                  onChange={(e) => updateState((prev) => ({
                    ...prev,
                    iconSettings: { ...prev.iconSettings, color: e.target.value },
                    design: { ...prev.design, colors: { ...prev.design.colors, icons: e.target.value } }
                  }))}
                  className="w-7 h-7 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={iconSettings.color}
                  onChange={(e) => updateState((prev) => ({
                    ...prev,
                    iconSettings: { ...prev.iconSettings, color: e.target.value },
                    design: { ...prev.design, colors: { ...prev.design.colors, icons: e.target.value } }
                  }))}
                  className="w-full text-xs font-mono border rounded uppercase px-1 py-0.5 bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALERIE D'ASSETS */}
      {activeSubTab === 'gallery' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
            <p className="flex items-center gap-1.5 mb-1 text-slate-800 font-semibold">
              <Library className="w-4 h-4 text-[#0C3866]" /> Galerie d'images classées par menu
            </p>
            <p>Retrouvez ici tous les fichiers PNG du projet classés par catégorie (Logos, Signatures Communication, Bannières). Cliquez sur « Appliquer » pour intégrer instantanément l'élément.</p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un visuel ou un nom..."
                value={gallerySearch}
                onChange={e => setGallerySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-semibold">
              {[
                { id: 'all', label: 'Tous les visuels' },
                { id: 'logos', label: 'Menu Logos' },
                { id: 'signatures', label: 'Menu Signatures Com' },
                { id: 'banners', label: 'Menu Bannières & Fonds' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGalleryCategoryFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                    galleryCategoryFilter === tab.id
                      ? 'bg-[#0C3866] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {selectedAssets.size > 0 && (
            <div className="flex items-center justify-between bg-[#0C3866]/5 px-3 py-2 rounded-lg border border-[#0C3866]/10 text-xs">
              <span className="font-semibold text-[#0C3866]">{selectedAssets.size} sélectionné(s)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkExport}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:text-[#0C3866] hover:bg-slate-50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exporter
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 border border-rose-200 rounded text-rose-600 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </div>
            </div>
          )}

          {assets.length === 0 ? (
            <div className="text-center p-6 border border-dashed border-slate-300 rounded-xl bg-white text-slate-500 text-xs">
              Aucune image dans votre galerie.
            </div>
          ) : filteredAssets.length === 0 ? (
             <div className="text-center p-4 text-slate-500 text-xs">Aucun résultat pour cette recherche ou ce filtre.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredAssets.map(asset => (
                <div key={asset.id} className={`bg-white border rounded-xl overflow-hidden group transition-all flex flex-col justify-between ${selectedAssets.has(asset.id) ? 'border-[#0C3866] ring-1 ring-[#0C3866]' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div 
                    className="aspect-square bg-slate-50 p-2 flex items-center justify-center cursor-grab active:cursor-grabbing relative"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/uri-list', asset.url);
                      e.dataTransfer.setData('application/ragt-asset', asset.url);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssets.has(asset.id)}
                      onChange={() => toggleAssetSelection(asset.id)}
                      className="absolute top-2 left-2 z-10 w-4 h-4 rounded border-slate-300 text-[#0C3866] focus:ring-[#0C3866]"
                    />
                    {asset.category && (
                      <span className="absolute bottom-2 right-2 text-[9px] font-semibold px-1.5 py-0.5 bg-white/90 backdrop-blur text-slate-700 rounded shadow-xs">
                        {asset.category}
                      </span>
                    )}
                    <img src={asset.url} alt={asset.altText || asset.name} className="max-w-full max-h-full object-contain drop-shadow-xs" />
                  </div>
                  <div className="p-2 border-t border-slate-100 bg-slate-50/80 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-800 block truncate" title={asset.name}>{asset.name}</span>
                    <div className="flex items-center justify-between gap-1">
                      <button
                        type="button"
                        onClick={() => handleApplyAsset(asset)}
                        className="flex-1 py-1 px-1.5 bg-[#0C3866] hover:bg-[#092b50] text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                        title="Appliquer dans la signature"
                      >
                        <Check className="w-3 h-3" />
                        <span>Appliquer</span>
                      </button>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingAsset(asset)}
                          className="text-slate-400 hover:text-[#0C3866] transition-colors p-1 rounded hover:bg-blue-50"
                          title="Modifier"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAsset(asset.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-rose-50"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL EDITION ASSET */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0C3866]">Modifier l'image</h3>
              <button onClick={() => setEditingAsset(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center p-2">
                   <img src={editingAsset.url} alt="Aperçu" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Nom d'affichage</label>
                <input
                  type="text"
                  value={editingAsset.name}
                  onChange={e => setEditingAsset({ ...editingAsset, name: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Texte alternatif (Accessibilité)</label>
                <input
                  type="text"
                  value={editingAsset.altText || ''}
                  onChange={e => setEditingAsset({ ...editingAsset, altText: e.target.value })}
                  placeholder="Ex: Logo RAGT Hiver 2026"
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Catégorie</label>
                <input
                  type="text"
                  value={editingAsset.category || ''}
                  onChange={e => setEditingAsset({ ...editingAsset, category: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Notes internes</label>
                <textarea
                  value={editingAsset.notes || ''}
                  onChange={e => setEditingAsset({ ...editingAsset, notes: e.target.value })}
                  rows={2}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 focus:bg-white resize-none"
                />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
              <button
                onClick={() => setEditingAsset(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  updateAsset(editingAsset.id, {
                    name: editingAsset.name,
                    altText: editingAsset.altText,
                    notes: editingAsset.notes,
                    category: editingAsset.category
                  });
                  setEditingAsset(null);
                  showToast('Modifications enregistrées', 'success');
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-[#0C3866] text-white hover:bg-[#0a2e54] rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
