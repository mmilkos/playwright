export interface ArticleData {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse{
    user: {
        email: string;
        token: string;
        username: string;
        bio: string;
    }
}