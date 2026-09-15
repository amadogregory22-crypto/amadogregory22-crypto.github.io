import { expect, test } from '@playwright/test';

async function loginOnExport(page: import('@playwright/test').Page) {
  await page.goto('/export');
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

async function expectDownload(page: import('@playwright/test').Page, testId: string, extension: string) {
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId(testId).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(new RegExp(`\\.${extension}$`));
}

test.describe('Centre export', () => {
  test('genere les fichiers principaux de la signature courante', async ({ page }) => {
    await loginOnExport(page);

    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { name: "Centre d'export" })).toBeVisible();
    await expect(main.getByText('Signature courante')).toBeVisible();
    await expect(main.getByText('Fichiers du pack')).toBeVisible();

    await expectDownload(page, 'export-html-outlook', 'htm');
    await expectDownload(page, 'export-pdf', 'pdf');
    await expectDownload(page, 'export-zip', 'zip');
    await expectDownload(page, 'export-json', 'json');
  });
});
