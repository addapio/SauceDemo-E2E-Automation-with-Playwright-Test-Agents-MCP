import { expect, Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class ProductsPage {
  readonly sort: Locator;
  readonly cartLink: Locator;

  constructor(readonly page: Page) {
    this.sort = page.getByRole('combobox');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }
  async expectLoaded(): Promise<void> { await expect(this.page.getByText('Products', { exact: true })).toBeVisible(); }
  async sortBy(value: 'lohi' | 'az' | 'za' | 'hilo'): Promise<void> { await this.sort.selectOption(value); }
  async openProduct(name: string): Promise<ProductDetailsPage> {
    const productTitle = this.page.locator('a[data-test$="-title-link"]').filter({ hasText: name });
    await productTitle.click();
    return new ProductDetailsPage(this.page);
  }
  async addBackpack(): Promise<void> { await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click(); }
  async addBikeLight(): Promise<void> { await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click(); }
  async openCart(): Promise<CartPage> { await this.cartLink.click(); return new CartPage(this.page); }
  async expectCartCount(count: number): Promise<void> { await expect(this.page.locator('.shopping_cart_badge')).toHaveText(String(count)); }
}
