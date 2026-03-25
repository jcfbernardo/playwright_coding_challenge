import { test, expect } from '../fixtures';

test.describe('Content Validation - Why MultiBank Page', () => {

    test.beforeEach(async ({ whyMultiBankPage }) => {
        await whyMultiBankPage.open();
    });

    test('[TC-01] Should render the Hero and business metrics correctly', async ({ whyMultiBankPage }) => {
        const hero = whyMultiBankPage.getHeroAndMetrics();

        await expect(hero.title).toBeVisible();
        await expect(hero.intro).toBeVisible();

        await expect(hero.turnover).toBeVisible();
        await expect(hero.customers).toBeVisible();
        await expect(hero.offices).toBeVisible();
    });

    test('[TC-02] Should display institutional text sections with the correct copy', async ({ whyMultiBankPage, page }) => {
        const core = whyMultiBankPage.getCoreValues();

        await page.keyboard.press('PageDown');
        await page.waitForTimeout(500);

        await expect(core.leadershipTitle).toBeVisible();
        await expect(core.leadershipText).toBeVisible();

        await expect(core.innovationTitle).toBeVisible();
        await expect(core.innovationText).toBeVisible();

        await expect(core.integrityTitle).toBeVisible();
        await expect(core.integrityText).toBeVisible();
    });

    test('[TC-03] Should render the Strength cards and the Community section', async ({ whyMultiBankPage, page }) => {
        const strength = whyMultiBankPage.getStrengthBlocks();

        await page.keyboard.press('PageDown');
        await page.keyboard.press('PageDown');
        await page.waitForTimeout(500);

        await expect(strength.title).toBeVisible();
        await expect(strength.regTitle).toBeVisible();
        await expect(strength.regText).toBeVisible();
        await expect(strength.trackTitle).toBeVisible();
        await expect(strength.trackText).toBeVisible();
        await expect(strength.secureTitle).toBeVisible();
        await expect(strength.secureText).toBeVisible();

        await expect(strength.getInTouch).toHaveAttribute('href', /.+/);

        await whyMultiBankPage.communityTitle.scrollIntoViewIfNeeded();
        await expect(whyMultiBankPage.communityTitle).toBeVisible();
        await expect(whyMultiBankPage.communitySubtitle).toBeVisible();
    });

});