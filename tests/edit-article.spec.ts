import {expect, test} from "../fixtures/baseTest";
import {step} from "../utils/helpers";
import {ArticleData} from "../types/types";
import {faker} from "@faker-js/faker";

const articleData: ArticleData = {
    title: faker.string.uuid(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(5),
    tagList: []
}

test('Edit new article -> article has new data', async({homePage, userProfilePage, articlePage, editArticlePage, articleCreatedByApi})=>{
    await homePage.navbar.goToUserProfilePage();

    await step('Check if article was created', async () =>{
        await expect(userProfilePage.articles.filter({hasText: articleCreatedByApi.title})).toHaveCount(1);
    })

    await userProfilePage.clickOnArticleWithGivenTitle(articleCreatedByApi.title);
    await articlePage.clickOnEditArticle()

    await editArticlePage.fillArticleForm(articleData);

    await editArticlePage.clickOnPublishArticle();

    await step('Check article data', async() =>{
        await expect(articlePage.article.title).toHaveText(articleData.title);
        await expect(articlePage.article.body).toHaveText(articleData.body);
        await expect(articlePage.article.author).toHaveText(process.env.USER);
    })

    articleCreatedByApi.title = articleData.title;
})