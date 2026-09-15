import React from 'react';
import { LayoutPreset } from '../../types/signature';

interface LayoutMiniatureProps {
  preset: LayoutPreset;
  active?: boolean;
  className?: string;
}

/**
 * High-craft SVG & CSS miniatures illustrating the visual positioning
 * of signature elements for desktop and mobile layouts.
 */
export const DesktopLayoutMiniature: React.FC<LayoutMiniatureProps> = ({ preset, active = false, className = '' }) => {
  const navy = active ? '#0C3866' : '#1E3A5F';
  const navyLight = active ? '#1E4E8C' : '#334E68';
  const yellow = '#F7BD00';
  const slateLight = active ? '#CBD5E1' : '#94A3B8';
  const slateMuted = active ? '#E2E8F0' : '#CBD5E1';

  switch (preset) {
    case 'layout-b': // Infos gauche / Logo droite
      return (
        <div className={`w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-md p-2 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700/80'} ${className}`}>
          {/* Left: Text lines */}
          <div className="flex-1 pr-2 space-y-1">
            <div className="h-2 w-3/4 rounded-sm" style={{ backgroundColor: navy }} />
            <div className="h-1.5 w-1/2 rounded-sm" style={{ backgroundColor: slateLight }} />
            <div className="h-1 w-2/3 rounded-xs" style={{ backgroundColor: slateMuted }} />
            <div className="flex gap-1 pt-0.5">
              <div className="h-1 w-6 rounded-xs" style={{ backgroundColor: slateLight }} />
              <div className="h-1 w-8 rounded-xs" style={{ backgroundColor: slateLight }} />
            </div>
          </div>
          {/* Divider */}
          <div className="w-0.5 h-11 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
          {/* Right: Logo */}
          <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700" style={{ backgroundColor: navy }}>
            <div className="w-4 h-4 rounded-xs border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} />
            </div>
          </div>
        </div>
      );

    case 'layout-e': // 3 Colonnes avec QR code
      return (
        <div className={`w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-md p-2 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700/80'} ${className}`}>
          {/* Col 1: Logo */}
          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: navy }}>
            <div className="w-3 h-3 rounded-xs border border-white/60 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
            </div>
          </div>
          {/* Divider */}
          <div className="w-0.5 h-10 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
          {/* Col 2: Text */}
          <div className="flex-1 px-1 space-y-1 min-w-0">
            <div className="h-1.5 w-4/5 rounded-sm" style={{ backgroundColor: navy }} />
            <div className="h-1.5 w-3/5 rounded-sm" style={{ backgroundColor: slateLight }} />
            <div className="h-1 w-2/3 rounded-xs" style={{ backgroundColor: slateMuted }} />
          </div>
          {/* Divider */}
          <div className="w-px h-10 bg-slate-300 dark:bg-slate-700 self-center mx-1" />
          {/* Col 3: QR Code */}
          <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-xs border border-slate-300 dark:border-slate-600 p-0.5 flex flex-col justify-between shrink-0 shadow-2xs">
            <div className="flex justify-between">
              <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: navy }} />
              <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: navy }} />
            </div>
            <div className="flex justify-between items-end">
              <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: navy }} />
              <div className="w-1 h-1 rounded-[1px]" style={{ backgroundColor: yellow }} />
            </div>
          </div>
        </div>
      );

    case 'layout-f': // Horizontal compact
      return (
        <div className={`w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-md p-2 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700/80'} ${className}`}>
          {/* Left: Compact Logo */}
          <div className="w-9 h-6 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: navy }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: yellow }} />
          </div>
          {/* Divider */}
          <div className="w-0.5 h-8 rounded-full self-center mx-1.5" style={{ backgroundColor: yellow }} />
          {/* Right: 2 compact wide lines */}
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2/5 rounded-sm" style={{ backgroundColor: navy }} />
              <div className="h-1.5 w-1/3 rounded-sm" style={{ backgroundColor: slateLight }} />
            </div>
            <div className="h-1.5 w-4/5 rounded-sm" style={{ backgroundColor: slateMuted }} />
          </div>
        </div>
      );

    case 'layout-h': // Avec bannière inférieure
      return (
        <div className={`w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-md p-1.5 flex flex-col justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700/80'} ${className}`}>
          {/* Top section: Logo + Text */}
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: navy }}>
              <div className="w-2 h-2 rounded-xs border border-white/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
              </div>
            </div>
            <div className="w-0.5 h-7 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
            <div className="flex-1 space-y-0.5 pl-0.5">
              <div className="h-1.5 w-3/4 rounded-sm" style={{ backgroundColor: navy }} />
              <div className="h-1 w-1/2 rounded-xs" style={{ backgroundColor: slateLight }} />
            </div>
          </div>
          {/* Bottom section: Banner Strip */}
          <div className="w-full h-3 rounded-xs flex items-center justify-between px-1.5 border border-amber-300/60 dark:border-amber-700/60 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-950 dark:to-amber-900">
            <div className="h-1 w-16 rounded-xs bg-[#0C3866] dark:bg-amber-400" />
            <div className="h-1.5 w-4 rounded-full" style={{ backgroundColor: yellow }} />
          </div>
        </div>
      );

    case 'layout-i': // Carte RAGT Institutionnelle (3 Colonnes : Logo | Photo + Coordonnées | Réseaux)
      return (
        <div className={`w-full h-16 rounded-md p-2 flex items-center justify-between border transition-all ${
          active
            ? 'border-[#0C3866] dark:border-amber-400 ring-1 ring-[#0C3866] shadow-xs'
            : 'border-amber-200 dark:border-amber-800/80'
        } ${className}`} style={{ backgroundColor: '#FDC420' }}>
          {/* Col 1: Logo Corporate */}
          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 shadow-2xs" style={{ backgroundColor: '#0C3866' }}>
            <div className="w-3.5 h-3.5 rounded-xs border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FDC420' }} />
            </div>
          </div>
          {/* Divider */}
          <div className="w-0.5 h-11 rounded-full self-center mx-1.5 opacity-60" style={{ backgroundColor: '#0C3866' }} />
          {/* Col 2: Photo spot on top + User Coordinates underneath */}
          <div className="flex-1 px-1 flex flex-col justify-center space-y-1 min-w-0">
            {/* Photo Spot ("À cet endroit") */}
            <div className="h-4 w-4/5 rounded-xs bg-[#0C3866]/20 border border-[#0C3866]/30 flex items-center justify-center overflow-hidden">
              <div className="w-2.5 h-2 rounded-[1px] bg-emerald-700/60" />
            </div>
            {/* User Signature Lines */}
            <div className="h-1.5 w-3/4 rounded-xs" style={{ backgroundColor: '#0C3866' }} />
            <div className="h-1 w-2/3 rounded-xs opacity-75" style={{ backgroundColor: '#1E4143' }} />
          </div>
          {/* Col 3: Social dots on the right */}
          <div className="flex flex-col gap-1 pl-1.5 border-l border-[#0C3866]/30 shrink-0">
            <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#0C3866]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#0C3866]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#0C3866]" />
            </div>
          </div>
        </div>
      );

    case 'layout-a': // Modèle A (Classique)
    default:
      return (
        <div className={`w-full h-16 bg-slate-50 dark:bg-slate-900 rounded-md p-2 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700/80'} ${className}`}>
          {/* Left: Logo */}
          <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700" style={{ backgroundColor: navy }}>
            <div className="w-4 h-4 rounded-xs border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: yellow }} />
            </div>
          </div>
          {/* Divider */}
          <div className="w-0.5 h-11 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
          {/* Right: Text lines */}
          <div className="flex-1 pl-1 space-y-1">
            <div className="h-2 w-3/4 rounded-sm" style={{ backgroundColor: navy }} />
            <div className="h-1.5 w-1/2 rounded-sm" style={{ backgroundColor: slateLight }} />
            <div className="h-1 w-2/3 rounded-xs" style={{ backgroundColor: slateMuted }} />
            <div className="flex gap-1 pt-0.5">
              <div className="h-1 w-6 rounded-xs" style={{ backgroundColor: slateLight }} />
              <div className="h-1 w-8 rounded-xs" style={{ backgroundColor: slateLight }} />
            </div>
          </div>
        </div>
      );
  }
};

