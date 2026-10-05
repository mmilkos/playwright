import {expect, test} from "../fixtures/baseTest";
import {HomePage} from "../pages/home-page";
import {UserProfilePage} from "../pages/user-profile-page";
import {step} from "../utils/helpers";
import {ArticlePage} from "../pages/article-page";
import {ArticleData} from "../types/types";
import {faker} from "@faker-js/faker";
import {EditArticlePage} from "../pages/edit-article-page";

const articleData: ArticleData = {
    title: faker.string.uuid(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(5),
    tags: []
}

test('Edit new article -> article has new data', async({page, articleCreatedByApi})=>{
    const homePage: HomePage = new HomePage(page);
    const userProfilePage: UserProfilePage = new UserProfilePage(page);
    const articlePage: ArticlePage = new ArticlePage(page);
    const editArticlePage: EditArticlePage = new EditArticlePage(page);

    await homePage.navbar.goToUserProfilePage();

    await step('Check if article was created', async () =>{
        await expect(userProfilePage.articles.filter({hasText: articleCreatedByApi.title})).toBeVisible();
        await expect(userProfilePage.articles.filter({hasText: articleCreatedByApi.title})).toHaveCount(1);
    })

    await userProfilePage.clickOnArticleWithGivenTitle(articleCreatedByApi.title);
    await articlePage.clickOnEditArticle()

    await editArticlePage.fillArticleForm(articleData);

    await editArticlePage.clickOnPublishArticle();

    await step('Check article data', async() =>{
        await expect(articlePage.articleTitle).toHaveText(articleData.title);
        await expect(articlePage.articleBody).toHaveText(articleData.body);
        await expect(articlePage.articleAuthor).toHaveText(process.env.USER);
    })
})