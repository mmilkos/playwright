import {expect} from "@playwright/test";
import {step} from "../utils/helpers";
import {test} from '../fixtures/page-fixtures'

test('Login with valid credentials -> successful login', async ({ homePage, signInPage })=>{
    await homePage.navbar.goToSignInPage();
    await signInPage.signIn();

    await step('Verify new article button visibility', async ()=> await expect(homePage.navbar.newArticleBtn).toBeVisible());
    await step('Verify settings button visibility', async ()=> await expect(homePage.navbar.settingsBtn).toBeVisible());
    await step('Verify sign in button is not visible', async () => await expect(homePage.navbar.signInBtn).not.toBeVisible());
    await step('Verify sign up button is not visible', async () => await expect(homePage.navbar.signUpBtn).not.toBeVisible());
})