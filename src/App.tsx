import React from 'react';
import { SignatureProvider, useSignature } from './context/SignatureContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { PreviewPane } from './components/PreviewPane';
import { LayoutPanel } from './components/panels/LayoutPanel';
import { DesignPanel } from './components/panels/DesignPanel';
import { InfoPanel } from './components/panels/InfoPanel';
import { LogosPanel } from './components/panels/LogosPanel';
import { QrPanel } from './components/panels/QrPanel';
import { SocialPanel } from './components/panels/SocialPanel';
import { BannerPanel } from './components/panels/BannerPanel';
import { VerifyPanel } from './components/panels/VerifyPanel';
import { TemplatesPanel } from './components/panels/TemplatesPanel';
import { CopyPanel } from './components/panels/CopyPanel';
import { UserModeView } from './components/UserModeView';
import { ToastContainer } from './components/ToastContainer';
import { CommandPalette } from './components/CommandPalette';

const MainLayout: React.FC = () => {
  const { appMode, activeTab } = useSignature();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Header />

      {appMode === 'user' ? (
        /* Simplified Collaborator Mode (Requirement 33 & 34) */
        <UserModeView />
      ) : (
        /* Full Studio Communication 3-Pane Layout (Requirement 4, 5, 59) */
        <div className="flex-1 flex overflow-hidden">
          {/* 1. Left Navigation Menu */}
          <Navigation />

          {/* 2. Center Signature Preview (Always Visible!) */}
          <PreviewPane />

          {/* 3. Right Property Adjustment Panel */}
          <aside className="w-[420px] bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-full overflow-y-auto transition-colors">
            {activeTab === 'layout' && <LayoutPanel />}
            {activeTab === 'design' && <DesignPanel />}
            {activeTab === 'info' && <InfoPanel />}
            {activeTab === 'logos' && <LogosPanel />}
            {activeTab === 'qr' && <QrPanel />}
            {activeTab === 'social' && <SocialPanel />}
            {activeTab === 'banner' && <BannerPanel />}
            {activeTab === 'verify' && <VerifyPanel />}
            {activeTab === 'templates' && <TemplatesPanel />}
            {activeTab === 'copy' && <CopyPanel />}
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
