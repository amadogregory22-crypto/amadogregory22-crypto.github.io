import { expect, test } from '@playwright/test';

async function loginAsAdmin(page: import('@playwright/test').Page, target = '/admin/menus') {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'ragt-onboarding-storage',
      JSON.stringify({ state: { isOnboardingCompleted: true }, version: 0 })
    );
  });
  await page.route('**/api/admin/menus**', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'menu-root',
            label: 'Accueil',
            route: '/',
            icon: 'LayoutDashboard',
            order: 1,
            allowedRoles: ['SUPERADMIN_APP', 'ADMIN_DSI'],
            isSystem: true,
            isEnabled: true,
          },
          {
            id: 'menu-custom',
            label: 'Connecteurs',
            route: '/connectors',
            icon: 'Cable',
            order: 2,
            allowedRoles: ['SUPERADMIN_APP', 'ADMIN_DSI'],
            isSystem: false,
            isEnabled: true,
          },
        ]),
      });
      return;
    }
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ id: 'menu-created', success: true }),
    });
  });
  await page.goto(target);
  const persona = page.getByRole('button', { name: /Marie Dubois/ }).first();
  if (await persona.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)) {
    await persona.click();
    await expect(page.getByText('Mode de dÃ©veloppement')).toHaveCount(0);
  }
}

test.describe('Administration navigation', () => {
  test('permet de creer, modifier et desactiver un menu', async ({ page }) => {
    await loginAsAdmin(page);

    await expect(page.getByRole('heading', { name: /Configuration navigation/i })).toBeVisible();
    await expect(page.getByRole('table').getByText('Connecteurs')).toBeVisible();

    await page.getByRole('button', { name: /Nouveau menu/i }).click();
    await page.getByLabel('Libelle').fill('Module test');
    await page.getByLabel('Route').fill('/module-test');
    await page.getByRole('button', { name: /Sauvegarder/i }).click();
    await expect(page.getByText('Menu cree')).toBeVisible();

    await page.getByTitle('Modifier').first().click();
    await expect(page.getByRole('heading', { name: /Modifier le menu/i })).toBeVisible();
    await page.getByRole('button', { name: /Annuler/i }).click();

    await page.getByTitle('Desactiver').first().click();
    await expect(page.getByText('Menu desactive')).toBeVisible();
  });
});
