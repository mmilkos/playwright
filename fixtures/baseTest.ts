import { test as base, expect } from '@playwright/test';
import {createPost, deletePost, login} from "../utils/helpers";
import {ArticleData} from "../types/types";
import {faker} from "@faker-js/faker";

type CustomFixtures = {
    autoGoto: void,
    articleWithCleanup: ArticleData,
    articleCreatedByApi: ArticleData
};

export const test = base.extend<CustomFixtures>({
    autoGoto: [async ({ page, request, context }, use) => {
        await login(request, context);
        await page.goto('/');
        await use();
    }, { auto: true }],
    articleWithCleanup: async({request}, use) =>{
        const articleData: ArticleData = {
            title: '',
            description: '',
            body: '',
            tags: []
        }
        await use(articleData);
        await deletePost(request, articleData.title);
    },
    articleCreatedByApi: async({request},use)=>{
        const tag = faker.lorem.word();

        const articleData: ArticleData = {
            title: faker.string.uuid(),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(5),
            tags: [tag]
        }
        await createPost(request, articleData);
        await use(articleData);
        await deletePost(request, articleData.title);
    }
});

export { expect };