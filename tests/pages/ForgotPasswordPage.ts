import { BasePage } from './base/BasePage';
import { Locator } from '@playwright/test';

export class ForgotPasswordPage extends BasePage {

    private readonly mainHeading = this.page.getByRole('heading', { name: 'Forgot Password' });
    private readonly instructionText = this.page.getByText('Enter the email associated with your account');
    private readonly emailLabelText = this.page.getByText('Email address*', { exact: true });

    private readonly emailInput = this.page.getByLabel('Email address*');
    private readonly backLink = this.page.getByRole('link', { name: 'Back' });
    private readonly continueBtn = this.page.getByRole('button', { name: 'Continue' });
    private readonly captchaText = this.page.getByText('Slide to complete the puzzle');

    async open(): Promise<this> {
        await this.goto('/forgot-password');
        await this.waitForLoad();
        return this;
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.emailInput.blur();
    }

    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }

    async submitRecovery(email: string): Promise<void> {
        await this.fillEmail(email);
        await this.clickContinue();
    }

    async clickBack(): Promise<void> {
        await this.backLink.click();
    }

    async pressEnterOnEmail(): Promise<void> {
        await this.emailInput.press('Enter');
    }

    async getCaptchaElement(): Promise<Locator> {
        return this.captchaText;
    }

    getEmailFieldError(errorText: string): Locator {
        return this.page.getByText(new RegExp(errorText, 'i')).first();
    }

    async getUIElements(): Promise<{
        heading: Locator;
        instruction: Locator;
        emailLabel: Locator;
    }> {
        return {
            heading: this.mainHeading,
            instruction: this.instructionText,
            emailLabel: this.emailLabelText
        };
    }

    getContinueButton(): Locator {
        return this.continueBtn;
    }
}