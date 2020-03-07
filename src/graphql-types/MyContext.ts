import { Request, Response } from "express";

export interface ContextPayload {
  userId: string
} 

export interface MyContext {
  req: Request;
  res: Response;
  payload?: ContextPayload;
}
