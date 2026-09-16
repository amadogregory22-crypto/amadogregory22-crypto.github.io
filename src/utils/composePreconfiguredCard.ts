import type { SignatureState } from '../types/signature';
import { generateQrDataUrl } from './qrGenerator';

const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = source;
});

/** Builds one self-contained card image from a visual template and the active profile. */
export const composePreconfiguredCard = async (state: SignatureState, templateUrl: string): Promise<string> => {
  const [template, qr] = await Promise.all([loadImage(templateUrl), generateQrDataUrl(state)]);
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');

  context.drawImage(template, 0, 0, width, height);

  // The supplied RAGT cards reserve the middle/lower area for the collaborator.
  // A subtle card keeps the generated data readable on every yellow template.
  context.fillStyle = 'rgba(253, 196, 32, 0.88)';
  context.fillRect(368, 260, 450, 205);
  context.fillStyle = '#0C3866';
  context.font = '700 28px Arial, Helvetica, sans-serif';
  context.fillText(`${state.personal.firstName} ${state.personal.lastName}`.trim() || 'Votre nom', 388, 302);
  context.font = 'italic 18px Arial, Helvetica, sans-serif';
  context.fillText(state.personal.jobTitle || 'Votre fonction', 388, 330);

  const details = [state.personal.phone, state.personal.mobile, state.personal.email, state.personal.website, [state.personal.addressLine1, state.personal.postalCode, state.personal.city].filter(Boolean).join(' · ')].filter(Boolean);
  context.font = '600 16px Arial, Helvetica, sans-serif';
  details.slice(0, 5).forEach((detail, index) => context.fillText(detail, 388, 360 + index * 21));

  const qrImage = await loadImage(qr);
  context.fillStyle = '#FFFFFF';
  context.fillRect(860, 360, 112, 112);
  context.drawImage(qrImage, 866, 366, 100, 100);
  return canvas.toDataURL('image/png');
};
