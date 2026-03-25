import { test, expect } from '../fixtures';
import { tc01Scenarios, tc03Scenarios } from '../data/forgotPasswordData';


test.describe('Password Recovery - Forgot Password Page', () => {

    test.beforeEach(async ({ forgotPasswordPage }) => {
        await forgotPasswordPage.open();
    });

    test('[TC-04] Should redirect to Login screen when clicking the Back button', async ({ forgotPasswordPage, page }) => {
        await forgotPasswordPage.clickBack();

        await expect(page).toHaveURL(/.*login/i);

        const emailInput = page.getByLabel(/Email address/i);
        await expect(emailInput).toBeVisible();
    });

    test.describe('[TC-01] Boundary and Equivalence Partition Validation for Email (EP/BVA)', () => {
        test.describe.configure({ mode: 'serial' });

        for (const data of tc01Scenarios) {
            test(`Scenario: ${data.id}`, async ({ forgotPasswordPage, page }) => {

                if (data.knownBug) {
                    test.fail(true, 'Front-End BUG: Max length validation fails in UI.');
                }

                await forgotPasswordPage.fillEmail(data.email);

                const continueBtn = forgotPasswordPage.getContinueButton();

                if (data.expectDisabled) {
                    await expect(continueBtn).toBeDisabled();

                    if (data.expectedError) {
                        const errorLocator = forgotPasswordPage.getEmailFieldError(data.expectedError);
                        await expect(errorLocator).toBeVisible();
                    }

                } else {
                    await expect(continueBtn).toBeEnabled();
                }
            });
        }
    });

    test.describe('[TC-03] Device Interaction and Submission Methods', () => {
        test.describe.configure({ mode: 'serial' });

        for (const data of tc03Scenarios) {
            test(`Scenario: ${data.id}`, async ({ forgotPasswordPage, page }) => {

                await forgotPasswordPage.fillEmail('qa_automation@multibank.io');

                await expect(forgotPasswordPage.getContinueButton()).toBeEnabled();

                if (data.method === 'click') {
                    await forgotPasswordPage.clickContinue();
                } else if (data.method === 'enter') {
                    await forgotPasswordPage.pressEnterOnEmail();
                }

                const captcha = await forgotPasswordPage.getCaptchaElement();
                await expect(captcha).toBeVisible({ timeout: 10_000 });
            });
        }
    });

});