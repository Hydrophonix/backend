// Core
import { sign } from "jsonwebtoken";

// Entity
import { User } from "../entity/User";

// Instruments
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_DURATION
} from '../constants';

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.id },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_DURATION }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_DURATION }
  );
};