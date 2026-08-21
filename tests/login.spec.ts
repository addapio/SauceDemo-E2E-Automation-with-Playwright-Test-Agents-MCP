import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Core E-Commerce User Operations', () => {
  test('Sign in with valid credentials and reject invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    // Start from a fresh browser context at the login page.
    await login.goto();
    await expect(login.loginButton).toBeVisible();
    // Reject invalid credentials, then retry with the documented standard account.
    await login.login('invalid_user', 'invalid_password');
    await expect(login.errorMessage).toContainText('Username and password do not match');
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html$/);
    await new ProductsPage(page).expectLoaded();
  });
});
