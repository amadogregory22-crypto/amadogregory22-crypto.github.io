import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page, target = '/') {
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
    await expect(page.getByText('Mode de developpement')).toHaveCount(0);
  }
}

test.describe('Apparence et charte', () => {
  test('configure la palette, la typographie et les raccourcis utiles', async ({ page }) => {
    await login(page, '/appearance');

    await expect(page.getByRole('heading', { name: 'Apparence et charte' })).toBeVisible();

    await page.getByRole('button', { name: /Atelier digital/ }).click();
    await expect(page.getByTestId('appearance-primary-color')).toHaveValue('#0f172a');
    await expect(page.getByTestId('appearance-secondary-color')).toHaveValue('#06b6d4');

    await page.getByTestId('appearance-font-family').selectOption('Georgia');
    await expect(page.getByText('Georgia').last()).toBeVisible();

    await page.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(page.getByText('Charte sauvegardee')).toBeVisible();

    await page.getByRole('button', { name: 'Bibliotheque' }).click();
    await expect(page).toHaveURL(/\/library$/);
  });
});
