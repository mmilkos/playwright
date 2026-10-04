import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/login-page";

test('Logowanie', async ({ page })=>{
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.login();
    await expect(loginPage.userProfileBtn).toBeVisible();
})