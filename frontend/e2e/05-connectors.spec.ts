import { test, expect } from '@playwright/test';

test.describe('Scénario 6 : Connecteurs Métiers', () => {
  test('les connecteurs sont visibles et peuvent être testés', async ({ page }) => {
    await page.goto('/connectors');

    // Vérifier la présence de GLPI, SharePoint et Exchange
    await expect(page.getByTestId('connector-card-glpi')).toBeVisible();
    await expect(page.getByTestId('connector-card-sp')).toBeVisible();
    await expect(page.getByTestId('connector-card-exchange')).toBeVisible();

    // Tester GLPI
    await page.getByTestId('btn-test-glpi').click();
    
    // Vérifier que la console s'alimente
    const logsContainer = page.getByTestId('connector-logs');
    await expect(logsContainer).toContainText('Test de connexion vers GLPI en cours');
    
    // Le toast de succès doit apparaître
    await expect(page.locator('text=Test réussi')).toBeVisible();
    // Le log de succès doit apparaître
    await expect(logsContainer).toContainText('Succès : Connexion établie avec GLPI');

    // Tester SharePoint
    await page.getByTestId('btn-test-sp').click();
    await expect(logsContainer).toContainText('Succès : Connexion établie avec SharePoint');

    // Vérifier qu'un statut connecté a une icône de validation
    await expect(page.getByTestId('status-connected-ad')).toBeVisible(); // AD est connecté par défaut dans le mock
  });
});
