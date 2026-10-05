import { test as base, expect } from '@playwright/test';
import {login} from "../utils/helpers";

type CustomFixtures = {
    autoGoto: void;
};

export const test = base.extend<CustomFixtures>({
    autoGoto: [async ({ page, request, context }, use) => {
        await login(request, context);
        await page.goto('/');
        await use();
    }, { auto: true }],
});

export { expect };