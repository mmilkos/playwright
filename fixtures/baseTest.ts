import { expect } from '@playwright/test';
import {test as base} from './page-fixtures'
import {createPost, deletePost, login} from "../utils/helpers";
import {ArticleData} from "../types/types";
import {faker} from "@faker-js/faker";

type CustomFixtures = {
    token: string,
    autoGoto: void,
    articleWithCleanup: ArticleData,
    articleCreatedByApi: ArticleData
};

export const test = base.extend<CustomFixtures>({
    token: async ({ request, context }, use) => {
        const token = await login(request, context);
        await use(token);
    },

    autoGoto: [async ({ page, context, token }, use) => {
        await page.goto('/');
        await context.addInitScript((jwt) => {
            window.localStorage.setItem('jwtToken', jwt);
        }, token);

        await page.reload()
        await use();
    }, { auto: true }],

    articleWithCleanup: async ({ request, token }, use) => {
        const articleData: ArticleData = {
            title: '',
            description: '',
            body: '',
            tagList: []
        };

        await use(articleData);

        await deletePost(request, articleData.title, token);
    },

    articleCreatedByApi: async ({ request, token }, use) => {
        const tag = faker.lorem.word();

        const articleData: ArticleData = {
            title: faker.string.uuid(),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(5),
            tagList: [tag]
        };

        await createPost(request, articleData, token);
        await use(articleData);
        await deletePost(request, articleData.title, token);
    }
});

export { expect };