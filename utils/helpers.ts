import {APIRequestContext, BrowserContext, test, TestStepInfo} from "@playwright/test";
import {ArticleData, LoginData, LoginResponse} from "../types/types";

export const step = async (title: string, body: (step: TestStepInfo) => any ) => {
    await test.step(title, body);
}

export const login = async(request: APIRequestContext, context: BrowserContext) : Promise<string> =>{
    const url = `${process.env.API_URL}/users/login`;

    const loginData : LoginData = {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD
    }

    const response = await request.post(url, {
        data: {
            user: loginData
        },
        headers: {
            'referer': `${url}/users/login`,
            'origin': url
        }
    });

    if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(`Login API request failed [Status ${response.status()}]: ${errorText}`);
    }

    const loginResponse: LoginResponse = await response.json();
    const token = loginResponse.user?.token;

    if (!token) throw new Error('API login failed');

    await context.addInitScript((jwtToken) => {
        window.localStorage.setItem('jwtToken', jwtToken);
    }, token);

    return token;
}

export const createPost = async(request: APIRequestContext, article: ArticleData, token: string) =>{
    const url = `${process.env.API_URL}/articles`;

    const response = await request.post(url, {
        data: {
            article: article
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })

    if(response.status() != 201) throw new Error('Creation failed')
}

export const deletePost = async(request: APIRequestContext, title: string, token: string) =>{
    const url = `${process.env.API_URL}/articles/${title}`;
    const response = await request.delete(url, {
        headers:{
            'Authorization': `Token ${token}`
        }});

    if(response.status() != 204) throw new Error('Cleanup failed')
}