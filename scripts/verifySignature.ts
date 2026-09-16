import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_SIGNATURE_STATE, SIGNATURE_PRESETS } from '../src/constants/presets';
import { getCampaignStatus } from '../src/utils/campaignStatus';
import { generateEmailHTML, getSocialIconDataUrl } from '../src/utils/htmlGenerator';
import { getQrRawContent } from '../src/utils/qrGenerator';
import { normalizeSignatureConfig } from '../src/utils/signatureConfig';
import { createSavedRevision, findSavedRevision, normalizeSavedRevisions, prependSavedRevision } from '../src/utils/revisionStore';
import { generateStandaloneSignatureAppHtml } from '../src/utils/standaloneHtmlGenerator';
import { validateSignature } from '../src/utils/validator';

const layouts = ['layout-a', 'layout-b', 'layout-c', 'layout-d', 'layout-e', 'layout-f', 'layout-g', 'layout-h', 'layout-i'] as const;

for (const preset of layouts) {
  const state = {
    ...DEFAULT_SIGNATURE_STATE,
    layout: { ...DEFAULT_SIGNATURE_STATE.layout, preset },
    visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, qr: true, banner: true, slogan: true },
    banner: { ...DEFAULT_SIGNATURE_STATE.banner, enabled: true, imageUrl: 'data:image/png;base64,AA==' },
    slogan: { ...DEFAULT_SIGNATURE_STATE.slogan, enabled: true }
  };
  const html = generateEmailHTML(state, 'data:image/png;base64,QR');
  const portal = generateStandaloneSignatureAppHtml(state, html);
  const imageSources = [...html.matchAll(/<img\s+[^>]*?src=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
  assert.match(html, /QR Code vCard/, `${preset} must retain the QR block`);
  assert.match(html, /Des semences pour demain/, `${preset} must retain the slogan`);
  assert.match(html, /data-ragt-dropzone="banner"/, `${preset} must retain the banner`);
  assert.ok(portal.includes('data:image/png;base64,QR'), `${preset} portal must retain the generated QR`);
  assert.ok(imageSources.every((source) => source.startsWith('data:image/')), `${preset} reference output must not rely on external images`);
  const serializedStudioHtml = JSON.stringify(html).replace(/</g, '\\u003c');
  assert.ok(
    portal.includes(`"initialHtml":${serializedStudioHtml}`),
    `${preset} portal must embed the exact Studio HTML`
  );
  assert.ok(portal.includes('var RagtPortalQr='), `${preset} portal must embed the offline QR generator`);
  assert.ok(portal.includes('QR Code régénéré localement'), `${preset} portal must refresh the QR after contact edits`);
  assert.ok(portal.includes('synchronizeEditableFields'), `${preset} portal must only expose fields rendered by the configured signature`);
}

// Complete RAGT card journey: apply the official preset, populate a real
// collaborator identity, keep every visual block and send the exact Studio
// HTML to the offline collaborator portal.
const ragtCardPreset = SIGNATURE_PRESETS.find((preset) => preset.id === 'carte-ragt-officielle');
assert.ok(ragtCardPreset, 'the official RAGT card preset must be available');
const ragtCardBase = ragtCardPreset.apply({
  ...DEFAULT_SIGNATURE_STATE,
  personal: {
    ...DEFAULT_SIGNATURE_STATE.personal,
    firstName: 'Claire',
    lastName: 'DURAND',
    jobTitle: 'Responsable développement',
    phone: '+33 5 65 73 41 66',
    mobile: '+33 6 12 34 56 78',
    email: 'claire.durand@ragt.com',
    addressLine1: 'Rue Émile Singla',
    postalCode: '12000',
    city: 'Rodez',
    country: 'France',
    website: 'https://www.ragt-semences.fr'
  },
});
const ragtCardState = {
  ...ragtCardBase,
  visibility: { ...ragtCardBase.visibility, qr: true, banner: true, socials: true },
  qr: { ...ragtCardBase.qr, type: 'vcard' as const, position: 'right' as const }
};
const ragtCardHtml = generateEmailHTML(ragtCardState, 'data:image/png;base64,RAGT_CARD_QR');
const ragtCardPortal = generateStandaloneSignatureAppHtml(ragtCardState, ragtCardHtml);
assert.equal(ragtCardState.layout.preset, 'layout-i');
assert.equal(ragtCardState.design.background.color, '#FDC420');
assert.equal(ragtCardState.layout.separator.type, 'none');
assert.ok(existsSync(resolve('public/assets/logos/logo_ragt.png')), 'the official RAGT card logo asset must exist');
assert.ok(existsSync(resolve('public/assets/bannieres/photo_carte_ragt.png')), 'the official RAGT card photo must exist');
assert.ok(existsSync(resolve('public/assets/bannieres/carte-ragt-produits-reseaux.png')), 'the supplied RAGT products card visual must exist');
assert.ok(existsSync(resolve('public/assets/bannieres/carte-ragt-fond-jaune.png')), 'the supplied RAGT yellow card background must exist');
assert.match(ragtCardHtml, /Claire/);
assert.match(ragtCardHtml, />DURAND</);
assert.match(ragtCardHtml, /Responsable développement/);
assert.match(ragtCardHtml, /claire\.durand@ragt\.com/);
assert.match(ragtCardHtml, /photo_carte_ragt\.png/);
assert.match(ragtCardHtml, /logo_ragt\.png/);
assert.match(ragtCardHtml, /data:image\/png;base64,RAGT_CARD_QR/);
assert.match(ragtCardHtml, /width:46px/, 'the card keeps its right social and QR rail');
assert.match(ragtCardHtml, /www\.ragt-semences\.fr/);
assert.match(ragtCardHtml, /youtube\.com\/user\/ragt/);
assert.match(ragtCardHtml, /facebook\.com\/ragt/);
assert.match(ragtCardHtml, /instagram\.com\/ragt/);
assert.ok(
  ragtCardPortal.includes(`"initialHtml":${JSON.stringify(ragtCardHtml).replace(/</g, '\\u003c')}`),
  'the portal must use the exact completed RAGT card HTML'
);
assert.match(ragtCardPortal, /ADR;TYPE=WORK/, 'the offline QR update must preserve the card address');

const businessCardPreset = SIGNATURE_PRESETS.find((preset) => preset.id === 'carte-visite-ragt');
assert.ok(businessCardPreset, 'the RAGT business card preset must be available');
const businessCardState = businessCardPreset.apply(DEFAULT_SIGNATURE_STATE);
const businessCardHtml = generateEmailHTML(businessCardState, 'data:image/png;base64,BUSINESS_CARD_QR');
assert.equal(businessCardState.layout.preset, 'layout-e');
assert.equal(businessCardState.layout.dimensions.totalWidth, 520);
assert.equal(businessCardState.layout.separator.color, '#F7BD00');
assert.equal(businessCardState.visibility.qr, true);
assert.equal(businessCardState.visibility.banner, false);
assert.match(businessCardHtml, /bgcolor="#FFFFFF"/);
assert.match(businessCardHtml, /data:image\/png;base64,BUSINESS_CARD_QR/);
assert.match(businessCardHtml, /logo_ragt\.png/);

const premiumPreset = SIGNATURE_PRESETS.find((preset) => preset.id === 'premium-ragt');
assert.ok(premiumPreset, 'the premium RAGT preset must be available');
const premiumState = premiumPreset.apply(DEFAULT_SIGNATURE_STATE);
const premiumHtml = generateEmailHTML(premiumState, 'data:image/png;base64,PREMIUM_QR');
assert.equal(premiumState.layout.preset, 'layout-e');
assert.equal(premiumState.layout.dimensions.totalWidth, 540);
assert.equal(premiumState.design.border.color, '#0C3866');
assert.equal(premiumState.visibility.qr, true);
assert.equal(premiumState.visibility.secondaryLogo, true);
assert.match(premiumHtml, /data:image\/png;base64,PREMIUM_QR/);

const normalized = normalizeSignatureConfig({
  config: {
    layout: { preset: 'layout-a' },
    personal: { firstName: 'Ada', lastName: 'Lovelace' }
  }
});
assert.equal(normalized?.personal.firstName, 'Ada');
assert.equal(normalized?.layout.dimensions.totalWidth, DEFAULT_SIGNATURE_STATE.layout.dimensions.totalWidth);
assert.equal(normalizeSignatureConfig({ invalid: true }), null);

const styled = normalizeSignatureConfig({
  personal: { firstName: 'Ada', lastName: 'Lovelace' },
  layout: { preset: 'layout-f', separator: { color: '#123456' } },
  qr: { fgColor: '#654321' },
  slogan: { color: '#ABCDEF', fontFamily: 'Verdana, Geneva, sans-serif' }
});
assert.equal(styled?.layout.separator.color, '#123456');
assert.equal(styled?.qr.fgColor, '#654321');
assert.equal(styled?.slogan.color, '#ABCDEF');
assert.equal(styled?.slogan.fontFamily, 'Verdana, Geneva, sans-serif');

const revisions = Array.from({ length: 31 }, (_, index) => ({
  id: `revision-${index}`,
  name: `Révision ${index}`,
  timestamp: index,
  state: { ...DEFAULT_SIGNATURE_STATE, personal: { ...DEFAULT_SIGNATURE_STATE.personal, firstName: `Personne ${index}` } }
}));
const cappedRevisions = revisions.reduce((stored, revision) => prependSavedRevision(stored, revision), [] as typeof revisions);
assert.equal(cappedRevisions.length, 30, 'saved revisions must remain capped at 30');
assert.equal(cappedRevisions[0].id, 'revision-30');
assert.equal(cappedRevisions.at(-1)?.id, 'revision-1');
assert.equal(findSavedRevision(cappedRevisions, 'revision-12')?.state.personal.firstName, 'Personne 12');

const restoredRevisions = normalizeSavedRevisions([
  { id: 'recovery', name: 'Avant réinitialisation', timestamp: 1, state: { layout: { preset: 'layout-a' }, personal: { firstName: 'Avant', lastName: 'Reset' } } },
  { id: 42, name: 'invalide', timestamp: 2, state: DEFAULT_SIGNATURE_STATE }
]);
assert.equal(restoredRevisions.length, 1, 'invalid revisions must be ignored on reload');
assert.equal(restoredRevisions[0].state.personal.firstName, 'Avant');
const recoveryRevision = createSavedRevision(
  { ...DEFAULT_SIGNATURE_STATE, personal: { ...DEFAULT_SIGNATURE_STATE.personal, firstName: 'À récupérer' } },
  'Avant réinitialisation',
  1234,
  'before-reset-1234'
);
assert.equal(recoveryRevision.id, 'before-reset-1234');
assert.equal(recoveryRevision.name, 'Avant réinitialisation');
assert.equal(recoveryRevision.state.personal.firstName, 'À récupérer');

const campaign = { ...DEFAULT_SIGNATURE_STATE.banner, enabled: true, imageUrl: 'data:image/png;base64,AA==' };
assert.equal(getCampaignStatus({ ...campaign, startDate: '2099-01-01' }, new Date('2026-09-16')), 'scheduled');
assert.equal(getCampaignStatus({ ...campaign, startDate: '2026-09-01', endDate: '2026-09-30' }, new Date('2026-09-16')), 'active');
assert.equal(getCampaignStatus({ ...campaign, endDate: '2026-08-31' }, new Date('2026-09-16')), 'expired');

const fullWidthCampaignState = {
  ...DEFAULT_SIGNATURE_STATE,
  layout: {
    ...DEFAULT_SIGNATURE_STATE.layout,
    dimensions: { ...DEFAULT_SIGNATURE_STATE.layout.dimensions, totalWidth: 540 }
  },
  visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, banner: true },
  banner: {
    ...DEFAULT_SIGNATURE_STATE.banner,
    enabled: true,
    imageUrl: 'data:image/png;base64,CAMPAIGN',
    position: 'bottom' as const,
    width: 540,
    height: 140,
    maintainRatio: false
  }
};
const fullWidthCampaignHtml = generateEmailHTML(fullWidthCampaignState);
const fullWidthCampaignPortal = generateStandaloneSignatureAppHtml(fullWidthCampaignState, fullWidthCampaignHtml);
assert.match(fullWidthCampaignHtml, /<table[^>]*width="540"[^>]*width:540px; max-width:100%/, 'a campaign must use the complete signature width');
assert.match(fullWidthCampaignHtml, /data-ragt-dropzone="banner"[^>]*width="540" height="90"[^>]*width:540px; max-width:100%; height:90px; object-fit:cover/, 'a fixed campaign must be capped at 90 px');
assert.match(fullWidthCampaignPortal, /maintainRatio":false/, 'the offline portal must retain campaign sizing rules');

// Realistic stress data: long identity, title and address must remain textual,
// linked and structurally valid in both a spacious and a compact card.
for (const preset of ['layout-a', 'layout-f', 'layout-i'] as const) {
  const stressState = {
    ...DEFAULT_SIGNATURE_STATE,
    layout: { ...DEFAULT_SIGNATURE_STATE.layout, preset },
    personal: {
      ...DEFAULT_SIGNATURE_STATE.personal,
      firstName: 'Marie-Antoinette',
      lastName: 'DE LA TOUR D’ARGENT',
      jobTitle: 'Responsable internationale développement variétal et partenariats stratégiques',
      phone: '+33 5 65 73 41 66',
      mobile: '+33 6 12 34 56 78',
      email: 'marie-antoinette.de-la-tour-dargent@ragt-semences.fr',
      addressLine1: 'Parc d’activités agricoles et technologiques de Bourran',
      addressLine2: 'Bâtiment Innovation — Bureau 214',
      postalCode: '12000',
      city: 'Rodez',
      country: 'France'
    },
    visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, qr: true, socials: true, banner: false }
  };
  const stressHtml = generateEmailHTML(stressState, 'data:image/png;base64,STRESS_QR');
  assert.match(stressHtml, /Marie-Antoinette/, `${preset} must keep a long first name as text`);
  assert.match(stressHtml, /DE LA TOUR D’ARGENT/, `${preset} must keep a long last name as text`);
  assert.match(stressHtml, /Responsable internationale développement variétal/, `${preset} must keep a long job title`);
  assert.match(stressHtml, /marie-antoinette\.de-la-tour-dargent@ragt-semences\.fr/, `${preset} must retain the long e-mail`);
  assert.match(stressHtml, /Bâtiment Innovation/, `${preset} must retain the second address line`);
  assert.match(stressHtml, /data:image\/png;base64,STRESS_QR/, `${preset} must retain a functional QR image`);
  assert.match(stressHtml, /overflow-wrap:anywhere/, `${preset} must keep long contact values inside their column`);
  assert.ok(!stressHtml.includes('undefined'), `${preset} must not render undefined values`);
}

