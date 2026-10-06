import { Page } from "@playwright/test";
import {NavbarComponent} from "../utils/navbarComponent";

export abstract class BasePage{
    readonly page: Page;
    readonly navbar: NavbarComponent;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavbarComponent(page);
    }

    async waitForResponse(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, code: number = 200){
       return  await this.page.waitForResponse((response) => response.url().includes(url) && response.status() == code &&
            response.request().method() === method)
    }
}