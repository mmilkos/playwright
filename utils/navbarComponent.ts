import {Locator, Page} from "@playwright/test";
import {step} from "./helpers";

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
        this.userProfileBtn = this.page.getByTitle('User Profile');
    }

    async goToSignInPage(){
        await step('Click on Sign In btn', async ()=>{
            await this.page.goto('');
            await this.signInBtn.click();
        })
    }

    async goToNewArticlePage(){
        await step('Click on New Article button', async ()=>{
            await this.newArticleBtn.click();
        })
    }

    async goToUserProfilePage(){
        await step('Click on username button', async() =>{
            await this.userProfileBtn.click()
        })
    }
}