// Visibility is structural: optional blocks must disappear cleanly instead of
// leaving placeholders, and every advertised QR target must encode real data.
const sparseState = {
  ...DEFAULT_SIGNATURE_STATE,
  visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, qr: false, banner: false, slogan: false, socials: false },
  banner: { ...DEFAULT_SIGNATURE_STATE.banner, enabled: false },
  slogan: { ...DEFAULT_SIGNATURE_STATE.slogan, enabled: false }
};
const sparseHtml = generateEmailHTML(sparseState, 'data:image/png;base64,OPTIONAL_QR');
assert.doesNotMatch(sparseHtml, /QR Code vCard/, 'a hidden QR must not leave a placeholder');
assert.doesNotMatch(sparseHtml, /data-ragt-dropzone="banner"/, 'a hidden campaign must not leave a placeholder');
assert.doesNotMatch(sparseHtml, /Des semences pour demain/, 'a hidden slogan must not leave a placeholder');

const qrExpectations = {
  vcard: /BEGIN:VCARD[\s\S]*EMAIL;TYPE=PREF,INTERNET:gregory\.amado@ragt\.com/,
  url: 'https://www.ragt.fr',
  email: 'mailto:gregory.amado@ragt.com',
  phone: 'tel:0612345678',
  custom: 'https://www.ragt.fr/contact/verification-qr'
} as const;
for (const [type, expected] of Object.entries(qrExpectations)) {
  const qrState = {
    ...DEFAULT_SIGNATURE_STATE,
    qr: {
      ...DEFAULT_SIGNATURE_STATE.qr,
      type: type as typeof DEFAULT_SIGNATURE_STATE.qr.type,
      customText: type === 'custom' ? String(expected) : DEFAULT_SIGNATURE_STATE.qr.customText
    }
  };
  const content = getQrRawContent(qrState);
  if (expected instanceof RegExp) assert.match(content, expected, `${type} QR must encode its expected data`);
  else assert.equal(content, expected, `${type} QR must encode its expected data`);
}

