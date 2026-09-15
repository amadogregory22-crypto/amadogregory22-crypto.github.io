import React, { useState } from 'react';
import { Image as ImageIcon, Search, Plus, Sparkles } from 'lucide-react';
import { useStudioStore } from '../../../store/useStudioStore';
import { DocumentElement } from '../../../types';

export const AssetsTab: React.FC = () => {
  const { document, setDocument } = useStudioStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'logos' | 'icons' | 'social'>('all');

  // Standard official preset assets for RAGT Studio
  const presetAssets = [
    { id: 'logo-ragt', name: 'Logo RAGT Officiel', category: 'logos', type: 'image', url: '/static/assets/logo_ragt.png' },
    { id: 'logo-semences', name: 'Logo RAGT Semences', category: 'logos', type: 'image', url: '/static/assets/logo_semences.png' },
    { id: 'icon-phone', name: 'Icône Téléphone Fixe', category: 'icons', type: 'icon', url: '' },
    { id: 'icon-mobile', name: 'Icône Mobile', category: 'icons', type: 'icon', url: '' },
    { id: 'icon-email', name: 'Icône Email', category: 'icons', type: 'icon', url: '' },
    { id: 'icon-web', name: 'Icône Web', category: 'icons', type: 'icon', url: '' },
    { id: 'social-linkedin', name: 'LinkedIn', category: 'social', type: 'icon', url: '' },
    { id: 'social-youtube', name: 'YouTube', category: 'social', type: 'icon', url: '' },
    { id: 'social-x', name: 'X (Twitter)', category: 'social', type: 'icon', url: '' },
  ];

  const handleInsertAsset = (asset: any) => {
    if (!document) return;
    const newEl: DocumentElement = {
      id: `el-${Date.now()}`,
      type: asset.type,
      semantic_type: asset.category === 'logos' ? 'logo' : (asset.category === 'social' ? 'social_network' : 'icon_contact'),
      static_content: asset.url || asset.name,
      bounds: {
        x: 40,
        y: 40,
        width: asset.category === 'logos' ? 120 : 24,
        height: asset.category === 'logos' ? 50 : 24,
      },
      rotation: 0,
      opacity: 1,
      z_index: document.elements.length + 1,
      visible: true,
      locked: false,
      style: {},
      asset_id: asset.id,
    };

    setDocument({ ...document, elements: [...document.elements, newEl] }, true);
  };

  const filtered = presetAssets.filter((a) => selectedCategory === 'all' || a.category === selectedCategory);

  return (
    <div className="p-4 space-y-4 text-xs">
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Bibliothèque de Ressources</h4>
        <p className="text-slate-400 text-[11px]">Insérez des logos officiels ou pictogrammes certifiés.</p>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
        {(['all', 'logos', 'icons', 'social'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 py-1 rounded text-[11px] font-semibold capitalize ${
              selectedCategory === cat ? 'bg-white shadow-xs text-sky-700' : 'text-slate-600'
            }`}
          >
            {cat === 'all' ? 'Tous' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            onClick={() => handleInsertAsset(asset)}
            className="p-2.5 rounded-lg border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 cursor-pointer flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mb-1 group-hover:bg-sky-100 text-slate-600 group-hover:text-sky-600">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-700 truncate w-full text-[11px]">{asset.name}</span>
            <span className="text-[10px] text-slate-400 capitalize">{asset.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
