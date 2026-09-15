import fs from 'fs';
import path from 'path';
import { DEFAULT_SIGNATURE_STATE } from '../src/constants/presets';
import { generateStandaloneSignatureAppHtml } from '../src/utils/standaloneHtmlGenerator';

const html = generateStandaloneSignatureAppHtml(DEFAULT_SIGNATURE_STATE);
const outPath = path.resolve(__dirname, '../public/signature.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Successfully generated public/signature.html (' + html.length + ' bytes)');
