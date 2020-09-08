declare namespace NodeJS {
    export interface ProcessEnv {
        APP_NAME: string;
        NODE_ENV: string;
        PORT: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        DATABASE_URL: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
        DOMAIN: string;
    }
}
