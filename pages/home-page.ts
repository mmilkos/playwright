import {BasePage} from "./base-page";
import {Page} from "@playwright/test";
import {step} from "../utils/helpers";

export class HomePage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    public async goToLoginPage(){
        await step('Click on Sign In btn', async ()=>{
            await this.page.goto('');
            await this.navbar.signInBtn.click();
        })
    }
}