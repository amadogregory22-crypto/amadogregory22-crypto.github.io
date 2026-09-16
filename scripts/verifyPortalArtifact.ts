import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const portalPath = resolve('public/signature.html');
const portal = readFileSync(portalPath, 'utf8');

function requireFragment(fragment: string, description: string) {
  if (!portal.includes(fragment)) {
    throw new Error(`Portail invalide : ${description}. Relancez npm run build:signature.`);
  }
}

requireFragment('<!doctype html>', 'doctype absent');
requireFragment('var RagtPortalQr=', 'moteur QR hors connexion absent');
requireFragment('QR Code régénéré localement', 'statut de régénération QR absent');
requireFragment('initialHtml', 'signature Studio sérialisée absente');

// A generated portal must never fetch an image over the network. The generated
// signature is serialized in its script, so inspect every source attribute in
// the final artifact instead of depending on a particular layout.
const externalImage = /<img\b[^>]*\bsrc\s*=\s*["'](?:https?:)?\/\//i.test(portal)
  || /<img\b[^>]*\bsrc\s*=\s*["']\/(?!\/)/i.test(portal);
if (externalImage) {
  throw new Error('Portail invalide : une image externe est présente.');
}

console.log('Verified standalone portal artifact: embedded QR runtime and no literal external image source.');