/**
 * Mobile miniature specifically proportioned like a smartphone screen,
 * completely non-deformed and faithfully showing vertical stacked email cards.
 */
export const MobileLayoutMiniature: React.FC<LayoutMiniatureProps> = ({ preset, active = false, className = '' }) => {
  const navy = active ? '#0C3866' : '#1E3A5F';
  const yellow = '#F7BD00';
  const slateLight = active ? '#CBD5E1' : '#94A3B8';
  const slateMuted = active ? '#E2E8F0' : '#CBD5E1';

  switch (preset) {
    case 'layout-d': // Modèle D: Centré Institutionnel Mobile
      return (
        <div className={`w-28 h-36 bg-slate-900 dark:bg-slate-950 rounded-xl p-1.5 shadow-md border-2 transition-all flex flex-col items-center justify-between ${active ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/30 dark:ring-amber-400/30' : 'border-slate-700'} ${className}`}>
          {/* Phone Top Notch */}
          <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
          
          {/* Screen Container */}
          <div className="w-full flex-1 bg-white dark:bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-between mt-1 text-center">
            {/* Centered Logo */}
            <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0 shadow-2xs" style={{ backgroundColor: navy }}>
              <div className="w-3 h-3 rounded-xs border border-white/70 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
              </div>
            </div>

            {/* Horizontal Gold Line Centered */}
            <div className="w-8 h-0.5 rounded-full my-0.5" style={{ backgroundColor: yellow }} />

            {/* Centered Text Lines */}
            <div className="w-full flex flex-col items-center space-y-1">
              <div className="h-1.5 w-14 rounded-sm" style={{ backgroundColor: navy }} />
              <div className="h-1 w-10 rounded-xs" style={{ backgroundColor: slateLight }} />
              <div className="h-1 w-12 rounded-xs" style={{ backgroundColor: slateMuted }} />
              <div className="h-1 w-8 rounded-xs" style={{ backgroundColor: slateLight }} />
            </div>

            {/* Centered Social dots */}
            <div className="flex items-center justify-center gap-1 pt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>
      );

    case 'layout-g': // Modèle G: Vertical Mobile-First Card
      return (
        <div className={`w-28 h-36 bg-slate-900 dark:bg-slate-950 rounded-xl p-1.5 shadow-md border-2 transition-all flex flex-col items-center justify-between ${active ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/30 dark:ring-amber-400/30' : 'border-slate-700'} ${className}`}>
          {/* Phone Top Notch */}
          <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
          
          {/* Screen Container */}
          <div className="w-full flex-1 bg-white dark:bg-slate-900 rounded-lg p-2 flex flex-col justify-between mt-1 text-left">
            {/* Header: Logo + Identity preview */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 shadow-2xs" style={{ backgroundColor: navy }}>
                <div className="w-2.5 h-2.5 rounded-xs border border-white/70 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
                </div>
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="h-1.5 w-full rounded-sm" style={{ backgroundColor: navy }} />
                <div className="h-1 w-3/4 rounded-xs" style={{ backgroundColor: slateLight }} />
              </div>
            </div>

            {/* Horizontal Gold Line */}
            <div className="w-full h-0.5 rounded-full my-1" style={{ backgroundColor: yellow }} />

            {/* Touch-friendly contact strips */}
            <div className="space-y-1">
              <div className="w-full h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 flex items-center px-1 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <div className="h-1 w-10 rounded-xs" style={{ backgroundColor: slateLight }} />
              </div>
              <div className="w-full h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 flex items-center px-1 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <div className="h-1 w-12 rounded-xs" style={{ backgroundColor: slateLight }} />
              </div>
            </div>

            {/* Mobile Footer action */}
            <div className="w-full h-2 rounded-xs bg-[#0C3866] dark:bg-amber-400 flex items-center justify-center">
              <div className="h-0.5 w-8 rounded-full bg-white dark:bg-slate-950" />
            </div>
          </div>
        </div>
      );

    case 'layout-c': // Modèle C: Logo Haut / Infos Bas
    default:
      return (
        <div className={`w-28 h-36 bg-slate-900 dark:bg-slate-950 rounded-xl p-1.5 shadow-md border-2 transition-all flex flex-col items-center justify-between ${active ? 'border-[#0C3866] dark:border-amber-400 ring-2 ring-[#0C3866]/30 dark:ring-amber-400/30' : 'border-slate-700'} ${className}`}>
          {/* Phone Top Notch */}
          <div className="w-6 h-1 bg-slate-700 rounded-full mx-auto" />
          
          {/* Screen Container */}
          <div className="w-full flex-1 bg-white dark:bg-slate-900 rounded-lg p-2 flex flex-col justify-between mt-1 text-left">
            {/* Top Logo */}
            <div className="w-7 h-7 rounded-sm flex items-center justify-center shadow-2xs" style={{ backgroundColor: navy }}>
              <div className="w-3 h-3 rounded-xs border border-white/70 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
              </div>
            </div>

            {/* Horizontal Gold Line */}
            <div className="w-full h-0.5 rounded-full my-0.5" style={{ backgroundColor: yellow }} />

            {/* Stacked Text Lines */}
            <div className="space-y-1">
              <div className="h-1.5 w-16 rounded-sm" style={{ backgroundColor: navy }} />
              <div className="h-1 w-12 rounded-xs" style={{ backgroundColor: slateLight }} />
              <div className="h-1 w-14 rounded-xs" style={{ backgroundColor: slateMuted }} />
              <div className="flex gap-1 pt-0.5">
                <div className="h-1 w-5 rounded-xs" style={{ backgroundColor: slateLight }} />
                <div className="h-1 w-7 rounded-xs" style={{ backgroundColor: slateLight }} />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              </div>
              <div className="w-3 h-3 rounded-[1px] bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#0C3866] dark:bg-amber-400 rounded-[0.5px]" />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

/**
 * Miniature illustrating QR code position in the signature (right, left, bottom)
 */
export const QrPositionMiniature: React.FC<{ position: 'right' | 'left' | 'bottom'; active?: boolean }> = ({
  position,
  active = false
}) => {
  const navy = active ? '#0C3866' : '#64748B';
  const yellow = '#F7BD00';
  const qrColor = active ? '#0C3866' : '#475569';

  if (position === 'left') {
    return (
      <div className={`w-full h-12 bg-slate-50 dark:bg-slate-900 rounded p-1 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40' : 'border-slate-200 dark:border-slate-700'}`}>
        {/* QR Left */}
        <div className="w-8 h-8 rounded-xs border border-slate-300 dark:border-slate-600 p-0.5 flex flex-col justify-between shrink-0 bg-white dark:bg-slate-800">
          <div className="flex justify-between">
            <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
            <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
          </div>
          <div className="flex justify-between items-end">
            <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
          </div>
        </div>
        {/* Divider */}
        <div className="w-0.5 h-7 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
        {/* Text */}
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-3/4 rounded-xs" style={{ backgroundColor: navy }} />
          <div className="h-1 w-1/2 rounded-xs bg-slate-300 dark:bg-slate-600" />
        </div>
      </div>
    );
  }

  if (position === 'bottom') {
    return (
      <div className={`w-full h-12 bg-slate-50 dark:bg-slate-900 rounded p-1 flex flex-col justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40' : 'border-slate-200 dark:border-slate-700'}`}>
        {/* Top: Logo + text */}
        <div className="flex items-center justify-between">
          <div className="w-5 h-5 rounded-xs shrink-0" style={{ backgroundColor: navy }} />
          <div className="w-0.5 h-5 rounded-full mx-1" style={{ backgroundColor: yellow }} />
          <div className="flex-1 space-y-0.5">
            <div className="h-1.5 w-4/5 rounded-xs" style={{ backgroundColor: navy }} />
            <div className="h-1 w-1/2 rounded-xs bg-slate-300 dark:bg-slate-600" />
          </div>
        </div>
        {/* Bottom QR centered/horizontal */}
        <div className="w-full flex items-center justify-center gap-1 border-t border-slate-200 dark:border-slate-700 pt-0.5">
          <div className="w-3.5 h-3.5 rounded-[1px] border border-slate-300 dark:border-slate-600 p-0.5 flex flex-col justify-between bg-white dark:bg-slate-800">
            <div className="flex justify-between">
              <div className="w-1 h-1" style={{ backgroundColor: qrColor }} />
              <div className="w-1 h-1" style={{ backgroundColor: qrColor }} />
            </div>
            <div className="w-1 h-1" style={{ backgroundColor: qrColor }} />
          </div>
          <div className="h-1 w-12 rounded-xs bg-slate-300 dark:bg-slate-600" />
        </div>
      </div>
    );
  }

  // Right (default)
  return (
    <div className={`w-full h-12 bg-slate-50 dark:bg-slate-900 rounded p-1 flex items-center justify-between border transition-all ${active ? 'border-[#0C3866] dark:border-amber-400 bg-blue-50/40' : 'border-slate-200 dark:border-slate-700'}`}>
      {/* Text */}
      <div className="flex-1 space-y-1 pr-1">
        <div className="h-1.5 w-4/5 rounded-xs" style={{ backgroundColor: navy }} />
        <div className="h-1 w-1/2 rounded-xs bg-slate-300 dark:bg-slate-600" />
      </div>
      {/* Divider */}
      <div className="w-0.5 h-7 rounded-full self-center mx-1" style={{ backgroundColor: yellow }} />
      {/* QR Right */}
      <div className="w-8 h-8 rounded-xs border border-slate-300 dark:border-slate-600 p-0.5 flex flex-col justify-between shrink-0 bg-white dark:bg-slate-800">
        <div className="flex justify-between">
          <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
          <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-2 h-2" style={{ backgroundColor: qrColor }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: yellow }} />
        </div>
      </div>
    </div>
  );
};

