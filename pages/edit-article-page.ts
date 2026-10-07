import {BasePage} from "@/pages/base-page";
import {Locator, Page} from "@playwright/test";
import {ArticleData} from "@/types/types";
import {step} from "@/utils/helpers";

export class EditArticlePage extends BasePage{
    readonly article: {
        readonly title: Locator;
        readonly description: Locator;
        readonly body: Locator;
        readonly tags: Locator;
    }

    readonly buttons: {
        readonly publish: Locator;
    }

    constructor(page:Page) {
        super(page);
        this.article = {
            title:  this.page.locator('input[name="title"]'),
            description: this.page.locator('input[name="description"]'),
            body: this.page.locator('textarea[name="body"]'),
            tags: this.page.getByPlaceholder('Enter tags'),
        }

        this.buttons = {
            publish: this.page.getByRole('button', {name: 'Publish Article'}),
        }
    }

     async fillArticleForm(formData: ArticleData){
        await step('Fill article form', async () =>{
            await this.article.title.fill(formData.title);
            await this.article.description.fill(formData.description);
            await this.article.body.fill(formData.body);
            for (const tag of formData.tagList) {
                await this.article.tags.fill(tag);
                await this.page.keyboard.press('Enter');
            }
        })
     }

     async clickOnPublishArticle() {
        await step('Click on publish article', async ()=>{
            await this.buttons.publish.click();
        })
     }
}