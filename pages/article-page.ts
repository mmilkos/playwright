import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {step} from "../utils/helpers";

export class ArticlePage extends BasePage{
    readonly article: {
        readonly title: Locator;
        readonly body: Locator;
        readonly author: Locator;
    }

    readonly buttons: {
        readonly editArticle: Locator;
    }

    constructor(page: Page) {
        super(page);
        this.article = {
            title:this.page.getByRole('heading', {level: 1}),
            body: this.page.locator('.article-content p'),
            author: this.page.locator('.article-meta').first().locator('a.author')
        }
        this.buttons = {
            editArticle: this.page.getByRole('link', {name: 'Edit Article'}).first(),
        }
    }

    async clickOnEditArticle(){
        await step('Click on edit article', async () =>{
            await this.buttons.editArticle.click()
            const saveResponsePromise =  this.waitForResponse('GET','api/articles');
            await saveResponsePromise;
        })
    }
}