// The centered layout is the free composition: the persisted order must alter
// the resulting Outlook-safe table sequence, not only the Studio controls.
const reorderedState = {
  ...DEFAULT_SIGNATURE_STATE,
  layout: { ...DEFAULT_SIGNATURE_STATE.layout, preset: 'layout-d' as const, blockOrder: ['social', 'identity', 'coordinates', 'logo', 'qr', 'slogan', 'banner'] as typeof DEFAULT_SIGNATURE_STATE.layout.blockOrder },
  personal: { ...DEFAULT_SIGNATURE_STATE.personal, firstName: 'Ordre', lastName: 'LIBRE', email: 'ordre.libre@ragt.com' },
  visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, qr: false, banner: false, slogan: false, socials: true }
};
const reorderedHtml = generateEmailHTML(reorderedState);
assert.ok(reorderedHtml.indexOf('linkedin.com/company/ragt') < reorderedHtml.indexOf('Ordre'), 'layout D must place social links before identity when requested');
assert.ok(reorderedHtml.indexOf('Ordre') < reorderedHtml.indexOf('ordre.libre@ragt.com'), 'layout D must place identity before coordinates when requested');

const reorderedColumnState = {
  ...reorderedState,
  layout: { ...reorderedState.layout, preset: 'layout-a' as const }
};
const reorderedColumnHtml = generateEmailHTML(reorderedColumnState);
assert.ok(reorderedColumnHtml.indexOf('linkedin.com/company/ragt') < reorderedColumnHtml.indexOf('Ordre'), 'horizontal layouts must apply the same saved information-block order');
assert.ok(reorderedColumnHtml.indexOf('Ordre') < reorderedColumnHtml.indexOf('ordre.libre@ragt.com'), 'horizontal layouts must retain the requested identity-to-contact order');

