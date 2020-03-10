// Core
import { Response } from 'express';

// Instruments
import { APP_NAME, COOKIE_MAX_AGE } from '../constants';

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie(
        `${APP_NAME}_jid`,
        token,
        {
            httpOnly: true,
            path:     '/refresh_token',
            maxAge:   COOKIE_MAX_AGE,
        },
    );
};
