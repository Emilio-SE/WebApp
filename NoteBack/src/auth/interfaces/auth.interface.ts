export interface JwtPayload {
    email: string;
    id: number | string;
    preferencesId: string;
    iat?: Date;
    exp?: Date;
}

export interface LoginAuth {
    token: string;
}