import { expect, Locator, Page } from '@playwright/test';
import { ProductsPage } from './ProductsPage';

export class ProductDetailsPage {
  readonly addToCart: Locator;
  readonly backToProducts: Locator;

  constructor(readonly page: Page) {
    this.addToCart = page.getByRole('button', { name: 'Add to cart' });
    this.backToProducts = page.getByRole('button', { name: /Back to products/i });
  }
  async expectProduct(name: string, price: string): Promise<void> { await expect(this.page.getByText(name, { exact: true })).toBeVisible(); await expect(this.page.getByText(price, { exact: true })).toBeVisible(); }
  async addProduct(): Promise<void> { await this.addToCart.click(); }
  async back(): Promise<ProductsPage> { await this.backToProducts.click(); return new ProductsPage(this.page); }
}
