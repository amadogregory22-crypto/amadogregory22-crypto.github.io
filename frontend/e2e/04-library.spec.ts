import { test, expect } from '@playwright/test';

test.describe('Scénario 5 : Bibliothèque', () => {
  test('import d\'asset, ajout aux favoris et filtrage', async ({ page }) => {
    await page.goto('/library');

    // Compter le nombre de cartes d'assets initiales
    // On utilise un sélecteur qui match le début de l'ID dynamique : div[data-testid^="asset-card-"]
    const initialCount = await page.locator('div[data-testid^="asset-card-"]').count();

    // Importer un nouvel asset mock
    await page.getByTestId('btn-upload-asset').click();

    // Vérifier l'apparition du toast de succès
    await expect(page.locator('text=Asset importé')).toBeVisible();

    // Vérifier qu'une carte supplémentaire a été ajoutée
    const currentAssets = page.locator('div[data-testid^="asset-card-"]');
    await expect(currentAssets).toHaveCount(initialCount + 1);

    // Récupérer le bouton favori du premier asset et cliquer dessus
    const firstAssetCard = currentAssets.first();
    // Le premier asset du mock de départ est déjà favori, on va donc filtrer les favoris
    // Ou on favorise le deuxième asset
    const secondAssetFavBtn = currentAssets.nth(1).locator('button[data-testid^="btn-favorite-"]');
    await secondAssetFavBtn.click();

    // Cliquer sur le filtre "Favoris"
    await page.getByTestId('btn-filter-favorites').click();

    // Vérifier que le nombre d'éléments a diminué (le filtre fonctionne)
    const filteredCount = await page.locator('div[data-testid^="asset-card-"]').count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(initialCount + 1);
  });
});
