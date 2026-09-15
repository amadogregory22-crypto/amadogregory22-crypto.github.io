import { test, expect } from '@playwright/test';

// Utilisation d'un device mobile spécifique
test.use({ viewport: { width: 375, height: 667 } });

test.describe('Scénario 8 : Responsive Mobile', () => {
  test('la navigation et l\'éditeur restent utilisables sur mobile', async ({ page }) => {
    await page.goto('/');

    // Sur mobile, le menu hamburger doit être visible
    const hamburgerBtn = page.getByTestId('mobile-menu-button');
    await expect(hamburgerBtn).toBeVisible();

    // Ouvrir le menu
    await hamburgerBtn.click();
    
    // Le menu devient visible et les liens sont cliquables
    const createLink = page.getByTestId('nav-create').last(); // La 2ème sidebar est la mobile
    await expect(createLink).toBeVisible();
    await createLink.click();

    // Naviguer vers la signature
    await page.getByTestId('create-signature-card').click();

    // Vérifier que l'éditeur s'affiche bien (pas de dépassement critique bloquant le titre)
    await expect(page.getByText('Éditeur de Signature')).toBeVisible();

    // Vérifier que le body n'a pas de scroll horizontal non désiré
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    // On s'assure que le contenu n'excède pas drastiquement la largeur de l'écran mobile
    // Le design actuel utilise flex et shrink-0, ça devrait aller
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 20); // Tolérance de 20px
  });
});
