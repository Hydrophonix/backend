// Env
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const APP_NAME: string = process.env.APP_NAME || 'osbb';
export const PORT: number | string = process.env.PORT || 4000;
export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'superSecretOne';
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || 'superSecretTwo';

// App
export const ACCESS_TOKEN_DURATION: string = '15m';
export const REFRESH_TOKEN_DURATION: string = '7d';
export const SALT_ROUNDS: number = 12;