import { test as base } from '@playwright/test';
import {HomePage} from "../pages/home-page";
import {ArticlePage} from "../pages/article-page";
import {EditArticlePage} from "../pages/edit-article-page";
import {SignInPage} from "../pages/sign-in-page";
import {UserProfilePage} from "../pages/user-profile-page";

export const test = base.extend<{homePage: HomePage, articlePage: ArticlePage,
    editArticlePage: EditArticlePage, signInPage: SignInPage, userProfilePage: UserProfilePage}>({
    homePage: async ({page}, use)=>{
        await use(new HomePage(page));
    },
    articlePage: async({page}, use)=>{
        await use(new ArticlePage(page));
    },
    editArticlePage: async({page}, use) =>{
        await use(new EditArticlePage(page));
    },
    signInPage: async({page}, use) =>{
        await use(new SignInPage(page))
    },
    userProfilePage: async({page}, use) =>{
        await use(new UserProfilePage(page))
    }
})