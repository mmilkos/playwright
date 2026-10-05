import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {step} from "../utils/helpers";

export class UserProfilePage extends BasePage{
    readonly articles: Locator;

    constructor(page: Page) {
        super(page);
        this.articles = page.locator('.article-preview');
    }

    async clickOnArticleWithGivenTitle(title: string){
        await step(`Click on article titled ${title}`, async () =>{
            const article = this.articles.getByText(title);
            await article.click();
        })
    }
}