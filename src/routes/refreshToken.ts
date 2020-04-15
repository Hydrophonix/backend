// Core
import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

// Entities
import { User } from '../entity';

// Instruments
import { sendRefreshToken, createAccessToken, createRefreshToken } from '../utils';
import { REFRESH_TOKEN_SECRET, APP_NAME } from '../constants';

const NO_TOKEN = {
    ok:          false,
    accessToken: '',
};

export const refreshToken = async (req: Request, res: Response) => {
    const tokenKey: string = req.cookies[ `${APP_NAME}_jid` ];

    if (!tokenKey) {
        return res.send(NO_TOKEN);
    }

    let token: any = null;

    try {
        token = verify(tokenKey, REFRESH_TOKEN_SECRET!);
    } catch (error) {
        console.log(error);

        return res.send(NO_TOKEN);
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: token.userId });

    if (!user) {
        return res.send(NO_TOKEN);
    }

    if (user.tokenVersion !== token.tokenVersion) {
        return res.send(NO_TOKEN);
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
};