const diagnostic = validateSignature(DEFAULT_SIGNATURE_STATE, generateEmailHTML(DEFAULT_SIGNATURE_STATE));
assert.ok(diagnostic.items.some((item) => item.id === 'outlook-manual-review' && item.status === 'warning'), 'automatic checks must keep manual Outlook validation visible');
assert.ok(diagnostic.clientScores.every((client) => client.status === 'unverified' && client.stars === 0), 'no email client may be rated before a documented manual recipe');

const designReviewState = {
  ...DEFAULT_SIGNATURE_STATE,
  personal: { ...DEFAULT_SIGNATURE_STATE.personal, jobTitle: '' },
  logos: { ...DEFAULT_SIGNATURE_STATE.logos, primary: { ...DEFAULT_SIGNATURE_STATE.logos.primary, keepRatio: false } },
  qr: { ...DEFAULT_SIGNATURE_STATE.qr, visible: true, size: 50, fgColor: '#777777', bgColor: '#777777' },
  social: { ...DEFAULT_SIGNATURE_STATE.social, items: [{ ...DEFAULT_SIGNATURE_STATE.social.items[0], active: true, url: '' }, ...DEFAULT_SIGNATURE_STATE.social.items.slice(1)] },
  banner: { ...DEFAULT_SIGNATURE_STATE.banner, enabled: true, imageUrl: 'data:image/png;base64,AA==', altText: '' },
  visibility: { ...DEFAULT_SIGNATURE_STATE.visibility, jobTitle: true, qr: true, socials: true, banner: true }
};
const designReviewIds = new Set(validateSignature(designReviewState, generateEmailHTML(designReviewState, 'data:image/png;base64,REVIEW_QR')).items.map((item) => item.id));
for (const id of ['job-missing', 'logo-ratio', 'qr-size', 'qr-contrast', 'social-link-missing', 'banner-alt-missing']) {
  assert.ok(designReviewIds.has(id), `design review must flag ${id}`);
}

