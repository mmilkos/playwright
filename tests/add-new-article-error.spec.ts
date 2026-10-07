import {expect, test} from "@/fixtures/baseTest";
import {faker} from "@faker-js/faker";
import {ArticleData} from "@/types/types";
const tag = faker.lorem.word();

const articleData: ArticleData = {
    title: faker.string.uuid(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(5),
    tagList: [tag]
}

test('Create new article (network failure) -> shows connection error ', async ({page, homePage, editArticlePage}) =>{
    await page.route('**/api/articles', route => route.abort('failed'));
    await homePage.navbar.goToNewArticlePage();

    await editArticlePage.fillArticleForm(articleData);
    await editArticlePage.clickOnPublishArticle();

    await expect(editArticlePage.messages.error).toBeVisible();
})