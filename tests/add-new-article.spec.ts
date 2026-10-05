import {expect, test} from '../fixtures/baseTest'
import {step} from "../utils/helpers";
import {HomePage} from "../pages/home-page";
import {EditArticlePage} from "../pages/edit-article-page";
import {ArticleData} from "../types/types";
import {ArticlePage} from "../pages/article-page";
import {faker} from "@faker-js/faker";

const tag = faker.lorem.word();

const articleData: ArticleData = {
   title: faker.string.uuid(),
   description: faker.lorem.sentence(),
   body: faker.lorem.paragraphs(5),
   tags: [tag]
}

test('Create new article -> new article created', async({page, articleWithCleanup}) =>{
   articleWithCleanup.title = articleData.title;

   const homePage: HomePage = new HomePage(page);
   await homePage.navbar.goToNewArticlePage();

   const editArticlePage: EditArticlePage = new EditArticlePage(page);

   await editArticlePage.fillArticleForm(articleData);
   await editArticlePage.clickOnPublishArticle();

   const articlePage: ArticlePage = new ArticlePage(page);

   await step('Check url after publishing', async () =>{
      await expect(page).toHaveURL(`/article/${articleData.title}`);
   })

   await step('Check article data', async() =>{
         await expect(articlePage.articleTitle).toHaveText(articleData.title);
         await expect(articlePage.articleBody).toHaveText(articleData.body);
         await expect(articlePage.articleAuthor).toHaveText(process.env.USER);
   })
})