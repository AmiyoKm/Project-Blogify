

export type CreateAccountParams = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    avatar?: string;
    role : string;
    userAgent?: string;
}

export type LoginParams = {
    email: string;
    password: string;
    userAgent?: string;
}