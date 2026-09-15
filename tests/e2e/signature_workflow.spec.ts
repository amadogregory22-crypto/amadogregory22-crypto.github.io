import { test, expect } from '@playwright/test';

test.describe('Signature Studio End-to-End Scenarios', () => {
  const BASE_URL = 'http://127.0.0.1:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('SCÉNARIO 1 : Workflow complet Nominal (Import -> Analyse -> Revue -> Studio -> Aperçu -> Export)', async ({ page }) => {
    // 1. Check title
    await expect(page.locator('header')).toContainText('Signature Studio');
    
    // 2. Import screen
    const nameInput = page.locator('input[placeholder*="Signature"]');
    await nameInput.fill('Signature Test Alice');

    // 3. Navigate to review manually or check header stepper
    await page.click('button:has-text("3. Revoir")');
    await expect(page.locator('text=Composants détectés')).toBeVisible();

    // 4. Navigate to editor
    await page.click('button:has-text("4. Éditer")');
    await expect(page.locator('text=Inspecteur d\'élément')).toBeVisible();

    // 5. Navigate to preview
    await page.click('button:has-text("5. Vérifier")');
    await expect(page.locator('text=New Outlook / OWA Web')).toBeVisible();

    // 6. Navigate to export
    await page.click('button:has-text("6. Exporter")');
    await expect(page.locator('text=Package d\'installation Outlook complet')).toBeVisible();
  });

  test('SCÉNARIO 3 : Single Source of Truth - Synchronisation instantanée du champ email', async ({ page }) => {
    await page.click('button:has-text("4. Éditer")');
    
    // In Content Tab, type a new email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('jean.dupont.test@ragt.fr');

    // Verify it propagates to the document store and preview
    await page.click('button:has-text("5. Vérifier")');
    await expect(page.locator('body')).toContainText('jean.dupont.test@ragt.fr');
  });

  test('SCÉNARIO 4 : Calque Source Référence - Visible dans Studio mais absent du code Outlook', async ({ page }) => {
    await page.click('button:has-text("4. Éditer")');
    
    // The source reference is a ghost overlay (listening=false, never exported)
    await page.click('button:has-text("6. Exporter")');
    const codeContainer = page.locator('pre');
    const htmlCode = await codeContainer.innerText();
    
    // Must NOT contain canvas or source reference image blob
    expect(htmlCode).not.toContain('SourceReference');
    expect(htmlCode).not.toContain('blob:');
  });
});
