import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {step} from "../utils/helpers";

export class SignInPage extends BasePage{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInBtn: Locator;


    constructor(page: Page) {
        super(page);
        this.emailInput = this.page.getByPlaceholder('Email');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.signInBtn = this.page.getByRole('button', {name: 'Sign in'})
    }

    public async signIn(){
        await step('Fill email and password and continue', async() => {
            await this.emailInput.fill(process.env.USER_EMAIL);
            await this.passwordInput.fill(process.env.USER_PASSWORD);
            await this.signInBtn.click();
        })
    }
}

