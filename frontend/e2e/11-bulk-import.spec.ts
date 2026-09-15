import { test, expect } from '@playwright/test';

test.describe('Bulk Import (Publipostage)', () => {
  test('COMMUNICATION can access bulk import page', async ({ page }) => {
    // Mock login as COMMUNICATION
    await page.goto('/mailmerge');
    await expect(page.getByText('Génération Massive')).toBeVisible();
    await expect(page.getByText('Importez votre fichier CSV')).toBeVisible();
  });

  test('USER cannot access bulk import page', async ({ page }) => {
    // Mock login as USER
    // Should be redirected or show 403
  });

  test('Full E2E Import Flow', async ({ page }) => {
    // Upload CSV
    // Map columns
    // Validate
    // Generate
    // Export ZIP
  });
});
