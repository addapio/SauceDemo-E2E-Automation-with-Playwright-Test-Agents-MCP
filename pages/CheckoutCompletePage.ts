import { expect, Locator, Page } from '@playwright/test';
import { ProductsPage } from './ProductsPage';

export class CheckoutCompletePage {
  readonly backHome: Locator;
  constructor(readonly page: Page) { this.backHome = page.getByRole('button', { name: 'Back Home' }); }
  async expectLoaded(): Promise<void> { await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible(); }
  async goHome(): Promise<ProductsPage> { await this.backHome.click(); return new ProductsPage(this.page); }
}
