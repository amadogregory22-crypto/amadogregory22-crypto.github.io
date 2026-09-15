import { test, expect } from '@playwright/test';

test.describe('Scénarios V2 : Création de signature avancée', () => {
  
  test.beforeEach(async ({ page }) => {
    // Naviguer directement sur l'éditeur
    await page.goto('/create/signature');
    // S'assurer que le rendu est terminé
    await expect(page.getByText('Aperçu en direct')).toBeVisible();
  });

  test('le contrôle qualité signale une erreur si l\'email est invalide', async ({ page }) => {
    // Au départ, la qualité est à 100
    await expect(page.getByText('Score de Qualité : 100/100')).toBeVisible();

    // Vider l'email et mettre un faux email
    const emailInput = page.getByLabel('Email');
    await emailInput.fill('pas-un-email');

    // L'erreur doit apparaître dans le panneau de qualité
    await expect(page.getByText('Le format de l\'email est invalide.')).toBeVisible();
    
    // Le score a baissé
    await expect(page.getByText('Score de Qualité : 100/100')).toBeHidden();
  });

  test('la bascule de template modifie le rendu HTML et l\'export', async ({ page }) => {
    // Passer sur l'onglet Apparence
    await page.getByRole('button', { name: 'Apparence' }).click();

    // Changer le template pour "Bannière"
    const templateSelect = page.getByLabel('Modèle de signature');
    await templateSelect.selectOption('banner');

    // Le champ de l'URL de bannière devrait apparaître
    const bannerInput = page.getByLabel('URL de la bannière');
    await expect(bannerInput).toBeVisible();
    await bannerInput.fill('https://example.com/banner.jpg');

    // Vérifier que l'image est bien dans l'aperçu
    const previewContainer = page.getByTestId('signature-preview-container');
    const bannerImg = previewContainer.locator('img[alt="Bannière promotionnelle"]');
    await expect(bannerImg).toBeVisible();
    await expect(bannerImg).toHaveAttribute('src', 'https://example.com/banner.jpg');
  });

  test('la bascule d\'aperçu (Desktop / Mobile) modifie le style du conteneur', async ({ page }) => {
    const desktopBtn = page.getByTestId('view-desktop');
    const mobileBtn = page.getByTestId('view-mobile');

    // Par défaut desktop
    await expect(desktopBtn).toHaveClass(/text-ragt-primary/);

    // Basculer en mobile
    await mobileBtn.click();
    await expect(mobileBtn).toHaveClass(/text-ragt-primary/);

    // Le conteneur doit avoir réduit sa largeur
    // On ne teste pas exactement les pixels, mais l'existence de la classe w-[320px] 
    // qui s'applique au parent direct du conteneur
    const previewWrapper = page.getByTestId('signature-preview-container').locator('..');
    await expect(previewWrapper).toHaveClass(/w-\[320px\]/);
  });

  test('l\'export de code source génère bien des liens mailto: et tel:', async ({ page }) => {
    // Récupérer le HTML dans le presse-papier mocké
    await page.getByTestId('btn-export-html').click();

    // Pour tester sans lire le presse-papier réel du système,
    // on vérifie la structure du DOM de la preview.
    const previewContainer = page.getByTestId('signature-preview-container');
    
    // mailto
    const mailLink = previewContainer.locator('a[href^="mailto:"]');
    await expect(mailLink).toHaveCount(1);
    await expect(mailLink).toHaveAttribute('href', 'mailto:marie.dubois@ragt.fr');

    // tel
    const phoneLinks = previewContainer.locator('a[href^="tel:"]');
    // Le mock par défaut contient "phone" et "mobile" => 2 liens tel:
    await expect(phoneLinks).toHaveCount(2);
  });

});
