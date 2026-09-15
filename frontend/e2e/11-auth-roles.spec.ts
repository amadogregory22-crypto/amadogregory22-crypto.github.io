import { test, expect } from '@playwright/test';

test.describe('Scénario 11 : Authentification & Rôles', () => {
  test('Affiche le sélecteur de personas puis masque le menu Admin pour le rôle USER', async ({ page }) => {
    // 1. Accès à l'app sans cookie
    await page.goto('/');

    // 2. Le PersonaSelector doit s'afficher
    await expect(page.getByText('Choisissez un profil de test')).toBeVisible();

    // 3. Connexion en tant que Clara Bernard (USER)
    await page.getByRole('button', { name: /Clara Bernard/i }).click();

    // 4. Redirection / Affichage de l'app principale
    await expect(page.getByText('RAGT Communication Studio')).toBeVisible();
    await expect(page.getByText('Clara Bernard')).toBeVisible();

    // 5. Vérifier que le menu Administration est absent (car elle est USER)
    const adminLink = page.getByTestId('nav-admin');
    await expect(adminLink).toBeHidden();

    // 6. Déconnexion
    await page.getByRole('button', { name: /Se déconnecter/i }).click();
    
    // 7. Retour au PersonaSelector
    await expect(page.getByText('Choisissez un profil de test')).toBeVisible();
  });

  test('Affiche le menu Admin pour le rôle ADMIN_DSI', async ({ page }) => {
    await page.goto('/');
    
    // Connexion en tant que Marie Dubois (ADMIN_DSI)
    await page.getByRole('button', { name: /Marie Dubois/i }).click();

    // Vérifier que le menu Administration est PRÉSENT
    const adminLink = page.getByTestId('nav-admin');
    await expect(adminLink).toBeVisible();
  });
});
