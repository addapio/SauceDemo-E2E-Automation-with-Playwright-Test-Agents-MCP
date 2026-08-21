import { expect, Locator, Page } from '@playwright/test';
import { CheckoutInformationPage } from './CheckoutInformationPage';
import { ProductsPage } from './ProductsPage';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  constructor(readonly page: Page) {
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShopping = page.getByRole('button', { name: /Continue Shopping/i });
  }
  async expectLoaded(): Promise<void> { await expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible(); }
  async expectItem(name: string): Promise<void> { await expect(this.page.getByRole('link', { name, exact: true })).toBeVisible(); }
  async continue(): Promise<ProductsPage> { await this.continueShopping.click(); return new ProductsPage(this.page); }
  async checkout(): Promise<CheckoutInformationPage> { await this.checkoutButton.click(); return new CheckoutInformationPage(this.page); }
}
