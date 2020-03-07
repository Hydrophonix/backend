// Core
import "reflect-metadata";
import cors from 'cors';
import express from "express";
import cookieParser from "cookie-parser";

// Instruments
// import { refreshToken } from './routes';

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: false, origin: 'http://localhost:3000' }))

app.use((req, _res, next) => {
// console.log('<<<TESTLOG>>>: res', res);
console.log('<<<TESTLOG>>>: req', req.body);
next();
})

// app.post("/refresh_token", refreshToken);

export { app }


  


