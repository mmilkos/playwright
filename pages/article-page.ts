import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {step} from "../utils/helpers";

export class ArticlePage extends BasePage{
    readonly articleTitle: Locator;
    readonly articleBody: Locator;
    readonly articleAuthor: Locator;
    readonly editArticleBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.articleTitle = this.page.getByRole('heading', {level: 1});
        this.articleBody = this.page.locator('.article-content p');
        this.articleAuthor = this.page.locator('.article-meta').first().locator('a.author');
        this.editArticleBtn = this.page.getByRole('link', {name: 'Edit Article'});
    }

    async clickOnEditArticle(){
        await step('Click on edit article', async () =>{
            await this.editArticleBtn.click();
        })
    }
}