import React, { useState, useEffect, useRef } from 'react';
import { useSignature } from '../context/SignatureContext';
import { Search, LayoutTemplate, Palette, Info, Image as ImageIcon, QrCode, Share2, Flag, CheckCircle, FileText } from 'lucide-react';
import { ActiveTab } from '../context/SignatureContext';

interface CommandItem {
  id: ActiveTab;
  name: string;
  icon: React.ReactNode;
}

const commands: CommandItem[] = [
  { id: 'layout', name: 'Mise en page', icon: <LayoutTemplate className="w-4 h-4" /> },
  { id: 'design', name: 'Design & Couleurs', icon: <Palette className="w-4 h-4" /> },
  { id: 'info', name: 'Informations', icon: <Info className="w-4 h-4" /> },
  { id: 'logos', name: 'Logos & Bannières', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'qr', name: 'QR Code', icon: <QrCode className="w-4 h-4" /> },
  { id: 'social', name: 'Réseaux Sociaux', icon: <Share2 className="w-4 h-4" /> },
  { id: 'verify', name: 'Vérification', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'templates', name: 'Modèles', icon: <FileText className="w-4 h-4" /> },
];

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setActiveTab } = useSignature();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        setActiveTab(filtered[selectedIndex].id);
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-start justify-center pt-[15vh]">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un panneau (ex: Design, QR Code)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
          />
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">ESC</span>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-6">Aucun résultat trouvé.</p>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => {
                  setActiveTab(cmd.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                  idx === selectedIndex ? 'bg-[#0C3866] text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={idx === selectedIndex ? 'text-white' : 'text-slate-400'}>{cmd.icon}</span>
                <span>{cmd.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
      {/* Overlay click area to close */}
      <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
    </div>
  );
};
