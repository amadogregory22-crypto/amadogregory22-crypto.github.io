export type DetectedCardField = {
  kind: 'email' | 'phone' | 'website' | 'name' | 'jobTitle' | 'text';
  text: string;
  confidence: number;
};

const classify = (text: string): DetectedCardField['kind'] => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(text)) return 'email';
  if (/(?:\+?\d[\d .()-]{6,}\d)/.test(text)) return 'phone';
  if (/(?:https?:\/\/|www\.)/i.test(text)) return 'website';
  if (/^[A-ZÀ-ÖØ-Ý][A-ZÀ-ÖØ-Ý' -]{4,}$/.test(text)) return 'name';
  if (/(manager|directeur|responsable|support|technicien|commercial|marketing|informatique)/i.test(text)) return 'jobTitle';
  return 'text';
};

/**
 * OCR runs only after an explicit user import. The text is used as a guide for
 * replacing the card's sample data with the current signature state.
 */
export const analyzeCardImage = async (image: string, onProgress?: (value: number) => void): Promise<DetectedCardField[]> => {
  const { recognize } = await import('tesseract.js');
  const result = await recognize(image, 'fra+eng', {
    logger: (event) => {
      if (event.status === 'recognizing text') onProgress?.(Math.round(event.progress * 100));
    }
  });

  return result.data.text
    .split(/\r?\n/)
    .map((text) => text.trim())
    .filter((text) => text.length > 1)
    .map((text) => ({ text, confidence: Math.round(result.data.confidence), kind: classify(text) }));
};
