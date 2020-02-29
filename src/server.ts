// Core
import "reflect-metadata";
import express from "express";
import session from "express-session";
import redis from 'redis';
import connectRedis from 'connect-redis';

// Instruments
import { getSessionSecret } from './utils';
import { appName } from './constants';

const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient()

const sessionOptions = {
  store: new RedisStore(new RedisStore({ client: redisClient })),
  name: `${appName}:sid`,
  secret: getSessionSecret(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
  }
}

app.use(session(sessionOptions))

// Handle redis connection errors
// TODO: Add some handling
// app.use(function(req, __, next) {
//   if (!req.session) {
//     return next(new Error('oh no')) // handle error
//   }
//   next() // otherwise continue
// })

export { app }


  


