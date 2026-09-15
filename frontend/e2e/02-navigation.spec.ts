import { test, expect } from '@playwright/test';

test.describe('Scénario 2 : Navigation Principale', () => {
  test('la navigation via le menu latéral charge chaque page', async ({ page }) => {
    await page.goto('/');

    const routes = [
      { id: 'create', urlRegex: /\/create/, title: 'Créer' },
      { id: 'identity', urlRegex: /\/identity/, title: 'Identité' },
      { id: 'appearance', urlRegex: /\/appearance/, title: 'Apparence' },
      { id: 'library', urlRegex: /\/library/, title: 'Bibliothèque' },
      { id: 'documents', urlRegex: /\/documents/, title: 'Documents' },
      { id: 'mailmerge', urlRegex: /\/mailmerge/, title: 'Publipostage' },
      { id: 'connectors', urlRegex: /\/connectors/, title: 'Connecteurs' },
      { id: 'admin', urlRegex: /\/admin/, title: 'Administration' },
      { id: 'home', urlRegex: /.*\/$/, title: 'Tableau de bord' },
    ];

    for (const route of routes) {
      await page.getByTestId(`nav-${route.id}`).first().click();
      await expect(page).toHaveURL(route.urlRegex);
      // On s'assure que le titre du Header contient bien le mot clé de la page
      await expect(page.locator('header h2')).toContainText(route.title);
    }
  });
});
