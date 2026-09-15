import React from 'react';
import { Type, Palette, Layers, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { StageContainer } from '../../canvas/StageContainer';
import { ContentTab } from './tabs/ContentTab';
import { ColorsTab } from './tabs/ColorsTab';
import { LayersTab } from './tabs/LayersTab';
import { AssetsTab } from './tabs/AssetsTab';
import { FormatTab } from './tabs/FormatTab';
import { ElementInspector } from './inspector/ElementInspector';

export const EditorView: React.FC = () => {
  const { activeTab, setActiveTab } = useStudioStore();

  const TABS = [
    { id: 'content', label: 'Contenu', icon: Type },
    { id: 'colors', label: 'Couleurs', icon: Palette },
    { id: 'layers', label: 'Objets', icon: Layers },
    { id: 'assets', label: 'Ressources', icon: ImageIcon },
    { id: 'format', label: 'Format', icon: LayoutTemplate },
  ] as const;

  return (
    <div className="h-[calc(100vh-65px)] flex flex-row overflow-hidden bg-slate-100">
      {/* Left Sub-tools Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full z-20">
        {/* Tab navigation headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? 'bg-white shadow-xs text-sky-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'colors' && <ColorsTab />}
          {activeTab === 'layers' && <LayersTab />}
          {activeTab === 'assets' && <AssetsTab />}
          {activeTab === 'format' && <FormatTab />}
        </div>
      </div>

      {/* Center Canvas Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <EditorToolbar />
        <div className="flex-1 relative">
          <StageContainer mode="editor" />
        </div>
      </div>

      {/* Right Contextual Inspector */}
      <div className="w-72 bg-white border-l border-slate-200 flex flex-col h-full overflow-y-auto z-20">
        <ElementInspector />
      </div>
    </div>
  );
};
