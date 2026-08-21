import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Core E-Commerce User Operations', () => {
  test('Add multiple products and verify the cart contents', async ({ page }) => {
    const login = new LoginPage(page);
    // Sign in, add two products, and inspect the cart.
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    const products = new ProductsPage(page);
    await products.expectLoaded();
    await products.addBackpack();
    await products.addBikeLight();
    await products.expectCartCount(2);
    const cart = await products.openCart();
    await cart.expectLoaded();
    await cart.expectItem('Sauce Labs Backpack');
    await cart.expectItem('Sauce Labs Bike Light');
    await expect(cart.continueShopping).toBeVisible();
    await expect(cart.checkoutButton).toBeVisible();
    // Return to products and confirm the cart persists.
    const returnedProducts = await cart.continue();
    const reopenedCart = await returnedProducts.openCart();
    await reopenedCart.expectItem('Sauce Labs Backpack');
    await reopenedCart.expectItem('Sauce Labs Bike Light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});
