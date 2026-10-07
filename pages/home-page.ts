import {BasePage} from "@/pages/base-page";
import {Page} from "@playwright/test";

export class HomePage extends BasePage{

    constructor(page: Page) {
        super(page);
    }
}