// Core
import { verify } from 'jsonwebtoken';
import { Request, Response } from "express";

// Entities
import { User } from '../entity';

// Instruments
import { sendRefreshToken, createAccessToken, createRefreshToken } from '../utils';
import { REFRESH_TOKEN_SECRET, APP_NAME } from '../constants';

export const refreshToken = async (req: Request, res: Response) => {
  const token: string = req.cookies[`${APP_NAME}_jid`];

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  
  try {
    payload = verify(token, REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);

    return res.send({ ok: false, accessToken: "" });
  }

  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
}