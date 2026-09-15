import { expect, test } from '@playwright/test';

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await page.goto('/settings');
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

test.describe('Paramètres applicatifs', () => {
  test('affiche les sous-menus et exécute les actions principales', async ({ page }) => {
    await loginAsAdmin(page);

    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { name: 'Paramètres' })).toBeVisible();

    for (const label of [
      'Affichage',
      'Résolution',
      'Multi écran',
      'Préférences',
      'Statistiques',
      'Cache et application',
      'Profils',
      'Comptes',
      'Version et stabilité',
      'Aide',
    ]) {
      await expect(main.getByRole('button', { name: label })).toBeVisible();
    }

    await expect(main.getByText('Propriétés du document')).toBeVisible();
    await expect(main.getByText(/Document modifié|Synchronisé/).first()).toBeVisible();

    await main.getByRole('button', { name: 'Résolution' }).click();
    await main.getByRole('combobox').selectOption('1600x500');
    await expect(main.getByText('1600x500').last()).toBeVisible();

    await main.getByRole('button', { name: 'Cache et application' }).click();
    const downloadPromise = page.waitForEvent('download');
    await main.getByRole('button', { name: /Exporter/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('diagnostic-ragt-studio.json');

    await main.getByRole('button', { name: 'Multi écran' }).click();
    await main.getByRole('switch', { name: /Visible|Masqué/ }).click();
    await expect(main.getByText('Propriétés du document')).toHaveCount(0);
  });
});
