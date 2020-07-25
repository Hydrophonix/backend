export interface IRefreshTokenResponse {
    success: boolean;
    accessToken: string;
}

export interface IAccessTokenPayload {
    id: string;
    name: string;
}

export interface IRefreshTokenPayload {
    id: string;
    tokenVersion: number;
}
