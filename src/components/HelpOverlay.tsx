import React, { useState } from 'react';
import { BookOpen, X, Loader2, Search } from 'lucide-react';
import Markdown from 'react-markdown';

interface HelpOverlayProps {
  onClose: () => void;
}

export const HelpOverlay: React.FC<HelpOverlayProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchGuidelines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/guidelines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'What are the latest official RAGT Semences email communication guidelines and best practices?' })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      setContent(data.text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  React.useEffect(() => {
    fetchGuidelines();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-[#0C3866] flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Guide & Bonnes Pratiques RAGT
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 text-sm leading-relaxed prose max-w-none">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#0C3866]" />
              <div className="flex items-center gap-2 text-xs font-medium">
                <Search className="w-3.5 h-3.5" />
                Recherche des dernières directives via Gemini...
              </div>
            </div>
          ) : error ? (
            <div className="p-4 bg-rose-50 text-rose-700 rounded-lg border border-rose-200">
              <p className="font-semibold">Erreur de connexion</p>
              <p className="mt-1 text-xs">{error}</p>
              <button 
                onClick={fetchGuidelines}
                className="mt-3 px-3 py-1.5 bg-rose-100 rounded-md text-xs font-semibold hover:bg-rose-200 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div className="markdown-body text-sm space-y-4">
              <Markdown>{content || ''}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
