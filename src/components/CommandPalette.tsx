import React, { useState, useEffect, useRef } from 'react';
import { useSignature } from '../context/SignatureContext';
import { Search, LayoutTemplate, Palette, Info, Image as ImageIcon, QrCode, Share2, Flag, CheckCircle, FileText } from 'lucide-react';
import { ActiveTab } from '../context/SignatureContext';

interface CommandItem {
  id: ActiveTab;
  subTab?: string;
  name: string;
  icon: React.ReactNode;
}

const commands: CommandItem[] = [
  { id: 'template', subTab: 'layout', name: 'Mise en page & Structure (Gabarits A-I, dimensions, ordre des blocs)', icon: <LayoutTemplate className="w-4 h-4" /> },
  { id: 'template', subTab: 'templates', name: 'Bibliothèque de Modèles & Sauvegardes (Presets RAGT, JSON)', icon: <FileText className="w-4 h-4" /> },
  { id: 'contact', subTab: 'info', name: 'Identité & Coordonnées (Nom, Poste, Service, Tél, Email, Adresse)', icon: <Info className="w-4 h-4" /> },
  { id: 'contact', subTab: 'social', name: 'Réseaux Sociaux & UTM (LinkedIn, Facebook, X, Instagram, Tracking)', icon: <Share2 className="w-4 h-4" /> },
  { id: 'contact', subTab: 'qr', name: 'QR Code vCard (Scan smartphone, contact direct)', icon: <QrCode className="w-4 h-4" /> },
  { id: 'media', subTab: 'logos', name: 'Logos & Filiales RAGT (80+ logos, ISO 9001, HVE, upload SVG)', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'media', subTab: 'banner', name: 'Bannières de Campagne & Slogan (Événements, boutons CTA)', icon: <Flag className="w-4 h-4" /> },
  { id: 'style', subTab: 'design', name: 'Style & Charte (Palette RAGT, polices Outlook, contraste WCAG, bordures)', icon: <Palette className="w-4 h-4" /> },
  { id: 'export', subTab: 'verify', name: 'Diagnostic & Audit Outlook (Liens brisés, poids images, compatibilité)', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'export', subTab: 'copy', name: 'Copier & Exporter (Copie 1-clic Outlook, signature.html, tutoriels)', icon: <CheckCircle className="w-4 h-4" /> },
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
        setActiveTab(filtered[selectedIndex].id, filtered[selectedIndex].subTab);
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
                key={cmd.name}
                type="button"
                onClick={() => {
                  setActiveTab(cmd.id, cmd.subTab);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                  idx === selectedIndex ? 'bg-[#0C3866] text-white font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={idx === selectedIndex ? 'text-amber-400' : 'text-slate-400'}>
                  {cmd.icon}
                </span>
                <span className="flex-1 truncate">{cmd.name}</span>
                <span className="text-[10px] opacity-60 font-mono">↵</span>
              </button>
            ))
          )}
        </div>
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
          <span>Navigate with ↑ and ↓</span>
          <span>Open with ↵</span>
        </div>
      </div>
    </div>
  );
};
