import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {ArticleData} from "../types/types";
import {step} from "../utils/helpers";

export class EditArticlePage extends BasePage{
    readonly title: Locator;
    readonly description: Locator;
    readonly body: Locator;
    readonly tags: Locator;
    readonly publishBtn: Locator;

    constructor(page:Page) {
        super(page);

        this.title = this.page.locator('input[name="title"]');
        this.description = this.page.locator('input[name="description"]');
        this.body = this.page.locator('textarea[name="body"]');
        this.tags = this.page.getByPlaceholder('Enter tags');
        this.publishBtn = this.page.getByRole('button', {name: 'Publish Article'})
    }

     async fillArticleForm(formData: ArticleData){
        await step('Fill article form', async () =>{
            await this.title.fill(formData.title);
            await this.description.fill(formData.description);
            await this.body.fill(formData.body);
            for (const tag of formData.tags) {
                await this.tags.fill(tag);
                await this.page.keyboard.press('Enter');
            }
        })
     }

     async clickOnPublishArticle() {
        await step('Click on publish article', async ()=>{
            await this.publishBtn.click();
        })
     }
}