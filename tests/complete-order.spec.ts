import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Core E-Commerce User Operations', () => {
  test('Review totals and complete an order', async ({ page }) => {
    const login = new LoginPage(page);
    // Build the two-item order and complete customer information.
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const products = new ProductsPage(page);
    await products.addBackpack();
    await products.addBikeLight();
    const checkout = await (await products.openCart()).checkout();
    await checkout.fill('Ada', 'Lovelace', '12345');
    const overview = await checkout.continue();
    await overview.expectLoaded();
    // Review payment, shipping, and totals before placing the order.
    await expect(page.getByText('SauceCard #31337', { exact: true })).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!', { exact: true })).toBeVisible();
    await overview.expectTotals('$39.98', '$3.20', '$43.18');
    const complete = await overview.finish();
    await complete.expectLoaded();
    await expect(complete.backHome).toBeVisible();
    const home = await complete.goHome();
    await home.expectLoaded();
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});
