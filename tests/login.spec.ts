import {expect, test} from "@playwright/test";
import {SignInPage} from "../pages/sign-in-page";
import {HomePage} from "../pages/home-page";
import {step} from "../utils/helpers";

test('Login with valid credentials -> successful login', async ({ page })=>{
    const homePage: HomePage = new HomePage(page);
    const signInPage: SignInPage = new SignInPage(page);

    await homePage.navbar.goToSignInPage();
    await signInPage.signIn();

    await step('Verify new article button visibility', async ()=> await expect(homePage.navbar.newArticleBtn).toBeVisible());
    await step('Verify settings button visibility', async ()=> await expect(homePage.navbar.settingsBtn).toBeVisible());
    await step('Verify sign in button is not visible', async () => await expect(homePage.navbar.signInBtn).not.toBeVisible());
    await step('Verify sign up button is not visible', async () => await expect(homePage.navbar.signUpBtn).not.toBeVisible());
})