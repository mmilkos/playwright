import {expect, test} from '../fixtures/baseTest'
import {deletePost, generateUniqueString, step} from "../utils/helpers";
import {HomePage} from "../pages/home-page";
import {NewArticlePage} from "../pages/new-article-page";
import {ArticleData} from "../types/types";
import {ArticlePage} from "../pages/article-page";

const tag = generateUniqueString();

const articleData: ArticleData = {
   title: generateUniqueString('title'),
   description: generateUniqueString('description'),
   body: generateUniqueString('body'),
   tags: [tag]
}

test('Create new article -> new article created', async({page}) =>{
   const homePage: HomePage = new HomePage(page);
   await homePage.navbar.goToNewArticlePage();

   const newArticlePage: NewArticlePage = new NewArticlePage(page);

   await newArticlePage.fillNewArticleForm(articleData);
   await newArticlePage.clickOnPublishArticle();

   const articlePage: ArticlePage = new ArticlePage(page);

   await step('Check url after publishing', async () =>{
      await expect(page).toHaveURL(`/article/${articleData.title}`);
   })

   await step('Check article data', async() =>{
         await expect(articlePage.articleTitle).toHaveText(articleData.title);
         await expect(articlePage.articleDesc).toHaveText(articleData.body);
         await expect(articlePage.articleAuthor).toHaveText(process.env.USER);
   })
})

test.afterEach(async({request})=>{
   await deletePost(request, articleData.title)
})