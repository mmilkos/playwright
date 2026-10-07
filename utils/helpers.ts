import {APIRequestContext, BrowserContext, TestStepInfo} from "@playwright/test";
import {ArticleData, LoginData, LoginResponse} from "@/types/types";
import {test} from "@/fixtures/baseTest";

export const step = async (title: string, body: (step: TestStepInfo) => any ) => {
    await test.step(title, body);
}

export const login = async(request: APIRequestContext, context: BrowserContext) : Promise<string> =>{
    const url = `${process.env.API_URL}/users/login`;

    const loginData : LoginData = {
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!
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
        throw new Error(`Login API request failed [Status ${response.status()}]: ${await response.text()}`);
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

    if(response.status() != 201) throw new Error(`Creation failed [Status ${response.status()}]: ${await response.text()}`)
}

export const deletePost = async(request: APIRequestContext, title: string, token: string) =>{
    const url = `${process.env.API_URL}/articles/${title}`;
    const response = await request.delete(url, {
        headers:{
            'Authorization': `Token ${token}`
        }});

    if(response.status() != 204) throw new Error(`Cleanup failed [Status ${response.status()}]: ${await response.text()}`)
}

export const envCheck = ()=>{
    const requiredEnvVariables = ['BASE_URL', 'API_URL', 'USER_EMAIL', 'USER_PASSWORD', 'USER'];
    requiredEnvVariables.forEach(v => {
        if (!process.env[v]) throw new Error(`${v} variable is missing`)
    })
}