// Env
export const APP_NAME = process.env.APP_NAME || 'test';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'superSecretOne';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'superSecretTwo';
export const PORT: number | string = process.env.PORT || 4000;

// App
export const ACCESS_TOKEN_DURATION: string = '15m';
export const REFRESH_TOKEN_DURATION: string = '7d';
export const COOKIE_MAX_AGE: number = 1000 * 60 * 60 * 24 * 7; // Should be equal to REFRESH_TOKEN_DURATION
export const SALT_ROUNDS: number = 12;
