import { expect, test } from '@playwright/test';

async function loginAsAdmin(page: import('@playwright/test').Page, target = '/') {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'ragt-onboarding-storage',
      JSON.stringify({ state: { isOnboardingCompleted: true }, version: 0 })
    );
  });
  await page.goto(target);
  const persona = page.getByRole('button', { name: /Marie Dubois/ }).first();
  if (await persona.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)) {
    await persona.click();
    await expect(page.getByText('Mode de dÃ©veloppement')).toHaveCount(0);
  }
}

test.describe('Navigation utile', () => {
  test('la recherche globale et la configuration connecteur ouvrent les bons modules', async ({ page }) => {
    await loginAsAdmin(page);

    await page.getByTestId('global-search').fill('outlook');
    await page.getByTestId('global-search').press('Enter');
    await expect(page).toHaveURL(/\/tools\/outlook$/);
    await expect(page.getByRole('heading', { name: /Outlook/i })).toBeVisible();

    await page.goto('/connectors');
    await expect(page.getByRole('heading', { name: /Connecteurs/i })).toBeVisible();
    await page.getByRole('button', { name: /Configurer/i }).first().click();
    await expect(page).toHaveURL(/\/settings\?section=stability$/);
    await expect(page.getByRole('heading', { name: /Version et/i })).toBeVisible();
  });
});
