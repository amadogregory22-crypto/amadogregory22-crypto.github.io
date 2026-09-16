import React, { useState, useEffect, useRef } from 'react';
import { useSignature } from '../context/SignatureContext';
import { Search, LayoutTemplate, Palette, Info, Image as ImageIcon, QrCode, Share2, Flag, CheckCircle, FileText, Award } from 'lucide-react';
import { ActiveTab } from '../context/SignatureContext';

interface CommandItem {
  id: ActiveTab;
  subTab?: string;
  focusTarget?: string;
  name: string;
  icon: React.ReactNode;
}

export const COMMANDS: CommandItem[] = [
  { id: 'structure', subTab: 'layout', name: 'Mise en page & Structure (Gabarits A-I, dimensions, ordre des blocs)', icon: <LayoutTemplate className="w-4 h-4" /> },
  { id: 'versions', subTab: 'storage', name: 'Versions & Sauvegardes (Presets RAGT, révisions, historique)', icon: <FileText className="w-4 h-4" /> },
  { id: 'contact', subTab: 'info', name: 'Identité & Coordonnées (Nom, Poste, Service, Tél, Email, Adresse)', icon: <Info className="w-4 h-4" /> },
  { id: 'contact', subTab: 'info', focusTarget: 'signature-email', name: 'E-mail professionnel', icon: <Info className="w-4 h-4" /> },
  { id: 'contact', subTab: 'social', name: 'Réseaux Sociaux & UTM (LinkedIn, Facebook, X, Instagram, Tracking)', icon: <Share2 className="w-4 h-4" /> },
  { id: 'contact', subTab: 'qr', name: 'QR Code vCard (Scan smartphone, contact direct)', icon: <QrCode className="w-4 h-4" /> },
  { id: 'contact', subTab: 'qr', focusTarget: 'signature-qr-toggle', name: 'Activer ou modifier le QR Code', icon: <QrCode className="w-4 h-4" /> },
  { id: 'media', subTab: 'logos', name: 'Logos & Filiales RAGT (80+ logos, SVG, upload)', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'media', subTab: 'logos', focusTarget: 'signature-logo-upload', name: 'Importer ou changer le logo', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'media', subTab: 'badges', name: 'Badges & Certifications RAGT (ISO 9001 Qualité, HVE Durable)', icon: <Award className="w-4 h-4" /> },
  { id: 'media', subTab: 'badges', focusTarget: 'signature-badge-toggle', name: 'Activer ou modifier les Badges RAGT', icon: <Award className="w-4 h-4" /> },
  { id: 'media', subTab: 'banner', name: 'Images carte & slogan', icon: <Flag className="w-4 h-4" /> },
  { id: 'media', subTab: 'banner', focusTarget: 'signature-banner-toggle', name: 'Afficher ou modifier une image de carte', icon: <Flag className="w-4 h-4" /> },
  { id: 'style', subTab: 'design', name: 'Style & Charte (Palette RAGT, polices Outlook, contraste WCAG, bordures)', icon: <Palette className="w-4 h-4" /> },
  { id: 'style', subTab: 'design', focusTarget: 'corporate-typography-dropdown', name: 'Police de caractères', icon: <Palette className="w-4 h-4" /> },
  { id: 'export', subTab: 'verify', name: 'Diagnostic & Audit Outlook (Liens brisés, poids images, compatibilité)', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'export', subTab: 'copy', name: 'Copier & Exporter (Copie 1-clic Outlook, signature.html, tutoriels)', icon: <CheckCircle className="w-4 h-4" /> },
];

// A search field should understand the vocabulary people actually use. It
// deliberately removes accents and punctuation, so "e-mail", "email",
// "courriel" and "QR-code" all lead to the relevant settings.
export const normalizeSearch = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/gi, ' ')
  .trim()
  .toLowerCase();

const commandSearchText = (command: CommandItem) => {
  const aliases: Record<string, string> = {
    'E-mail professionnel': 'email e mail courriel mail adresse email',
    'Importer ou changer le logo': 'logo image importer televerser upload',
    'Activer ou modifier les Badges RAGT': 'badge certification iso 9001 hve qualite durable label afaq',
    'Afficher ou modifier une image de carte': 'banniere image carte campagne photo',
    'Police de caractères': 'police typographie fonte caractere',
    'Activer ou modifier le QR Code': 'qr qrcode qr code flashcode vcard',
  };
  return normalizeSearch(`${command.name} ${aliases[command.name] ?? ''}`);
};

export const getCommandSearchResults = (search: string) => {
  const normalizedSearch = normalizeSearch(search);
  return COMMANDS.filter((cmd) => commandSearchText(cmd).includes(normalizedSearch));
};

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setActiveTab } = useSignature();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev && document.activeElement instanceof HTMLElement) {
            previousFocusRef.current = document.activeElement;
          }
          return !prev;
        });
        setSearch('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen((wasOpen) => {
          if (wasOpen) window.setTimeout(() => previousFocusRef.current?.focus(), 0);
          return false;
        });
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

  const closePalette = () => {
    setIsOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  };

  const filtered = getCommandSearchResults(search);

  const openCommand = (command: CommandItem) => {
    setActiveTab(command.id, command.subTab);
    closePalette();
    if (command.focusTarget) {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ragt:focus-control', { detail: { target: command.focusTarget } }));
      }, 250);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length) setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length) setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        openCommand(filtered[selectedIndex]);
      }
    }
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    ).filter((element) => !element.hasAttribute('hidden'));
    if (!focusable.length) return;

    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    const nextIndex = e.shiftKey
      ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
      : (currentIndex === focusable.length - 1 ? 0 : currentIndex + 1);
    e.preventDefault();
    focusable[nextIndex].focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-start justify-center pt-[15vh]" role="dialog" aria-modal="true" aria-label="Recherche de réglage" onKeyDown={handleDialogKeyDown}>
      <div
        ref={dialogRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            aria-label="Rechercher un réglage"
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
                aria-current={idx === selectedIndex ? 'true' : undefined}
                onClick={() => {
                  openCommand(cmd);
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
          <span>Naviguer avec ↑ et ↓</span>
          <span>Ouvrir avec ↵</span>
        </div>
      </div>
    </div>
  );
};
