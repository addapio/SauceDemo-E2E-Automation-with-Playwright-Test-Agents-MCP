import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Core E-Commerce User Operations', () => {
  test('Browse, sort, and inspect a product before adding it', async ({ page }) => {
    const login = new LoginPage(page);
    // Sign in and inspect the catalog.
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const products = new ProductsPage(page);
    await products.expectLoaded();
    await expect(products.sort).toHaveValue('az');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
    // Sort by price and open the backpack details.
    await products.sortBy('lohi');
    await expect(page.getByText('Sauce Labs Onesie', { exact: true }).first()).toBeVisible();
    const details = await products.openProduct('Sauce Labs Backpack');
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    await details.expectProduct('Sauce Labs Backpack', '$29.99');
    await details.addProduct();
    const returnedProducts = await details.back();
    await returnedProducts.expectCartCount(1);
  });
});
