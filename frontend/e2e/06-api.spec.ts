import { test, expect } from '@playwright/test';

test.describe('Scénario 7 : Test API Backend Health', () => {
  test('le backend répond correctement au ping de santé', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/health');
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    // Vérification des champs requis
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('ok');
    
    expect(body).toHaveProperty('version');
    expect(typeof body.version).toBe('string');
    
    expect(body).toHaveProperty('timestamp');
    expect(typeof body.timestamp).toBe('string');
  });
});
