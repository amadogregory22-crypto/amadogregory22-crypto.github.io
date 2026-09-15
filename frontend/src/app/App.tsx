import React from 'react';
import { Header } from '../components/Header';
import { useStudioStore } from '../store/useStudioStore';
import { ImportView } from '../features/import/ImportView';
import { AnalysisView } from '../features/analysis/AnalysisView';
import { ReviewView } from '../features/review/ReviewView';
import { EditorView } from '../features/editor/EditorView';
import { PreviewView } from '../features/preview/PreviewView';
import { ExportView } from '../features/export/ExportView';

export const App: React.FC = () => {
  const { currentStep } = useStudioStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      <Header />
      <main className="flex-1 overflow-hidden">
        {currentStep === 'import' && <ImportView />}
        {currentStep === 'analysis' && <AnalysisView />}
        {currentStep === 'review' && <ReviewView />}
        {currentStep === 'editor' && <EditorView />}
        {currentStep === 'preview' && <PreviewView />}
        {currentStep === 'export' && <ExportView />}
      </main>
    </div>
  );
};
