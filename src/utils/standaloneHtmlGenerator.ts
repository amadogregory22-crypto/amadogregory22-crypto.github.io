import { SignatureState } from '../types/signature';
import { RAGT_LOGO_PNG_BASE64 } from '../constants/ragtLogoBase64';
import { ISO_9001_LOGO_SVG, HVE_LOGO_SVG } from '../constants/logos';

/**
 * Generates an interactive, standalone, self-contained HTML single-page web app
 * modeled after signature (21).html and strictly adhering to RAGT Semences brand identity.
 *
 * Features:
 * - 100% offline-capable: embedded base64 RAGT logo, inline SVGs, zero external font/CSS dependencies
 * - Left side: Collaborator Portal form with live input bindings
 * - Right side: Microsoft Outlook compose email simulation with Word-safe table preview
 * - Status validation badge and help instructions
 * - 1-Click "Copier pour Outlook" with ClipboardItem rich-copy + execCommand fallback
 * - "Télécharger HTML brut" for direct raw table export
 * - LocalStorage persistence for employee data
 * - "Réinitialiser la fiche" action
 */
export function generateStandaloneSignatureAppHtml(state: SignatureState): string {
  const p = state.personal;
  const d = state.design;
  const l = state.layout;
  const v = state.visibility;

  // Use crisp base64 PNG logo for guaranteed Outlook desktop & web compatibility
  const logoBase64 = state.logos.primary?.url?.startsWith('data:image') 
    ? state.logos.primary.url 
    : RAGT_LOGO_PNG_BASE64;

  const serializedState = JSON.stringify({
    preset: l.preset || 'layout-a',
    dimensions: l.dimensions,
    separator: l.separator,
    colors: d.colors,
    typography: d.typography,
    labels: state.labels,
    visibility: v,
    personal: p,
    logoSrc: logoBase64,
    secondaryLogoSrc: (v.secondaryLogo && state.logos.secondary?.url) ? state.logos.secondary.url : (v.secondaryLogo ? ISO_9001_LOGO_SVG : ''),
    socialItems: state.social.items.filter(s => s.active && s.url).map(s => ({
      id: s.id,
      name: s.name,
      url: s.url,
      color: s.color || '#0C3866'
    })),
    bannerEnabled: v.banner && state.banner.enabled,
    bannerUrl: state.banner.imageUrl || '',
    bannerLink: state.banner.linkUrl || ''
  });

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RAGT Semences · Signature Professionnelle Outlook</title>
  <style>
    :root {
      --ragt-navy: #0C3866;
      --ragt-gold: #F7BD00;
      --ragt-teal: #004B87;
      --ragt-green: #15803D;
      --ink: #1E293B;
      --muted: #64748B;
      --line: #E2E8F0;
      --line-focus: #94A3B8;
      --bg-app: #F4F8FC;
      --bg-card: #FFFFFF;
      --shadow: 0 10px 25px -5px rgba(12, 56, 102, 0.08), 0 8px 10px -6px rgba(12, 56, 102, 0.04);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(135deg, #F8FAFC 0%, #EDF4FA 100%);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      min-height: 100vh;
    }
    /* Top Brand Bar */
    .top {
      height: 72px;
      background: #FFFFFF;
      border-bottom: 2px solid #EDF2F7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 20px;
      font-weight: 800;
      color: var(--ragt-navy);
      letter-spacing: -0.02em;
    }
    .brand-mark {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: var(--ragt-navy);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(12, 56, 102, 0.25);
      border: 2px solid var(--ragt-gold);
    }
    .brand-mark svg {
      width: 26px;
      height: 26px;
    }
    .brand small {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      margin-top: 1px;
    }
    .btn-reset {
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 8px 14px;
      background: #FFFFFF;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .btn-reset:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: var(--ink);
    }

    /* Main Container */
    .app {
      max-width: 1440px;
      margin: auto;
      padding: 24px 32px;
      display: grid;
      grid-template-columns: 360px minmax(0, 1fr);
      gap: 24px;
      align-items: start;
    }
    .panel, .preview-card {
      background: var(--bg-card);
      border: 1px solid var(--line);
      border-radius: 16px;
      box-shadow: var(--shadow);
    }
    .panel {
      padding: 20px;
      position: sticky;
      top: 20px;
      max-height: calc(100vh - 40px);
      overflow-y: auto;
    }
    .panel h2 {
      font-size: 16px;
      font-weight: 800;
      color: var(--ragt-navy);
      margin: 0 0 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hint {
      margin: 0 0 16px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
    }
    .section {
      border-top: 1px solid var(--line);
      padding-top: 14px;
      margin-top: 14px;
    }
    .section:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
    .section h3 {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      margin: 0 0 10px;
      text-transform: uppercase;
      color: var(--ragt-navy);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .field {
      display: block;
      margin-bottom: 10px;
    }
    .field:last-child {
      margin-bottom: 0;
    }
    .field span {
      display: block;
      font-weight: 700;
      font-size: 11px;
      color: #334155;
      margin-bottom: 4px;
    }
    .field input, .field select {
      width: 100%;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 8px 10px;
      background: #F8FAFC;
      color: #0F172A;
      font-family: inherit;
      font-size: 13px;
      transition: all 0.15s ease;
    }
    .field input:focus, .field select:focus {
      outline: none;
      border-color: var(--ragt-navy);
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(12, 56, 102, 0.12);
    }
    .field input.uppercase {
      text-transform: uppercase;
      font-weight: 700;
    }

    /* Right Preview Section */
    .preview-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .preview-head h1 {
      font-size: 22px;
      font-weight: 800;
      color: var(--ragt-navy);
      margin: 0;
      letter-spacing: -0.01em;
    }
    .preview-head p {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .action-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button.primary {
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      background: var(--ragt-navy);
      color: #FFFFFF;
      border: 2px solid var(--ragt-gold);
      border-radius: 10px;
      padding: 10px 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(12, 56, 102, 0.25);
      transition: all 0.15s ease;
    }
    button.primary:hover {
      background: #08294D;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(12, 56, 102, 0.35);
    }
    button.primary:active {
      transform: translateY(0);
    }
    button.secondary {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      background: #FFFFFF;
      color: var(--ragt-navy);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    button.secondary:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }

    /* Outlook Simulation Container */
    .preview-card {
      padding: 24px;
      background: #F0F5FA;
      border: 1px solid #D6E3F0;
    }
    .mail {
      background: #FFFFFF;
      border: 1px solid #D0DCE8;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(12, 56, 102, 0.08);
      max-width: 900px;
      margin: auto;
    }
    .mail-head {
      padding: 12px 20px;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      color: var(--muted);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .mail-head strong {
      color: #334155;
    }
    .mail-body {
      padding: 28px 32px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #273540;
      line-height: 1.6;
    }
    .mail-body p {
      margin: 0 0 12px;
    }
    .signature {
      border-top: 1px dashed #CBD5E1;
      margin-top: 20px;
      padding-top: 20px;
      min-height: 160px;
      overflow-x: auto;
    }

    /* Status Bar */
    .status {
      margin-top: 16px;
      padding: 10px 14px;
      border-radius: 10px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #065F46;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .status.bad {
      background: #FEF2F2;
      border-color: #FECACA;
      color: #991B1B;
    }

    /* Help Box */
    .help {
      margin-top: 16px;
      padding: 14px 16px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      color: #475569;
      font-size: 12px;
      line-height: 1.6;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    }
    .help strong {
      color: var(--ragt-navy);
    }

    /* Accordion Guide */
    .guide-box {
      margin-top: 16px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #FFFFFF;
      overflow: hidden;
    }
    .guide-header {
      padding: 12px 16px;
      background: #F8FAFC;
      font-weight: 700;
      font-size: 12px;
      color: var(--ragt-navy);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .guide-content {
      padding: 14px 18px;
      font-size: 12px;
      color: #475569;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .guide-step {
      background: #F8FAFC;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
    }
    .guide-step h4 {
      margin: 0 0 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--ragt-navy);
    }
    .guide-step ol {
      margin: 0;
      padding-left: 18px;
      line-height: 1.5;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      right: 28px;
      bottom: 28px;
      background: var(--ragt-navy);
      color: #FFFFFF;
      border: 2px solid var(--ragt-gold);
      border-radius: 12px;
      padding: 14px 20px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(12, 56, 102, 0.4);
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    #copyStage {
      position: fixed;
      left: -99999px;
      top: 0;
      background: #FFFFFF;
    }

    @media (max-width: 960px) {
      .app {
        grid-template-columns: 1fr;
        padding: 16px;
      }
      .panel {
        position: static;
        max-height: none;
      }
      .top {
        padding: 0 16px;
      }
      .preview-head {
        flex-direction: column;
        align-items: stretch;
      }
      .guide-content {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

<header class="top">
  <div class="brand">
    <div class="brand-mark">
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F7BD00" stroke-width="2" />
        <path d="M7 12L10 15L17 8" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div>
      RAGT Semences
      <small>Portail Collaborateur · Signature Outlook Officielle</small>
    </div>
  </div>
  <button id="btnReset" class="btn-reset" title="Réinitialiser avec les valeurs officielles">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    Réinitialiser la fiche
  </button>
</header>

<div class="app">
  <!-- Left Column: Form -->
  <aside class="panel">
    <h2>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Vos informations
    </h2>
    <p class="hint">Renseignez vos coordonnées directes ci-dessous. La carte à droite est celle qui sera copiée dans Outlook.</p>

    <!-- Section: Identité -->
    <div class="section">
      <h3>Identité</h3>
      <div class="field">
        <span>Civilité</span>
        <select data-k="civility">
          <option value="">(Non spécifiée)</option>
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
          <option value="Dr">Dr</option>
          <option value="Ing.">Ing.</option>
        </select>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Prénom *</span>
          <input type="text" data-k="firstName" placeholder="Prénom" autocomplete="given-name">
        </div>
        <div class="field">
          <span>Nom *</span>
          <input type="text" data-k="lastName" class="uppercase" placeholder="NOM" autocomplete="family-name">
        </div>
      </div>
      <div class="field">
        <span>Poste / Fonction *</span>
        <input type="text" data-k="jobTitle" placeholder="Ex: Responsable Développement Variétal">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Service / Département</span>
          <input type="text" data-k="department" placeholder="Ex: R&amp;D Semences">
        </div>
        <div class="field">
          <span>Société</span>
          <input type="text" data-k="company" placeholder="Ex: RAGT Semences">
        </div>
      </div>
    </div>

    <!-- Section: Coordonnées -->
    <div class="section">
      <h3>Coordonnées professionnelles</h3>
      <div class="field">
        <span>E-mail professionnel *</span>
        <input type="email" data-k="email" placeholder="prenom.nom@ragt.fr" autocomplete="email">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Ligne directe / Fixe</span>
          <input type="tel" data-k="phone" placeholder="05 65 73 41 66" autocomplete="tel">
        </div>
        <div class="field">
          <span>Téléphone mobile</span>
          <input type="tel" data-k="mobile" placeholder="06 12 34 56 78" autocomplete="tel">
        </div>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Standard</span>
          <input type="tel" data-k="standardPhone" placeholder="05 65 73 41 00">
        </div>
        <div class="field">
          <span>Fax</span>
          <input type="tel" data-k="fax" placeholder="">
        </div>
      </div>
    </div>

    <!-- Section: Adresse -->
    <div class="section">
      <h3>Adresse &amp; Site Web</h3>
      <div class="field">
        <span>Adresse (Ligne 1)</span>
        <input type="text" data-k="addressLine1" placeholder="Rue Emile Singla">
      </div>
      <div class="field">
        <span>Complément (Ligne 2)</span>
        <input type="text" data-k="addressLine2" placeholder="Site de Bourran">
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Code postal</span>
          <input type="text" data-k="postalCode" placeholder="12000">
        </div>
        <div class="field">
          <span>Ville</span>
          <input type="text" data-k="city" placeholder="Rodez">
        </div>
      </div>
      <div class="form-grid">
        <div class="field">
          <span>Pays</span>
          <input type="text" data-k="country" placeholder="France">
        </div>
        <div class="field">
          <span>Site Web</span>
          <input type="url" data-k="website" placeholder="https://www.ragt.fr">
        </div>
      </div>
    </div>
  </aside>

  <!-- Right Column: Outlook Simulation & Copy -->
  <main>
    <div class="preview-head">
      <div>
        <h1>Signature prête pour Outlook</h1>
        <p>Rendu HTML Word-safe certifié avec logo officiel, coordonnées et liens directs.</p>
      </div>
      <div class="action-buttons">
        <button class="primary" id="btnCopy" title="Copier le format riche dans le presse-papier">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copier pour Outlook
        </button>
        <button class="secondary" id="btnDownloadRaw" title="Télécharger le fichier HTML brut">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Télécharger HTML brut
        </button>
      </div>
    </div>

    <!-- Outlook Compose Simulation Card -->
    <section class="preview-card">
      <div class="mail">
        <div class="mail-head" id="mailHead">
          ✉️ <strong>De :</strong> <span id="mailSender">...</span> · <strong>À :</strong> contact@partenaire.com · <strong>Objet :</strong> RAGT Semences — Correspondance professionnelle
        </div>
        <div class="mail-body">
          <p>Bonjour,</p>
          <p>Veuillez trouver ci-dessous ma signature professionnelle mise à jour.</p>
          <p style="margin-bottom: 16px;">Bien cordialement,</p>
          <div class="signature" id="preview">
            <!-- Signature table will be inserted here dynamically -->
          </div>
        </div>
      </div>
    </section>

    <!-- Status Notification -->
    <div class="status" id="status">
      ✓ Informations valides · signature prête à être copiée dans Outlook
    </div>

    <!-- Help Box -->
    <div class="help">
      💡 <strong>Installation express dans Outlook :</strong> Cliquez sur le bouton <strong>« Copier pour Outlook »</strong>, puis dans votre logiciel Outlook (ou Webmail Microsoft 365), ouvrez les paramètres de signature et collez directement avec le raccourci <strong>Ctrl + V</strong> (ou <strong>Cmd + V</strong> sur Mac).
    </div>

    <!-- Accordion Guide -->
    <div class="guide-box">
      <div class="guide-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Guide d'installation pas-à-pas Microsoft Outlook
      </div>
      <div class="guide-content">
        <div class="guide-step">
          <h4>🪟 Outlook Windows Classique (365 / 2016-2024)</h4>
          <ol>
            <li>Cliquez sur <strong>« Copier pour Outlook »</strong> ci-dessus.</li>
            <li>Dans Outlook, allez dans <strong>Fichier &gt; Options &gt; Courrier &gt; Signatures...</strong></li>
            <li>Créez une signature (ex: <em>RAGT 2026</em>), cliquez dans la zone blanche et faites <strong>Ctrl + V</strong>.</li>
            <li>Définissez-la comme signature par défaut et cliquez sur <strong>OK</strong>.</li>
          </ol>
        </div>
        <div class="guide-step">
          <h4>🌐 New Outlook &amp; Webmail (Office 365 / OWA)</h4>
          <ol>
            <li>Cliquez sur l'engrenage <strong>Paramètres ⚙️</strong> en haut à droite.</li>
            <li>Allez dans <strong>Courrier &gt; Composer et répondre &gt; Signatures électroniques</strong>.</li>
            <li>Collez votre signature avec <strong>Ctrl + V</strong> et cochez les options par défaut.</li>
            <li>Cliquez sur <strong>Enregistrer</strong>.</li>
          </ol>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- Hidden Stage for Clipboard execCommand Fallback -->
<div id="copyStage"></div>

<!-- Toast Floating Alert -->
<div class="toast" id="toast">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7BD00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  <span id="toastMsg">Signature copiée ! Ouvrez Outlook et collez avec Ctrl+V.</span>
</div>

<script>
// Official corporate configuration generated by Signature Studio RAGT
const doc = ${serializedState};
const defaultIdentity = JSON.parse(JSON.stringify(doc.personal));
const STORAGE_KEY = 'ragt_signature_user_data';

// Helper: Escape HTML
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper: Sanitize Tel for tel: links
function tel(str) {
  return String(str || '').replace(/[^\\d+]/g, '');
}

// Helper: Sanitize URL
function normUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (/^https?:\\/\\//i.test(trimmed) || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) return trimmed;
  return 'https://' + trimmed;
}

// Save to LocalStorage
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc.personal));
  } catch(e) {}
}

// Load from LocalStorage
function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      Object.assign(doc.personal, data);
    }
  } catch(e) {}
}

// Validate required fields
function validate() {
  const p = doc.personal;
  const missing = [];
  if (!String(p.firstName || '').trim()) missing.push('Prénom');
  if (!String(p.lastName || '').trim()) missing.push('Nom');
  if (!String(p.email || '').trim()) missing.push('E-mail');
  return missing;
}

// Client-side Word-Safe Signature Table Generator
function renderSignature() {
  const p = doc.personal;
  const c = doc.colors;
  const t = doc.typography;
  const v = doc.visibility;
  const dim = doc.dimensions || { totalWidth: 540, logoColumnWidth: 145, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, innerSpacing: 16 };
  const sep = doc.separator || { type: 'vertical', color: '#F7BD00', thickness: 2, margin: 12 };

  // Identity HTML
  let identityRows = '';
  const nameParts = [];
  if (v.civility && p.civility) nameParts.push(esc(p.civility));
  if (v.firstName && p.firstName) nameParts.push(esc(p.firstName));
  if (v.lastName && p.lastName) {
    nameParts.push('<span style="color:' + (c.lastName || c.primary || '#0C3866') + '; font-weight:bold;">' + esc(p.lastName.toUpperCase()) + '</span>');
  }
  if (nameParts.length) {
    identityRows += '<tr><td style="font-family:' + (t.name?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.name?.fontSize || 16) + 'px; font-weight:' + (t.name?.fontWeight || 'bold') + '; color:' + (c.firstName || c.primary || '#0C3866') + '; line-height:1.2; padding-bottom:3px;">' + nameParts.join(' ') + '</td></tr>';
  }

  const jobParts = [];
  if (v.jobTitle && p.jobTitle) jobParts.push(esc(p.jobTitle));
  if (v.department && p.department) jobParts.push(esc(p.department));
  if (jobParts.length) {
    identityRows += '<tr><td style="font-family:' + (t.jobTitle?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.jobTitle?.fontSize || 12) + 'px; color:' + (c.jobTitle || '#666666') + '; line-height:1.3; padding-bottom:3px;">' + jobParts.join(' &bull; ') + '</td></tr>';
  }

  if (v.company && p.company) {
    identityRows += '<tr><td style="font-family:' + (t.company?.fontFamily || 'Arial, sans-serif') + '; font-size:' + (t.company?.fontSize || 12) + 'px; font-weight:bold; color:' + (c.company || c.primary || '#0C3866') + '; line-height:1.3; padding-bottom:5px;">' + esc(p.company) + '</td></tr>';
  }

  const identityHtml = identityRows ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">' + identityRows + '</table>' : '';

  // Coordinates HTML
  let coordRows = '';
  const addRow = (type, label, valueHtml) => {
    // Contact icon inline bullet disc
    const iconDisc = '<td style="vertical-align:middle; width:20px; padding-right:6px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr><td style="width:16px; height:16px; background-color:' + (c.primary || '#0C3866') + '; border-radius:3px; text-align:center; vertical-align:middle; font-size:10px; color:#FFFFFF; line-height:16px; font-weight:bold;">' + (type === 'phone' ? '☎' : type === 'mobile' ? '📱' : type === 'email' ? '✉' : type === 'web' ? '🌐' : '📍') + '</td></tr></table></td>';

    coordRows += '<tr><td style="vertical-align:middle; padding:1px 0;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr>' + iconDisc + '<td style="font-family:Arial, sans-serif; font-size:11px; line-height:16px; color:' + (c.text || '#333333') + '; vertical-align:middle;">' + (label ? '<strong style="color:' + (c.muted || '#666666') + '; font-weight:600;">' + esc(label) + ':</strong> ' : '') + valueHtml + '</td></tr></table></td></tr>';
  };

  const makeLink = (href, text, color, bold) => {
    return '<a href="' + esc(href) + '" style="color:' + color + '; text-decoration:none !important; text-underline-style:none; mso-text-underline:none;' + (bold ? ' font-weight:600;' : '') + '"><span style="color:' + color + '; text-decoration:none !important;">' + esc(text) + '</span></a>';
  };

  if (v.phone && p.phone) addRow('phone', doc.labels.phone || 'Tél.', makeLink('tel:' + tel(p.phone), p.phone, c.phone || c.text || '#333333', false));
  if (v.standardPhone && p.standardPhone) addRow('phone', doc.labels.standardPhone || 'Standard', makeLink('tel:' + tel(p.standardPhone), p.standardPhone, c.phone || c.text || '#333333', false));
  if (v.mobile && p.mobile) addRow('mobile', doc.labels.mobile || 'Mob.', makeLink('tel:' + tel(p.mobile), p.mobile, c.mobile || c.text || '#333333', false));
  if (v.email && p.email) addRow('email', doc.labels.email || 'E-mail', makeLink('mailto:' + p.email, p.email, c.email || c.primary || '#0C3866', true));
  if (v.website && p.website) {
    const dispWeb = p.website.replace(/^https?:\\/\\//i, '');
    addRow('web', doc.labels.website || 'Web', makeLink(normUrl(p.website), dispWeb, c.website || c.primary || '#0C3866', true));
  }
  if (v.address && (p.addressLine1 || p.city)) {
    const fullAddr = [p.addressLine1, p.addressLine2, [p.postalCode, p.city].filter(Boolean).join(' ')].filter(Boolean).join(' - ');
    const maps = 'https://maps.google.com/?q=' + encodeURIComponent(fullAddr + (p.country ? ', ' + p.country : ''));
    addRow('address', doc.labels.address || 'Adr.', makeLink(maps, fullAddr, c.address || c.text || '#333333', false));
  }

  const coordsHtml = coordRows ? '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top:4px;">' + coordRows + '</table>' : '';

  // Social icons HTML
  let socialsHtml = '';
  if (v.socials && doc.socialItems && doc.socialItems.length) {
    const socLinks = doc.socialItems.map(s => {
      return '<td style="padding-right:6px; vertical-align:middle;"><a href="' + esc(normUrl(s.url)) + '" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;"><tr><td style="width:22px; height:22px; background-color:' + (s.color || '#0C3866') + '; border-radius:50%; text-align:center; vertical-align:middle; color:#FFFFFF; font-size:11px; font-weight:bold; line-height:22px;">' + esc(s.name ? s.name.charAt(0).toUpperCase() : 'S') + '</td></tr></table></a></td>';
    }).join('');
    socialsHtml = '<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; padding-top:8px;"><tr>' + socLinks + '</tr></table>';
  }

  // Logos HTML
  const logoWidth = dim.logoColumnWidth || 140;
  const logoHtml = doc.logoSrc ? '<img src="' + esc(doc.logoSrc) + '" width="' + logoWidth + '" alt="RAGT Semences" border="0" style="display:block; width:' + logoWidth + 'px; max-width:' + logoWidth + 'px; height:auto; border:0;" />' : '';
  const secondaryLogoHtml = doc.secondaryLogoSrc ? '<div style="padding-top:8px;"><img src="' + esc(doc.secondaryLogoSrc) + '" width="95" alt="Certification" border="0" style="display:block; width:95px; height:auto; border:0;" /></div>' : '';

  // Separator line
  const sepColor = sep.color || '#F7BD00';
  const sepThick = sep.thickness || 2;
  const sepMargin = sep.margin || 12;

  let innerStructure = '';
  const mode = doc.preset || 'layout-a';

  if (mode === 'layout-c') {
    // Logo Top, Info Bottom
    innerStructure = '<tr><td style="text-align:left; padding-bottom:' + sepMargin + 'px;">' + logoHtml + secondaryLogoHtml + '</td></tr><tr><td style="height:' + sepThick + 'px; background-color:' + sepColor + '; line-height:' + sepThick + 'px; font-size:1px; margin-bottom:' + sepMargin + 'px;">&nbsp;</td></tr><tr><td style="padding-top:' + sepMargin + 'px;">' + identityHtml + coordsHtml + socialsHtml + '</td></tr>';
  } else if (mode === 'layout-b') {
    // Info Left, Logo Right
    innerStructure = '<tr><td style="vertical-align:middle; padding-right:' + sepMargin + 'px;">' + identityHtml + coordsHtml + socialsHtml + '</td><td style="width:' + sepThick + 'px; background-color:' + sepColor + '; vertical-align:top; font-size:1px; line-height:1px;" width="' + sepThick + '">&nbsp;</td><td style="width:' + logoWidth + 'px; vertical-align:middle; padding-left:' + sepMargin + 'px;" width="' + logoWidth + '">' + logoHtml + secondaryLogoHtml + '</td></tr>';
  } else {
    // Default: Layout A (Logo Left, Separator, Info Right)
    innerStructure = '<tr><td style="width:' + logoWidth + 'px; vertical-align:middle; padding-right:' + sepMargin + 'px;" width="' + logoWidth + '">' + logoHtml + secondaryLogoHtml + '</td><td style="width:' + sepThick + 'px; background-color:' + sepColor + '; vertical-align:top; font-size:1px; line-height:1px;" width="' + sepThick + '">&nbsp;</td><td style="vertical-align:middle; padding-left:' + sepMargin + 'px;">' + identityHtml + coordsHtml + socialsHtml + '</td></tr>';
  }

  return '<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="' + dim.totalWidth + '" bgcolor="#FFFFFF" style="width:' + dim.totalWidth + 'px; max-width:' + dim.totalWidth + 'px; background-color:#FFFFFF; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tbody><tr><td bgcolor="#FFFFFF" style="padding:' + (dim.paddingTop || 12) + 'px ' + (dim.paddingRight || 16) + 'px ' + (dim.paddingBottom || 12) + 'px ' + (dim.paddingLeft || 16) + 'px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tbody>' + innerStructure + '</tbody></table></td></tr></tbody></table>';
}

// Refresh UI and Live Preview
function refresh() {
  document.querySelectorAll('[data-k]').forEach(el => {
    if (document.activeElement !== el) {
      el.value = doc.personal[el.dataset.k] || '';
    }
  });

  const sigHtml = renderSignature();
  document.querySelector('#preview').innerHTML = sigHtml;

  const senderEmail = doc.personal.email || 'prenom.nom@ragt.fr';
  document.querySelector('#mailSender').textContent = senderEmail;

  const missing = validate();
  const statusEl = document.querySelector('#status');
  if (missing.length) {
    statusEl.className = 'status bad';
    statusEl.textContent = '⚠️ À compléter pour Outlook : ' + missing.join(', ');
  } else {
    statusEl.className = 'status';
    statusEl.textContent = '✓ Informations valides · signature prête à être copiée dans Outlook';
  }

  save();
}

// Show Floating Toast
function toast(msg) {
  const t = document.querySelector('#toast');
  document.querySelector('#toastMsg').textContent = msg;
  t.className = 'toast show';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    t.className = 'toast';
  }, 3000);
}

