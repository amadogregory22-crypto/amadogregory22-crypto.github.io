import { expect, test } from '@playwright/test';

async function loginAsAdmin(page: import('@playwright/test').Page, target = '/admin') {
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

test.describe('Actions administration et IA', () => {
  test('les boutons visibles ouvrent des parcours utiles', async ({ page }) => {
    await page.route('**/api/ai/providers', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'mock', name: 'Mock local', enabled: true, defaultModel: 'local-demo' }]),
      });
    });
    await page.route('**/api/ai/agents', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          {
            agentId: 'signature-helper',
            name: 'Assistant signature',
            description: 'Aide a corriger une signature.',
            enabled: true,
            riskLevel: 'low',
            requiredPermission: 'ai:execute',
          },
        ]),
      });
    });

    await loginAsAdmin(page);
    await page.getByRole('button', { name: /Ajouter un administrateur/i }).click();
    await expect(page).toHaveURL(/\/admin\/users$/);
    await expect(page.getByText('Gestion administrateurs')).toBeVisible();

    await page.goto('/ai');
    await expect(page.getByRole('heading', { name: /IA souveraine/i })).toBeVisible();
    await page.getByRole('button', { name: /Configurer/i }).click();
    await expect(page).toHaveURL(/\/settings\?section=stability$/);

    await page.goto('/ai');
    await page.getByRole('button', { name: /Parametres/i }).click();
    await expect(page).toHaveURL(/\/admin\/roles$/);
    await expect(page.getByText('Permissions agent IA')).toBeVisible();
  });
});
