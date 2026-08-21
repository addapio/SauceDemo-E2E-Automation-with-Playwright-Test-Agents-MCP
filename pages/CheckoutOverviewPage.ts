import { expect, Locator, Page } from '@playwright/test';
import { CheckoutCompletePage } from './CheckoutCompletePage';

export class CheckoutOverviewPage {
  readonly finishButton: Locator;
  constructor(readonly page: Page) { this.finishButton = page.getByRole('button', { name: 'Finish' }); }
  async expectLoaded(): Promise<void> { await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible(); }
  async expectTotals(itemTotal: string, tax: string, total: string): Promise<void> { await expect(this.page.getByText(`Item total: ${itemTotal}`, { exact: true })).toBeVisible(); await expect(this.page.getByText(`Tax: ${tax}`, { exact: true })).toBeVisible(); await expect(this.page.getByText(`Total: ${total}`, { exact: true })).toBeVisible(); }
  async finish(): Promise<CheckoutCompletePage> { await this.finishButton.click(); return new CheckoutCompletePage(this.page); }
}
