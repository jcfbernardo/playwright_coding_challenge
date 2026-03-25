import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { WhyMultiBankPage } from '../pages/WhyMultiBankPage'

type Pages = {
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  whyMultiBankPage: WhyMultiBankPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  whyMultiBankPage: async ({ page }, use) => {
    await use(new WhyMultiBankPage(page));
  },
});

export { expect } from '@playwright/test';