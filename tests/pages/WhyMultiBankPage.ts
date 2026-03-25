import { BasePage } from './base/BasePage';

export class WhyMultiBankPage extends BasePage {

    readonly whyMultibankTitle = this.page.getByRole('heading', { name: 'Why MultiBank Group?' });
    readonly whyMultibankIntro = this.page.getByText(/For nearly two decades, MultiBank has built a reputation/i);

    readonly statAnnualTurnover = this.page.getByText(/\$2 trillion[\s\S]*Annual turnover/i);
    readonly statCustomersWorldwide = this.page.getByText(/2,000,000\+[\s\S]*Customers worldwide/i);
    readonly statOfficesGlobally = this.page.getByText(/25\+[\s\S]*Offices globally/i);

    readonly sectionGlobalLeadershipTitle = this.page.getByRole('heading', { name: 'A tradition of global leadership' });
    readonly sectionGlobalLeadershipText = this.page.getByText(/Founded in 2005, MultiBank has grown into one of the largest/i);

    readonly sectionInnovationTitle = this.page.getByRole('heading', { name: 'Innovation with purpose' });
    readonly sectionInnovationText = this.page.getByText(/We believe technology should simplify finance/i);

    readonly sectionIntegrityTitle = this.page.getByRole('heading', { name: 'Integrity built into every decision' });
    readonly sectionIntegrityText = this.page.getByText(/Trust is earned through consistent action/i);

    readonly strengthTitle = this.page.getByRole('heading', { name: 'The strength behind MultiBank Group' });
    readonly linkGetInTouch = this.page.getByRole('link', { name: 'Get in touch' });

    readonly cardRegulationTitle = this.page.getByText(/Regulation at our core/i);
    readonly cardRegulationText = this.page.getByText(/MultiBank operates under strict global oversight/i);

    readonly cardTrackRecordTitle = this.page.getByText(/Proven track record/i);
    readonly cardTrackRecordText = this.page.getByText(/With years of global experience, we've remained resilient/i);

    readonly cardSecureTrustedTitle = this.page.getByText(/Secure & trusted/i);
    readonly cardSecureTrustedText = this.page.getByText(/Institution-grade infrastructure and strong risk controls/i);

    readonly communityTitle = this.page.getByRole('heading', { name: 'Community & Media' });
    readonly communitySubtitle = this.page.getByText('The latest news and discussions about MultiBank Group.');

    async open(): Promise<this> {
        await this.goto('https://mb.io/en/company');

        await this.waitForLoad();

        return this;
    }

    getHeroAndMetrics() {
        return {
            title: this.whyMultibankTitle,
            intro: this.whyMultibankIntro,
            turnover: this.statAnnualTurnover,
            customers: this.statCustomersWorldwide,
            offices: this.statOfficesGlobally
        };
    }

    getCoreValues() {
        return {
            leadershipTitle: this.sectionGlobalLeadershipTitle,
            leadershipText: this.sectionGlobalLeadershipText,
            innovationTitle: this.sectionInnovationTitle,
            innovationText: this.sectionInnovationText,
            integrityTitle: this.sectionIntegrityTitle,
            integrityText: this.sectionIntegrityText
        };
    }

    getStrengthBlocks() {
        return {
            title: this.strengthTitle,
            regTitle: this.cardRegulationTitle,
            regText: this.cardRegulationText,
            trackTitle: this.cardTrackRecordTitle,
            trackText: this.cardTrackRecordText,
            secureTitle: this.cardSecureTrustedTitle,
            secureText: this.cardSecureTrustedText,
            getInTouch: this.linkGetInTouch
        };
    }
}