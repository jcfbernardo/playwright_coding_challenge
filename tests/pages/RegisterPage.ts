import { BasePage } from './base/BasePage';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {

  private readonly emailInput = this.page.getByLabel(/Email address/i);
  private readonly passwordInput = this.page.getByLabel(/Password/i);

  private readonly termsCheckbox = this.page.getByRole('switch', {
    name: /I certify that I am 18 years of age/i,
  });
  private readonly nextBtn = this.page.getByRole('button', { name: 'Next' });
  private readonly logInLink = this.page.getByRole('link', { name: 'Log In' });

  private readonly togglePassBtn = this.page.locator('form').getByRole('img').first();
  private readonly captchaText = this.page.getByText('Slide to complete the puzzle');

  async open(): Promise<this> {
    await this.goto('/register');
    await this.waitForLoad();
    return this;
  }

  async fillForm(email: string, pass: string): Promise<void> {
    if (email !== null) await this.emailInput.fill(email);
    if (pass !== null) await this.passwordInput.fill(pass);

    await this.passwordInput.blur();
  }

  async checkTerms(accept: boolean): Promise<void> {
    if (accept) {
      await this.termsCheckbox.check();
    } else {
      await this.termsCheckbox.uncheck();
    }
  }

  async clickNext(): Promise<void> {
    await this.nextBtn.click();
  }

  async pressEnterOnForm(): Promise<void> {
    await this.passwordInput.press('Enter');
  }

  async clickLogIn(): Promise<void> {
    await this.logInLink.click();
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.togglePassBtn.click();
  }

  async getPasswordInputType(): Promise<string | null> {
    return this.passwordInput.getAttribute('type');
  }

  async getCaptchaElement(): Promise<Locator> {
    return this.captchaText;
  }

  getNextButton(): Locator {
    return this.nextBtn;
  }

  getEmailFieldError(errorText: string): Locator {
    return this.emailInput.locator('../..').getByText(errorText, { exact: true });
  }

  getPasswordFieldError(errorText: string): Locator {
    return this.passwordInput.locator('../..').getByText(errorText, { exact: true });
  }

  getPasswordStrengthIndicator(strength: string): Locator {
    return this.page.locator('div').filter({ hasText: new RegExp(`^${strength}$`) }).first();
  }
}