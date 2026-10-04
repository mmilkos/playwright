import { Page } from "@playwright/test";
import {NavbarComponent} from "../utils/navbarComponent";

export abstract class BasePage{
    readonly page: Page;
    readonly navbar: NavbarComponent;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavbarComponent(page);
    }
}