// 1-Click Copy for Outlook
async function copyForOutlook() {
  const missing = validate();
  if (missing.length) {
    toast('Veuillez compléter : ' + missing.join(', '));
    return;
  }

  const html = renderSignature();
  const plainText = document.querySelector('#preview').innerText || 'RAGT Semences';

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        })
      ]);
      toast('✓ Signature copiée ! Ouvrez Outlook et collez avec Ctrl+V.');
      return;
    }
  } catch (err) {
    console.warn('ClipboardItem fallback:', err);
  }

  // Fallback: execCommand with #copyStage
  const stage = document.querySelector('#copyStage');
  stage.innerHTML = html;
  const range = document.createRange();
  range.selectNodeContents(stage);
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
  }
  toast('✓ Signature copiée ! Ouvrez Outlook et collez avec Ctrl+V.');
}

// Download Raw HTML File
function downloadRaw() {
  const html = renderSignature();
  const fullDoc = '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Signature RAGT</title></head><body style="margin:0; padding:20px; font-family:Arial, sans-serif;">' + html + '</body></html>';
  const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (doc.personal.lastName || 'ragt').toLowerCase().replace(/\\s+/g, '-');
  a.href = url;
  a.download = 'signature-ragt-' + safeName + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Fichier HTML téléchargé !');
}

// Reset Form to Corporate Default
function reset() {
  if (!confirm('Réinitialiser toutes les informations de cette fiche avec les valeurs officielles RAGT ?')) return;
  doc.personal = JSON.parse(JSON.stringify(defaultIdentity));
  save();
  refresh();
  toast('Fiche réinitialisée aux valeurs officielles.');
}

// Initialize Application
load();
refresh();

// Event Listeners
document.querySelectorAll('[data-k]').forEach(el => {
  el.addEventListener('input', () => {
    doc.personal[el.dataset.k] = el.value;
    refresh();
  });
  el.addEventListener('change', () => {
    doc.personal[el.dataset.k] = el.value;
    refresh();
  });
});

document.querySelector('#btnCopy').addEventListener('click', copyForOutlook);
document.querySelector('#btnDownloadRaw').addEventListener('click', downloadRaw);
document.querySelector('#btnReset').addEventListener('click', reset);
</script>

</body>
</html>`;
}
