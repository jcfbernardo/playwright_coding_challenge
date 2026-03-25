import { test, expect } from '../fixtures';
import { tc01Scenarios, tc03Scenarios } from '../data/registerData';


test.describe('Registration - Register Page', () => {

  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
  });

  test('[TC-04] Should navigate to the Login screen when clicking "Log In"', async ({ registerPage, page }) => {
    await registerPage.clickLogIn();
    await expect(page).toHaveURL(/.*login/i);
  });

  test.describe('[TC-01] Boundary, Format and Required Fields Validation', () => {
    for (const data of tc01Scenarios) {
      test(`Scenario: ${data.id}`, async ({ registerPage, page }) => {

        await registerPage.fillForm(data.email, data.pass);
        await registerPage.checkTerms(data.acceptTerms);

        const nextBtn = registerPage.getNextButton();

        if (data.expectDisabled) {
          await expect(nextBtn).toBeDisabled();

          if (data.expectedEmailError) {
            const emailErrorLocator = registerPage.getEmailFieldError(data.expectedEmailError);
            await expect(emailErrorLocator).toBeVisible();
          }

          if (data.expectedPassError) {
            const passErrorLocator = registerPage.getPasswordFieldError(data.expectedPassError);
            await expect(passErrorLocator).toBeVisible();
          }

          if (data.expectedStrength) {
            const strengthLocator = registerPage.getPasswordStrengthIndicator(data.expectedStrength);
            await expect(strengthLocator).toBeVisible();
          }

        } else {
          await expect(nextBtn).toBeEnabled();
          await registerPage.clickNext();

          const captchaText = page.getByText(/Slide to complete the puzzle/i);
          await expect(captchaText).toBeVisible({ timeout: 10_000 });
        }
      });
    }
  });

  test.describe('[TC-03] UI Interaction, Devices and Submission', () => {
    test.describe.configure({ mode: 'serial' });

    for (const data of tc03Scenarios) {
      test(`Combination: ${data.id}`, async ({ registerPage, page }) => {

        await registerPage.fillForm('jane.doe@multibank.io', 'Q@Testes2026!');
        await registerPage.checkTerms(true);

        if (data.toggle) {
          await registerPage.togglePasswordVisibility();
        }

        const inputType = await registerPage.getPasswordInputType();
        expect(inputType).toBe(data.expectType);

        if (data.method === 'click') {
          await registerPage.clickNext();
        } else if (data.method === 'enter') {
          await registerPage.pressEnterOnForm();
        }

        const captcha = await registerPage.getCaptchaElement();
        await expect(captcha).toBeVisible({ timeout: 10_000 });
      });
    }
  });

});