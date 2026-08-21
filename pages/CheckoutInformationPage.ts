import { expect, Locator, Page } from '@playwright/test';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

export class CheckoutInformationPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;

  constructor(readonly page: Page) {
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCode = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }
  async expectLoaded(): Promise<void> { await expect(this.page.getByText('Checkout: Your Information', { exact: true })).toBeVisible(); }
  async continueEmpty(): Promise<void> { await this.continueButton.click(); }
  async expectFirstNameRequired(): Promise<void> { await expect(this.page.getByText('Error: First Name is required')).toBeVisible(); }
  async fill(firstName: string, lastName: string, postalCode: string): Promise<void> { await this.firstName.fill(firstName); await this.lastName.fill(lastName); await this.postalCode.fill(postalCode); }
  async continue(): Promise<CheckoutOverviewPage> { await this.continueButton.click(); return new CheckoutOverviewPage(this.page); }
}