// Verification of social icon colors across all networks
const testNetworks = ['youtube', 'facebook', 'instagram', 'linkedin', 'website', 'x', 'tiktok'] as const;
for (const net of testNetworks) {
  const url = getSocialIconDataUrl(net, '#F7BD00', 'minimal');
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('%23F7BD00') || decoded.includes('#F7BD00'), `${net} minimal icon must include the requested color`);
  assert.ok(!decoded.includes('fill="#000000"') && !decoded.includes('fill="#000"'), `${net} minimal icon must not retain black fill`);
}

// Verification of mobile phone color configuration
const customMobileState = {
  ...DEFAULT_SIGNATURE_STATE,
  personal: {
    ...DEFAULT_SIGNATURE_STATE.personal,
    phone: '05 65 73 41 00',
    mobile: '06 12 34 56 78'
  },
  visibility: {
    ...DEFAULT_SIGNATURE_STATE.visibility,
    phone: true,
    mobile: true
  },
  design: {
    ...DEFAULT_SIGNATURE_STATE.design,
    colors: {
      ...DEFAULT_SIGNATURE_STATE.design.colors,
      phone: '#056573',
      mobile: '#F7BD00'
    }
  }
};
const customMobileHtml = generateEmailHTML(customMobileState);
assert.match(customMobileHtml, /color:#056573[^>]*>05 65 73 41 00/, 'phone number must use design.colors.phone');
assert.match(customMobileHtml, /color:#F7BD00[^>]*>06 12 34 56 78/, 'mobile phone number must use design.colors.mobile');

// Fallback test: when mobile is uncustomized default #0C3866 and phone is #F7BD00, mobile adopts phone color
const fallbackMobileState = {
  ...DEFAULT_SIGNATURE_STATE,
  personal: {
    ...DEFAULT_SIGNATURE_STATE.personal,
    phone: '05 65 73 41 00',
    mobile: '06 12 34 56 78'
  },
  visibility: {
    ...DEFAULT_SIGNATURE_STATE.visibility,
    phone: true,
    mobile: true
  },
  design: {
    ...DEFAULT_SIGNATURE_STATE.design,
    colors: {
      ...DEFAULT_SIGNATURE_STATE.design.colors,
      phone: '#F7BD00',
      mobile: '#0C3866'
    }
  }
};
const fallbackMobileHtml = generateEmailHTML(fallbackMobileState);
assert.match(fallbackMobileHtml, /color:#F7BD00[^>]*>06 12 34 56 78/, 'mobile phone must adopt customized phone color when mobile is default #0C3866');

console.log(`Verified ${layouts.length} layouts, the complete RAGT card journey, Studio-to-portal rendering, configuration normalization, styles, revisions, campaign statuses, social icon colors, and mobile phone colors.`);

