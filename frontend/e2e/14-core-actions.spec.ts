import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page, target = '/') {
  await page.goto(target);
  const persona = page.getByRole('button', { name: /Marie Dubois/ }).first();
  if (await persona.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)) {
    await persona.click();
    await expect(page.getByText('Mode de développement')).toHaveCount(0);
  }
  const closeOnboarding = page.getByTitle('Fermer');
  if (await closeOnboarding.isVisible().catch(() => false)) {
    await closeOnboarding.click();
  }
}

test.describe('Actions coeur application', () => {
  test('Créer, Identité et Studio exécutent des actions utiles', async ({ page }) => {
    await login(page, '/create');

    await expect(page.getByRole('heading', { name: 'Creer', exact: true })).toBeVisible();
    await page.getByTestId('create-banner-card').click();
    await expect(page).toHaveURL(/\/studio$/);
    await expect(page.getByText('Banniere campagne RAGT', { exact: true }).first()).toBeVisible();

    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/l6oYxQAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.locator('input[aria-label="Importer une image dans le Studio"]').setInputFiles({
      name: 'pixel.png',
      mimeType: 'image/png',
      buffer: png,
    });
    await expect(page.locator('img[src^="data:image/png"]').first()).toBeVisible();

    await page.goto('/identity');
    await expect(page.getByRole('heading', { name: 'Collaborateur' })).toBeVisible();
    await page.getByTestId('identity-firstName').fill('Laura');
    await page.getByTestId('identity-lastName').fill('Roux');
    await page.getByTestId('identity-email').fill('laura.roux@ragt.fr');
    await expect(page.getByText('Profil actif : Laura Roux')).toBeVisible();

    await page.getByRole('button', { name: /Thomas Martin/ }).click();
    await expect(page.getByTestId('identity-firstName')).toHaveValue('Thomas');
    await expect(page.getByTestId('identity-email')).toHaveValue('thomas.martin@ragt.fr');
  });
});
