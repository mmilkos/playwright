import {Locator, Page} from "@playwright/test";

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
}