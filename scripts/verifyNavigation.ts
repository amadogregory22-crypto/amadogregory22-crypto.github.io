import assert from 'node:assert/strict';
import { getCommandSearchResults } from '../src/components/CommandPalette';

function expectDestination(query: string, focusTarget: string) {
  const result = getCommandSearchResults(query);
  assert.ok(
    result.some((item) => item.focusTarget === focusTarget),
    `La recherche « ${query} » doit ouvrir le contrôle ${focusTarget}`
  );
}

expectDestination('courriel', 'signature-email');
expectDestination('e-mail', 'signature-email');
expectDestination('QR-code', 'signature-qr-toggle');
expectDestination('flashcode', 'signature-qr-toggle');
expectDestination('logo', 'signature-logo-upload');
expectDestination('image carte', 'signature-banner-toggle');
expectDestination('bannière', 'signature-banner-toggle');
expectDestination('police', 'corporate-typography-dropdown');
expectDestination('typographie', 'corporate-typography-dropdown');

assert.equal(getCommandSearchResults('introuvable').length, 0, 'Une recherche sans résultat doit rester vide');

console.log('Verified navigation search aliases and focused destinations.');
