export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Very basic iterative adjustment to find nearest WCAG compliant color
export function suggestAccessibleColor(textColor: string, bgColor: string, targetRatio = 4.5): string {
  let currentHex = textColor;
  let ratio = getContrastRatio(currentHex, bgColor);
  
  if (ratio >= targetRatio) return currentHex;

  const bgRgb = hexToRgb(bgColor);
  if (!bgRgb) return textColor;
  const bgL = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  // Decide whether to lighten or darken text
  let step = bgL > 0.5 ? -10 : 10;
  
  let currentRgb = hexToRgb(textColor);
  if (!currentRgb) return textColor;
  
  for (let i = 0; i < 25; i++) {
    currentRgb = {
      r: Math.max(0, Math.min(255, currentRgb.r + step)),
      g: Math.max(0, Math.min(255, currentRgb.g + step)),
      b: Math.max(0, Math.min(255, currentRgb.b + step))
    };
    currentHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);
    ratio = getContrastRatio(currentHex, bgColor);
    if (ratio >= targetRatio) return currentHex;
  }
  
  // fallback to pure black or white
  return bgL > 0.5 ? '#000000' : '#FFFFFF';
}
