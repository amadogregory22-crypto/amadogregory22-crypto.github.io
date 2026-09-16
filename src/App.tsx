import React from 'react';
import { SignatureProvider, useSignature } from './context/SignatureContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { PreviewPane } from './components/PreviewPane';
import { UserModeView } from './components/UserModeView';
import { ToastContainer } from './components/ToastContainer';
import { CommandPalette } from './components/CommandPalette';
import { useAccessibleFormControls } from './hooks/useAccessibleFormControls';

const HomeMasterPanel = React.lazy(() => import('./components/panels/HomeMasterPanel').then((module) => ({ default: module.HomeMasterPanel })));
const StructureMasterPanel = React.lazy(() => import('./components/panels/StructureMasterPanel').then((module) => ({ default: module.StructureMasterPanel })));
const VersionsMasterPanel = React.lazy(() => import('./components/panels/VersionsMasterPanel').then((module) => ({ default: module.VersionsMasterPanel })));
const ContactMasterPanel = React.lazy(() => import('./components/panels/ContactMasterPanel').then((module) => ({ default: module.ContactMasterPanel })));
const MediaMasterPanel = React.lazy(() => import('./components/panels/MediaMasterPanel').then((module) => ({ default: module.MediaMasterPanel })));
const StyleMasterPanel = React.lazy(() => import('./components/panels/StyleMasterPanel').then((module) => ({ default: module.StyleMasterPanel })));
const ExportMasterPanel = React.lazy(() => import('./components/panels/ExportMasterPanel').then((module) => ({ default: module.ExportMasterPanel })));

const PanelFallback = () => <div className="p-4 text-xs text-slate-500 dark:text-slate-400">Chargement du panneau…</div>;

const MainLayout: React.FC = () => {
  useAccessibleFormControls();
  const { appMode, activeTab, setActiveTab } = useSignature();
  const [mobileView, setMobileView] = React.useState<'edit' | 'preview'>('edit');

  const mobileDestinations = [
    { id: 'home' as const, label: 'Accueil' },
    { id: 'structure' as const, label: 'Structure' },
    { id: 'contact' as const, label: 'Ma signature' },
    { id: 'media' as const, label: 'Visuels' },
    { id: 'style' as const, label: 'Style' },
    { id: 'export' as const, label: 'Installer' },
    { id: 'versions' as const, label: 'Sauvegardes' }
  ];

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-slate-100 font-sans text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header />

      {appMode === 'user' ? (
        /* Simplified Collaborator Mode (Requirement 33 & 34) */
        <UserModeView />
      ) : (
        /* Full Studio Communication 3-Pane Layout (Requirement 4, 5, 59) */
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
            <label className="sr-only" htmlFor="mobile-destination">Section à modifier</label>
            <select
              id="mobile-destination"
              value={activeTab}
              onChange={(event) => setActiveTab(event.target.value as typeof activeTab)}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {mobileDestinations.map((destination) => (
                <option key={destination.id} value={destination.id}>{destination.label}</option>
              ))}
            </select>
            <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold dark:border-slate-700">
              <button type="button" onClick={() => setMobileView('edit')} className={`rounded-md px-2.5 py-1.5 ${mobileView === 'edit' ? 'bg-[#0C3866] text-white' : 'text-slate-600 dark:text-slate-300'}`}>Modifier</button>
              <button type="button" onClick={() => setMobileView('preview')} className={`rounded-md px-2.5 py-1.5 ${mobileView === 'preview' ? 'bg-[#0C3866] text-white' : 'text-slate-600 dark:text-slate-300'}`}>Aperçu</button>
            </div>
          </div>
          {/* 1. Left Navigation Menu */}
          <div className="hidden lg:flex"><Navigation /></div>

          {/* 2. Center Signature Preview (Always Visible!) */}
          <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} min-h-0 flex-1 lg:flex`}>
            <PreviewPane />
          </div>

          {/* 3. Right Property Adjustment Panel */}
          <aside className={`${mobileView === 'edit' ? 'flex' : 'hidden'} min-h-0 w-full flex-1 flex-col overflow-hidden bg-slate-50 transition-colors dark:bg-slate-900 lg:flex lg:h-full lg:w-[420px] lg:flex-none lg:border-l lg:border-slate-200 lg:dark:border-slate-800`}>
            <React.Suspense fallback={<PanelFallback />}>
              {activeTab === 'home' && <HomeMasterPanel />}
              {(activeTab === 'structure' || activeTab === 'layout' || activeTab === 'template' || activeTab === 'templates') && <StructureMasterPanel />}
              {activeTab === 'versions' && <VersionsMasterPanel />}
              {(activeTab === 'contact' || activeTab === 'info' || activeTab === 'social' || activeTab === 'qr') && <ContactMasterPanel />}
              {(activeTab === 'media' || activeTab === 'logos' || activeTab === 'banner' || activeTab === 'badges' || activeTab === 'pictograms' || activeTab === 'library') && <MediaMasterPanel />}
              {(activeTab === 'style' || activeTab === 'design') && <StyleMasterPanel />}
              {(activeTab === 'export' || activeTab === 'verify' || activeTab === 'copy') && <ExportMasterPanel />}
            </React.Suspense>
          </aside>
        </div>
      )}

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SignatureProvider>
      <MainLayout />
    </SignatureProvider>
  );
}
