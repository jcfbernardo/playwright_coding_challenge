import { BasePage } from './base/BasePage';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly logoLink = this.page.getByRole('link', { name: /logo/i });
  private readonly signUpBtn = this.page.getByRole('button', { name: 'Sign up' });
  private readonly forgotPasswordLink = this.page.getByRole('link', { name: 'Forgot Password?' });

  private readonly emailInput = this.page.getByLabel('Email address*');
  private readonly passwordInput = this.page.getByLabel('Password*');
  private readonly loginSubmitBtn = this.page.getByRole('button', { name: /Log in/i });

  private readonly mainHeading = this.page.getByRole('heading', { name: 'This is crypto for everyone' });
  private readonly subText = this.page.getByText('Trade with low fees on a platform you can trust.');
  private readonly noAccountText = this.page.getByText("Don't have an account?");
  private readonly errorMessage = this.page.getByText('Invalid email or password. Please try again.');
  private readonly captchaText = this.page.getByText('Slide to complete the puzzle');

  private readonly eyeIcon = this.page.locator('form').getByRole('img').first();

  async open(): Promise<this> {
    await this.goto('/login');
    await this.waitForLoad();
    return this;
  }

  async fillCredentials(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.passwordInput.blur();
  }

  async clickLogin(): Promise<void> {
    await this.loginSubmitBtn.click();
  }

  getLoginButton(): Locator {
    return this.loginSubmitBtn;
  }

  async submitLogin(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitBtn.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  getSignUpLink(): Locator {
    return this.page.getByRole('link', { name: /sign up/i }).first();
  }

  async clickSignUp(): Promise<void> {
    await this.signUpBtn.click();
  }
  async getErrorMessage(): Promise<Locator> {
    return this.errorMessage;
  }

  async getCaptchaElement(): Promise<Locator> {
    return this.captchaText;
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.eyeIcon.click();
  }

  async getPasswordInputType(): Promise<string | null> {
    return this.passwordInput.getAttribute('type');
  }

  getEmailFieldError(errorText: string): Locator {
    return this.emailInput.locator('../..').getByText(errorText, { exact: true });
  }

  getPasswordFieldError(errorText: string): Locator {
    return this.passwordInput.locator('../..').getByText(errorText, { exact: true });
  }

  async getUIElements(): Promise<{
    heading: Locator;
    subText: Locator;
    noAccountText: Locator;
    logo: Locator;
  }> {
    return {
      heading: this.mainHeading,
      subText: this.subText,
      noAccountText: this.noAccountText,
      logo: this.logoLink
    };
  }
}