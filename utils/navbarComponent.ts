import {Locator, Page} from "@playwright/test";
import {step} from "@/utils/helpers";

export class NavbarComponent{
    readonly page: Page;
    readonly homeBtn: Locator;
    readonly signInBtn: Locator;
    readonly signUpBtn: Locator;
    readonly newArticleBtn: Locator;
    readonly settingsBtn: Locator;
    readonly userProfileBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeBtn = this.page.getByRole('link', {name: 'Home'});
        this.signInBtn = this.page.getByRole('link', {name: 'Sign in'});
        this.signUpBtn = this.page.getByRole('link', {name: 'Sign up' });
        this.newArticleBtn = this.page.getByRole('link', {name: 'New Article'});
        this.settingsBtn = this.page.getByRole('link', {name: 'Settings'});
        this.userProfileBtn = this.page.locator('.navbar').locator('a[href*="/profile/"]');
    }

    async goToSignInPage(){
        await step('Click on Sign In btn', async ()=>{
            await this.page.goto('');
            await this.signInBtn.click();
            await this.waitForUrlToMatch('login')
        })
    }

    async goToNewArticlePage(){
        await step('Click on New Article button', async ()=>{
            await this.newArticleBtn.click();
            await this.waitForUrlToMatch('editor')
        })
    }

    async goToUserProfilePage(){
        await step('Click on username button', async() =>{
            await this.userProfileBtn.click()
            await this.waitForUrlToMatch('profile')
        })
    }

    private async waitForUrlToMatch(url: string) {
        await step(`Wait for url to match ${url}`, async () =>{
            const regex = new RegExp(url);
            await this.page.waitForURL(regex);
        })
    }
}