import { BasePage } from './base/BasePage';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
    readonly navHome = this.page.getByRole('link', { name: 'Home', exact: true }).first();
    readonly navExplore = this.page.getByRole('link', { name: /Explore/i }).first();
    readonly navFeatures = this.page.getByRole('link', { name: /Features/i }).first();
    readonly navCompany = this.page.getByRole('link', { name: /Company/i }).first();
    readonly navMbgToken = this.page.getByRole('link', { name: /\$MBG/i }).first();


    readonly btnSignIn = this.page.getByRole('link', { name: 'Sign in' });
    readonly btnSignUp = this.page.getByRole('link', { name: 'Sign up' });


    readonly heroTitle = this.page.getByRole('heading', { name: 'Crypto for everyone' });
    readonly heroSubtitle = this.page.getByText(/Simple, secure and speedy/i);
    readonly btnDownloadApp = this.page.getByRole('link', { name: 'Download the app' });
    readonly btnOpenAccount = this.page.getByRole('link', { name: 'Open an account' });


    readonly portfolioTitle = this.page.getByRole('heading', { name: 'Securely build your portfolio' });
    readonly linkStartPortfolio = this.page.getByRole('link', { name: 'Start Portfolio' });
    readonly cardMbgAsset = this.page.getByRole('link', { name: /MultiBank Group/i });
    readonly cardBtcAsset = this.page.getByRole('link', { name: /Bitcoin$/i });
    readonly cardEthAsset = this.page.getByRole('link', { name: /^Ethereum/i });


    readonly smartWaysTitle = this.page.getByRole('heading', { name: 'Smarter ways to trade and grow' });
    readonly linkViewFeatures = this.page.getByRole('link', { name: 'View platform features' });


    readonly nextTradeTitle = this.page.getByRole('heading', { name: 'Catch your next trade' });
    readonly linkExploreAssets = this.page.getByRole('link', { name: 'Explore all assets' });
    readonly titleTopGainers = this.page.getByRole('heading', { name: 'Top Gainers' });
    readonly titleTrending = this.page.getByRole('heading', { name: 'Trending Now' });
    readonly titleTopLosers = this.page.getByRole('heading', { name: 'Top Losers' });


    readonly footerLegalTitle = this.page.getByRole('heading', { name: 'Legal' });
    readonly linkTerms = this.page.getByRole('link', { name: 'Terms & Conditions' });
    readonly linkPrivacy = this.page.getByRole('link', { name: 'Privacy Policy' });
    readonly linkContactUs = this.page.getByRole('link', { name: 'Contact Us' });
    readonly linkAuditedBy = this.page.getByRole('link', { name: /Audited by Hacken/i });
    readonly textRiskWarning = this.page.getByText(/Risk Warning:/i);

    readonly btnDownloadAppFooter = this.page.getByRole('link', { name: /Download the app/i });


    async open(): Promise<this> {
        await this.goto('/');

        const mbLink = this.page.locator('a[href="https://mb.io/"]').first();
        await mbLink.click();

        await this.page.waitForURL(/.*mb\.io.*/);

        await this.waitForLoad();

        return this;
    }

    async clickSignIn(): Promise<void> {
        await this.btnSignIn.click();
    }

    async clickSignUp(): Promise<void> {
        await this.btnSignUp.click();
    }

    async clickExploreAssets(): Promise<void> {
        await this.linkExploreAssets.click();
    }

    getHeroElements() {
        return {
            title: this.heroTitle,
            subtitle: this.heroSubtitle,
            btnDownload: this.btnDownloadApp,
            btnOpenAccount: this.btnOpenAccount
        };
    }

    getMarketDataElements() {
        return {
            sectionTitle: this.nextTradeTitle,
            topGainers: this.titleTopGainers,
            trending: this.titleTrending,
            topLosers: this.titleTopLosers,
            btcCard: this.cardBtcAsset,
            ethCard: this.cardEthAsset
        };
    }

    getFooterElements() {
        return {
            legalTitle: this.footerLegalTitle,
            riskWarning: this.textRiskWarning,
            auditedBy: this.linkAuditedBy
        };
    }
}