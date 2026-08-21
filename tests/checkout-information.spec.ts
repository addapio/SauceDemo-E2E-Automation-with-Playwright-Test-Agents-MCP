import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Core E-Commerce User Operations', () => {
  test('Validate required checkout information and continue with valid details', async ({ page }) => {
    const login = new LoginPage(page);
    // Sign in, add a product, and open checkout information.
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const products = new ProductsPage(page);
    await products.addBackpack();
    const checkout = await (await products.openCart()).checkout();
    await checkout.expectLoaded();
    // Verify required-field validation before submitting valid details.
    await checkout.continueEmpty();
    await checkout.expectFirstNameRequired();
    await checkout.fill('Ada', 'Lovelace', '12345');
    const overview = await checkout.continue();
    await overview.expectLoaded();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack', exact: true })).toBeVisible();
  });
});
