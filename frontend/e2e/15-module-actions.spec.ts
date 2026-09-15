import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page, target = '/tools/outlook') {
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
  const closeOnboarding = page.getByTitle('Fermer');
  if (await closeOnboarding.isVisible().catch(() => false)) {
    await closeOnboarding.click();
  }
}

test.describe('Modules raccordes', () => {
  test('un ancien module placeholder expose des actions et une note locale', async ({ page }) => {
    await login(page);

    await expect(page.getByRole('heading', { name: /Outlook/i })).toBeVisible();
    await expect(page.getByText('Actions disponibles')).toBeVisible();
    await expect(page.getByRole('link', { name: /Exporter le pack/i })).toBeVisible();

    await page.getByPlaceholder(/Ajouter un contexte/i).fill('Verifier le raccordement Outlook.');
    await page.getByRole('button', { name: /Enregistrer note/i }).click();
    await expect(page.getByText('Note module enregistree')).toBeVisible();
  });
});
