import { test, expect } from '../fixtures';

test.describe('Home Page', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('[TC-01] Should render the main Hero section and legal notices in the Footer', async ({ homePage }) => {
        const hero = homePage.getHeroElements();
        const footer = homePage.getFooterElements();

        await expect(hero.title).toBeVisible();
        await expect(hero.subtitle).toBeVisible();
        await expect(hero.btnOpenAccount).toBeVisible();

        await expect(footer.legalTitle).toBeVisible();
        await expect(footer.riskWarning).toBeVisible();
        await expect(footer.auditedBy).toBeVisible();
    });

    test('[TC-02] Should display the market assets showcase and trend categories', async ({ homePage, page }) => {
        const market = homePage.getMarketDataElements();

        await page.keyboard.press('PageDown');
        await page.waitForTimeout(500);
        await page.keyboard.press('PageDown');
        await page.waitForTimeout(500);

        await market.sectionTitle.scrollIntoViewIfNeeded();

        await expect(market.sectionTitle).toBeVisible();
        await expect(market.topGainers).toBeVisible();
        await expect(market.trending).toBeVisible();
        await expect(market.topLosers).toBeVisible();
    });

    test('[TC-03] Should contain correct links to Authentication routes (Sign In and Sign Up)', async ({ homePage }) => {

        await expect(homePage.btnSignIn).toHaveAttribute('href', /.*login.*/i);

        const hero = homePage.getHeroElements();
        await expect(hero.btnOpenAccount).toHaveAttribute('href', /.*(?:register|signup).*/i);
    });

    test('[TC-04] The top navigation menu should correctly display options and links', async ({ homePage }) => {
        await expect(homePage.navExplore).toBeVisible();
        await expect(homePage.navFeatures).toBeVisible();
        await expect(homePage.navCompany).toBeVisible();
        await expect(homePage.navMbgToken).toBeVisible();

        await expect(homePage.navExplore).toHaveAttribute('href', /.+/);
        await expect(homePage.navCompany).toHaveAttribute('href', /.+/);
    });

    test('[TC-05] Should display the app download button in the footer', async ({ homePage }) => {
        await expect(homePage.btnDownloadAppFooter).toBeVisible();
        await expect(homePage.btnDownloadAppFooter).toHaveAttribute('href', /.+/);
    });

});