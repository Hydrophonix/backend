// Core
import cors from 'cors';
import express from "express";
import cookieParser from "cookie-parser";

// Instruments
import { refreshToken } from './routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use("/refresh_token", cookieParser());
app.post("/refresh_token", refreshToken);

export { app }


  


