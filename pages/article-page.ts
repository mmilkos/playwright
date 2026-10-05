import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class ArticlePage extends BasePage{
    readonly articleTitle: Locator;
    readonly articleDesc: Locator;
    readonly articleAuthor: Locator;

    constructor(page: Page) {
        super(page);
        this.articleTitle = this.page.getByRole('heading', {level: 1});
        this.articleDesc = this.page.locator('.article-content p');
        this.articleAuthor = this.page.locator('.article-meta').first().locator('a.author');
    }
}