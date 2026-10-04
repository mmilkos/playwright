import {APIRequestContext, BrowserContext, test, TestStepInfo} from "@playwright/test";

export const step = async (title: string, body: (step: TestStepInfo) => any ) => {
    await test.step(title, body);
}

export const login = async(request: APIRequestContext, context: BrowserContext )=>{
    const url = process.env.BASE_URL;

    const response = await request.get('/login');

    const htmlText = await response.text();
    const csrfToken = htmlText.match(/name="csrf_token"\s+value="([^"]+)"/)[1];

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