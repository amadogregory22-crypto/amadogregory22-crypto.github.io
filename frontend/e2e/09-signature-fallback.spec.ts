import { test, expect } from '@playwright/test';

test.describe('Scénario 9 : Persistance et Fallback', () => {
  test('la signature est sauvegardée (ou tombe en mode hors-ligne sans crasher)', async ({ page }) => {
    await page.goto('/create/signature');

    // S'assurer que le rendu est terminé
    await expect(page.getByText('Éditeur de Signature')).toBeVisible();

    // Cliquer sur le bouton enregistrer
    await page.getByRole('button', { name: /Enregistrer le modèle/i }).click();

    // On devrait voir soit "Enregistré" soit "Hors-ligne"
    const successOrFallback = page.locator('text=Enregistré').or(page.locator('text=Sauvegarde locale uniquement'));
    await expect(successOrFallback.first()).toBeVisible({ timeout: 10000 });
  });
});
