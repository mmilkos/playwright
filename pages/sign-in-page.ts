import {Locator, Page} from "@playwright/test";
import {BasePage} from "@/pages/base-page";
import {step} from "@/utils/helpers";

export class SignInPage extends BasePage{

    readonly inputs: {
        readonly email: Locator;
        readonly password: Locator;
    }

    readonly buttons: {
        readonly signIn: Locator;
    }

    constructor(page: Page) {
        super(page);
        this.inputs = {
            email: this.page.getByPlaceholder('Email'),
            password: this.page.getByPlaceholder('Password'),
        }

        this.buttons = {
            signIn: this.page.getByRole('button', {name: 'Sign in'})
        }
    }

    public async signIn(){
        await step('Fill email and password and continue', async() => {
            await this.inputs.email.fill(process.env.USER_EMAIL!);
            await this.inputs.password.fill(process.env.USER_PASSWORD!);
            await this.buttons.signIn.click();
        })
    }
}

