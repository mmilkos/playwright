import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class LoginPage extends BasePage{
    readonly loginBtn: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly userProfileBtn: Locator;
    readonly signInBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.loginBtn = this.page.locator('[href="/login"]').filter({hasText: 'Sign in'});
        this.emailInput = this.page.getByPlaceholder('Email');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.userProfileBtn = this.page.getByTitle('User Profile');
        this.signInBtn = this.page.getByRole('button', {name: 'Sign in'});
    }

    public async login(){
       await this.page.goto('/');
       await this.loginBtn.click();
       await this.emailInput.fill(process.env.USER_EMAIL);
       await this.passwordInput.fill(process.env.USER_PASSWORD);
       await this.signInBtn.click();
    }
}

