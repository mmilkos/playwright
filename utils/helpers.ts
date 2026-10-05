import {APIRequestContext, BrowserContext, test, TestStepInfo} from "@playwright/test";

export const step = async (title: string, body: (step: TestStepInfo) => any ) => {
    await test.step(title, body);
}

export const login = async(request: APIRequestContext, context: BrowserContext )=>{
    const url = process.env.BASE_URL;
    const csrfToken = await getCsrfToken(request);

    await request.post('/login', {
        form: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD,
            csrf_token: csrfToken
        },
        headers: {
            'referer': url + '/login',
            'origin': url
        }
    })

    const storageState = await request.storageState();
    if (storageState.cookies.length === 0) throw new Error('API login failed');

    await context.addCookies(storageState.cookies)
}

export const generateUniqueString = (prefix: string = ''): string =>{
    const now = Date.now();
    return `${prefix}-${now}`;
}

export const deletePost = async(request: APIRequestContext, title: string) =>{
    const url = `${process.env.BASE_URL}/article/${title}/delete`;
    const csrfToken = await getCsrfToken(request);

    await request.post(url, {
        form: {
            csrf_token: csrfToken
        }
    });
}

export const getCsrfToken = async (request: APIRequestContext): Promise<string>=>{
    const response = await request.get('/login');

    const htmlText = await response.text();
    const csrfToken = htmlText.match(/name="csrf_token"\s+value="([^"]+)"/)[1];

    return csrfToken;
}