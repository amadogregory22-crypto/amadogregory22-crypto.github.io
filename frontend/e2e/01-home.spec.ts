import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
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

test.describe("Scénario 1 : Chargement de l'accueil", () => {
  test("l'application démarre sans erreur", async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await login(page);

    await expect(page.getByTestId('dashboard-title')).toBeVisible();
    await expect(page.getByTestId('dashboard-title')).toHaveText('Bonjour Marie,');
    await expect(page.getByTestId('nav-home').first()).toBeVisible();
    await expect(page.locator('text=Erreur').first()).not.toBeVisible();
  });
});
