import { test, expect } from '@playwright/test';

test.describe('Scénario 3 & 4 : Création de signature et export', () => {
  test('la saisie du formulaire met à jour la prévisualisation et l\'export génère le code', async ({ page }) => {
    await page.goto('/create/signature');

    // Scénario 3 : Test création signature
    await page.locator('input[name="firstName"]').fill('Thomas');
    await page.locator('input[name="lastName"]').fill('Martin');
    await page.locator('input[name="title"]').fill('Directeur Commercial');
    await page.locator('input[name="phone"]').fill('01 23 45 67 89');
    await page.locator('input[name="email"]').fill('thomas.martin@ragt.fr');

    // On vérifie que la preview HTML se met à jour
    const previewContainer = page.getByTestId('signature-preview-table');
    
    // Vérifier nom complet
    await expect(previewContainer).toContainText('Thomas Martin');
    // Vérifier email
    await expect(previewContainer).toContainText('thomas.martin@ragt.fr');
    // Vérifier téléphone
    await expect(previewContainer).toContainText('01 23 45 67 89');

    // Scénario 4 : Test export HTML
    // On s'assure que la table principale HTML de l'email existe
    await expect(previewContainer).toHaveAttribute('cellspacing', '0');
    
    // On s'assure que les liens mailto sont présents dans le HTML généré
    const mailtoLink = previewContainer.locator('a[href^="mailto:"]');
    await expect(mailtoLink).toBeVisible();

    // Cliquer sur le bouton d'export Code HTML
    await page.getByTestId('btn-export-html').click();

    // Vérifier qu'un message de succès apparaît (le toaster)
    await expect(page.locator('text=Code HTML copié')).toBeVisible();
  });
});
