import { test, expect } from '../fixtures';
import { tc01Scenarios, tc03Scenarios } from '../data/loginData';


test.describe('Authentication - Login Page', () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('[TC-02] Should render textual and visual elements correctly', async ({ loginPage }) => {
    const { heading, logo } = await loginPage.getUIElements();
    await expect(heading).toBeVisible();
    await expect(logo).toBeVisible();
  });

  test('[TC-04] Should navigate to support screens via auxiliary links',
    async ({ loginPage, forgotPasswordPage, registerPage, page }) => {
      await loginPage.clickForgotPassword();
      await expect(page).toHaveURL(/.*forgot-password/i);

      await forgotPasswordPage.clickBack();
      await expect(page).toHaveURL(/.*login/i);

      await loginPage.clickSignUp();
      await expect(page).toHaveURL(/.*register|signup/i);

      await registerPage.clickLogIn();
      await expect(page).toHaveURL(/.*login/i);
    });

  test.describe('[TC-01] Boundary and Equivalence Partition Validation (EP/BVA)', () => {
    for (const data of tc01Scenarios) {
      test(`Scenario: ${data.id}`, async ({ loginPage }) => {

        await loginPage.fillCredentials(data.email, data.pass);

        const loginBtn = loginPage.getLoginButton();

        if (data.expectError) {

          await expect(loginBtn).toBeDisabled();

          if (data.expectedEmailError) {
            const emailErrorLocator = loginPage.getEmailFieldError(data.expectedEmailError);
            await expect(emailErrorLocator).toBeVisible();
          }

          if (data.expectedPassError) {
            const passErrorLocator = loginPage.getPasswordFieldError(data.expectedPassError);
            await expect(passErrorLocator).toBeVisible();
          }

        } else {
          await expect(loginBtn).toBeEnabled();
          await loginPage.clickLogin();

          const captcha = await loginPage.getCaptchaElement();
          await expect(captcha).toBeVisible({ timeout: 10_000 });
        }
      });
    }
  });

  test.describe('[TC-03] User Type Combinations and UI Interaction (Password Eye)', () => {
    test.describe.configure({ mode: 'serial' });

    for (const data of tc03Scenarios) {
      test(`Combination: ${data.id}`, async ({ loginPage, page }) => {

        // 1. Fill credentials (without submitting)
        await loginPage.fillCredentials(data.email, data.pass);

        // 2. Toggle password visibility
        if (data.clickEye) {
          await loginPage.togglePasswordVisibility();
        }

        // 3. UI check
        const inputType = await loginPage.getPasswordInputType();
        expect(inputType).toBe(data.expectedType);

        // 4. Submit using existing method
        await loginPage.clickLogin();

        // 5. Security check (Puzzle)
        const captcha = await loginPage.getCaptchaElement();
        await expect(captcha).toBeVisible({ timeout: 10000 });
      });
    }
  });

});