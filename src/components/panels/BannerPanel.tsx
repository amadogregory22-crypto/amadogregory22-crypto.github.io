import React, { useState, useRef } from 'react';
import { useSignature } from '../../context/SignatureContext';
import { BannerConfig, SloganConfig } from '../../types/signature';
import {
  Flag,
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
  Sparkles,
  Eye,
  EyeOff,
  Quote,
  ChevronDown,
  ChevronUp,
  Upload,
  Check
} from 'lucide-react';
import { FONDS_IMAGES, MOTIFS_IMAGES, CLASSIFIED_PNG_ASSETS, BANNER_IMAGES, SIGNATURES_COM } from '../../constants/assets';

export const BannerPanel: React.FC = () => {
  const { state, updateState, showToast } = useSignature();
  const { banner, slogan, visibility } = state;
  const [showGallery, setShowGallery] = useState(false);
  const cardPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleUploadCustomPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      if (url) {
        updateBanner({
          imageUrl: url,
          enabled: true,
          position: state.layout.preset === 'layout-i' ? 'center' : banner.position,
          width: state.layout.preset === 'layout-i' ? 175 : 400,
          height: state.layout.preset === 'layout-i' ? 84 : 120,
          maintainRatio: true
        });
        updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
        showToast('Votre photo a été positionnée à cet endroit !', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const updateBanner = (patch: Partial<BannerConfig>) => {
    updateState((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        ...patch
      }
    }));
  };

  const updateSlogan = (patch: Partial<SloganConfig>) => {
    updateState((prev) => ({
      ...prev,
      slogan: {
        ...prev.slogan,
        ...patch
      }
    }));
  };

  // Preset ready-to-test campaign banners
  const sampleBanners = [
    {
      title: 'Salon SPACE 2026',
      url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
      link: 'https://www.ragt-semences.com/evenements/space',
      campaign: 'SPACE 2026 — Hall 4 Stand B22'
    },
    {
      title: 'Sélection Variétale Blé & Maïs',
      url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80',
      link: 'https://www.ragt.fr/varietes',
      campaign: 'Génétique & Performance 2026'
    },
    {
      title: 'Recrutement & Carrières',
      url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80',
      link: 'https://www.ragt.fr/carrieres',
      campaign: 'Rejoignez RAGT Semences'
    }
  ];

  return (
    <div className="p-4 space-y-5 text-slate-800">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[#0C3866] uppercase tracking-wide flex items-center gap-1.5">
          <Flag className="w-4 h-4 text-[#F7BD00]" />
          Bannière de campagne &amp; Slogan
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Diffusez des actualités ponctuelles (salons, vœux, innovations) sans modifier vos coordonnées.
        </p>
      </div>

      {/* 19. BANNIÈRE ÉVÉNEMENTIELLE */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3.5 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-800 block">Bannière promotionnelle</span>
            <span className="text-[11px] text-slate-500">{banner.campaignName || 'Campagne en cours'}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextVal = !visibility.banner;
              updateState((prev) => ({
                ...prev,
                visibility: { ...prev.visibility, banner: nextVal },
                banner: { ...prev.banner, enabled: nextVal }
              }));
              showToast(nextVal ? 'Bannière activée' : 'Bannière masquée', 'info');
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
              visibility.banner && banner.enabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {visibility.banner && banner.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{visibility.banner && banner.enabled ? 'Active' : 'Désactivée'}</span>
          </button>
        </div>

        {/* Emplacement Photo de la Carte RAGT (« À cet endroit ») */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Emplacement Photo de la Carte RAGT (« À cet endroit »)
              </span>
              <span className="text-[10px] text-amber-900/80 dark:text-amber-300/80">
                Positionnez l'image de la carte ou une autre image au-dessus de votre signature
              </span>
            </div>
            <input
              ref={cardPhotoInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadCustomPhoto}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => cardPhotoInputRef.current?.click()}
              className="px-2.5 py-1 text-[10px] font-bold bg-[#0C3866] hover:bg-[#092b50] text-white rounded-lg transition-colors flex items-center gap-1 shrink-0 shadow-2xs"
            >
              <Upload className="w-3 h-3" />
              <span>Autre image...</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                name: 'Photo de la Carte',
                sub: 'Agronomes & Tracteur vert',
                url: '/assets/bannieres/photo_carte_ragt.png'
              },
              {
                name: 'Sacs de Semences RAGT',
                sub: 'Emballages officiels',
                url: '/assets/bannieres/bags_signature.png'
              },
              {
                name: 'Champs & Cultures RAGT',
                sub: 'Recherche agronomique',
                url: '/assets/bannieres/image_signature.png'
              }
            ].map((item) => {
              const isSelected = banner.imageUrl === item.url;
              return (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => {
                    updateBanner({
                      imageUrl: item.url,
                      enabled: true,
                      position: state.layout.preset === 'layout-i' ? 'center' : banner.position,
                      width: state.layout.preset === 'layout-i' ? 175 : 400,
                      height: state.layout.preset === 'layout-i' ? 84 : 120,
                      maintainRatio: true
                    });
                    updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                    showToast(`Image « ${item.name} » positionnée à cet endroit`, 'success');
                  }}
                  className={`p-2 rounded-lg border text-left transition-all flex flex-col justify-between bg-white dark:bg-slate-800 ${
                    isSelected
                      ? 'border-[#0C3866] ring-2 ring-[#0C3866]/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="h-14 w-full rounded overflow-hidden mb-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-100 flex items-center justify-center">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="min-w-0 pr-1">
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</div>
                      <div className="text-[9px] text-slate-500 truncate">{item.sub}</div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0C3866] shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Banner Presets */}
        <div>
          <label className="text-slate-600 font-semibold block mb-1">Exemples de campagnes prêtes à l'emploi :</label>
          <div className="grid grid-cols-3 gap-2">
            {sampleBanners.map((sb) => (
              <button
                key={sb.title}
                type="button"
                onClick={() => {
                      updateBanner({
                        title: sb.title,
                        imageUrl: sb.url,
                        linkUrl: sb.link,
                        campaignName: sb.campaign,
                        enabled: true,
                        maintainRatio: true
                      });
                  updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                  showToast(`Campagne « ${sb.title} » appliquée`, 'success');
                }}
                className="p-2 border rounded-lg hover:border-[#0C3866] bg-slate-50 text-left transition-colors"
              >
                <div className="h-10 rounded overflow-hidden mb-1 bg-slate-200">
                  <img src={sb.url} alt={sb.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px] font-bold text-[#0C3866] truncate">{sb.title}</div>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="flex items-center justify-between w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
            >
              <span>Voir les ressources importées (Fonds & Motifs)</span>
              {showGallery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showGallery && (
              <div className="mt-2 p-2.5 border border-slate-200 rounded-lg bg-slate-50 max-h-80 overflow-y-auto space-y-3">
                {/* Official PNG Banners */}
                <div>
                  <div className="text-[10px] font-bold text-[#0C3866] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F7BD00]" />
                    <span>Bandeaux Photographiques Officiels RAGT (PNG)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {CLASSIFIED_PNG_ASSETS.filter((p) => p.menuTarget === 'banner').map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          updateBanner({ imageUrl: item.url, enabled: true });
                          updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                          showToast(`Bannière « ${item.name} » appliquée`, 'success');
                        }}
                        className={`group p-2 rounded-lg border text-left transition-all bg-white hover:border-[#0C3866] ${
                          banner.imageUrl === item.url ? 'border-[#0C3866] ring-2 ring-[#0C3866]/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="h-16 w-full rounded overflow-hidden mb-1.5 bg-slate-100">
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-800 line-clamp-1">{item.name}</div>
                        <div className="text-[9px] font-mono text-slate-500">{item.width} × {item.height} px</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] font-bold text-[#0C3866] mb-1 uppercase tracking-wider mt-4">Vraies Bannières (JPG)</div>
                <div className="text-[9px] text-slate-500 mb-2">Bannières adaptées à la largeur de la carte (Hauteur max 30px)</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {BANNER_IMAGES.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        updateBanner({ 
                          imageUrl: img, 
                          enabled: true,
                          position: 'bottom',
                          width: state.layout.dimensions.totalWidth,
                          height: 30,
                          maintainRatio: false
                        });
                        updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                      }}
                      className="group relative rounded overflow-hidden border border-slate-200 hover:border-[#0C3866] focus:outline-none"
                    >
                      <img src={img} alt="Bannière" className="w-full h-8 object-cover group-hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-bold text-[#0C3866] mb-1 uppercase tracking-wider mt-4">Signatures Com (JPG)</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {SIGNATURES_COM.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        updateBanner({ 
                          imageUrl: img, 
                          enabled: true,
                          position: 'bottom',
                          width: state.layout.dimensions.totalWidth,
                          height: 30,
                          maintainRatio: false
                        });
                        updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                      }}
                      className="group relative rounded overflow-hidden border border-slate-200 hover:border-[#0C3866] focus:outline-none"
                    >
                      <img src={img} alt="Signature Com" className="w-full h-8 object-cover group-hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider mt-4">Fonds d'écran (Bandeaux JPG)</div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {FONDS_IMAGES.filter((img) => !img.endsWith('.png')).map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        updateBanner({ imageUrl: img, enabled: true });
                        updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                      }}
                      className="group relative rounded overflow-hidden border border-slate-200 hover:border-[#0C3866] focus:outline-none"
                    >
                      <img src={img} alt="Fond" className="w-full h-12 object-cover group-hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Motifs institutionnels</div>
                <div className="grid grid-cols-4 gap-2">
                  {MOTIFS_IMAGES.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        updateBanner({ imageUrl: img, enabled: true });
                        updateState((prev) => ({ ...prev, visibility: { ...prev.visibility, banner: true } }));
                      }}
                      className="group relative rounded overflow-hidden border border-slate-200 hover:border-[#0C3866] focus:outline-none"
                    >
                      <img src={img} alt="Motif" className="w-full h-12 object-cover group-hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Image URL */}
        <div>
          <label className="text-slate-600 font-semibold block mb-1">URL de l'image de la bannière :</label>
          <input
            type="text"
            placeholder="https://..."
            value={banner.imageUrl}
            onChange={(e) => updateBanner({ imageUrl: e.target.value })}
            className="w-full px-2.5 py-1.5 border rounded-lg bg-slate-50 font-mono text-[11px] text-blue-700 focus:bg-white"
          />
        </div>

        {/* Link URL */}
        <div>
          <label className="text-slate-600 font-semibold block mb-1">Lien de redirection :</label>
          <div className="flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="https://www.ragt.fr/evenement"
              value={banner.linkUrl}
              onChange={(e) => updateBanner({ linkUrl: e.target.value })}
              className="w-full px-2.5 py-1.5 border rounded-lg bg-slate-50 text-xs"
            />
          </div>
        </div>

        {/* Width / Height & Standard Aspect Ratios */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-slate-600 font-semibold block">Dimensions (px) & Formats :</label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => updateBanner({ width: 600, height: 150 })}
              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700 hover:bg-slate-200"
            >
              600x150 (Large)
            </button>
            <button
              type="button"
              onClick={() => updateBanner({ width: 400, height: 100 })}
              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700 hover:bg-slate-200"
            >
              400x100 (Compact)
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <span className="text-[10px] text-slate-500 block mb-0.5">Largeur</span>
              <input
                type="number"
                value={banner.width || 600}
                onChange={(e) => {
                  const newWidth = Number(e.target.value);
                  if (banner.maintainRatio) {
                    const ratio = banner.height / banner.width;
                    updateBanner({ width: newWidth, height: Math.round(newWidth * ratio) });
                  } else {
                    updateBanner({ width: newWidth });
                  }
                }}
                className="w-full px-2 py-1 border rounded bg-slate-50 text-[11px] font-mono"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-500 block mb-0.5">Hauteur</span>
              <input
                type="number"
                value={banner.height || 150}
                onChange={(e) => {
                  const newHeight = Number(e.target.value);
                  if (banner.maintainRatio) {
                    const ratio = banner.width / banner.height;
                    updateBanner({ height: newHeight, width: Math.round(newHeight * ratio) });
                  } else {
                    updateBanner({ height: newHeight });
                  }
                }}
                className="w-full px-2 py-1 border rounded bg-slate-50 text-[11px] font-mono"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-600 font-semibold" title="Conserver les proportions">
                <input
                  type="checkbox"
                  checked={banner.maintainRatio !== false}
                  onChange={(e) => updateBanner({ maintainRatio: e.target.checked })}
                  className="rounded border-slate-300 text-[#0C3866] focus:ring-[#0C3866]"
                />
                Ratio lié
              </label>
            </div>
          </div>
        </div>

        {/* Position & Dates (Requirement 47) */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-slate-600 font-semibold block mb-1">Positionnement :</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => updateBanner({ position: 'top' })}
                className={`py-1 text-center rounded text-[11px] font-medium ${
                  banner.position === 'top' ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                Haut
              </button>
              <button
                type="button"
                onClick={() => updateBanner({ position: 'center' })}
                className={`py-1 text-center rounded text-[11px] font-medium ${
                  banner.position === 'center' || !banner.position ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                Centre
              </button>
              <button
                type="button"
                onClick={() => updateBanner({ position: 'bottom' })}
                className={`py-1 text-center rounded text-[11px] font-medium ${
                  banner.position === 'bottom' ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                Bas
              </button>
              <button
                type="button"
                onClick={() => updateBanner({ position: 'left' })}
                className={`py-1 text-center rounded text-[11px] font-medium ${
                  banner.position === 'left' ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                Gauche
              </button>
              <button
                type="button"
                onClick={() => updateBanner({ position: 'right' })}
                className={`py-1 text-center rounded text-[11px] font-medium ${
                  banner.position === 'right' ? 'bg-white text-[#0C3866] font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                Droite
              </button>
            </div>
          </div>

          <div>
            <label className="text-slate-600 font-semibold block mb-1">Dates de campagne :</label>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="date"
                value={banner.startDate || ''}
                onChange={(e) => updateBanner({ startDate: e.target.value })}
                className="w-full px-1.5 py-1 border rounded bg-slate-50 text-[11px] font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 20. SLOGAN INDÉPENDANT */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#F7BD00]" />
            <span className="font-bold text-slate-800">Slogan institutionnel RAGT</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextVal = !visibility.slogan;
              updateState((prev) => ({
                ...prev,
                visibility: { ...prev.visibility, slogan: nextVal },
                slogan: { ...prev.slogan, enabled: nextVal }
              }));
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
              visibility.slogan && slogan.enabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {visibility.slogan && slogan.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{visibility.slogan && slogan.enabled ? 'Affiché' : 'Masqué'}</span>
          </button>
        </div>

        <div>
          <label className="text-slate-600 font-semibold block mb-1">Texte du slogan :</label>
          <input
            type="text"
            value={slogan.text}
            onChange={(e) => updateSlogan({ text: e.target.value })}
            placeholder="Des semences pour demain"
            className="w-full px-2.5 py-1.5 border rounded-lg bg-slate-50 font-medium text-[#0C3866]"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Taille :</span>
            <input
              type="number"
              min="9"
              max="16"
              value={slogan.fontSize}
              onChange={(e) => updateSlogan({ fontSize: Number(e.target.value) })}
              className="w-full px-2 py-1 border rounded bg-slate-50 font-mono"
            />
          </div>

          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Couleur :</span>
            <div className="flex items-center gap-1">
              <input
                type="color"
                value={slogan.color}
                onChange={(e) => updateSlogan({ color: e.target.value })}
                className="w-6 h-6 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={slogan.color}
                onChange={(e) => updateSlogan({ color: e.target.value })}
                className="w-full text-[10px] font-mono border rounded uppercase px-1 py-0.5 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-600 block mb-1">Alignement :</span>
            <select
              value={slogan.align}
              onChange={(e) => updateSlogan({ align: e.target.value as any })}
              className="w-full px-1.5 py-1 border rounded bg-slate-50 text-[11px]"
            >
              <option value="left">Gauche</option>
              <option value="center">Centre</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
