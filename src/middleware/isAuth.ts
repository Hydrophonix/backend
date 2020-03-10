// Core
import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { verify } from "jsonwebtoken";

// Types
import { MyContext } from "../graphql-types";

// Instruments
import { ACCESS_TOKEN_SECRET } from '../constants';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new ApolloError("not authenticated");
  }

  try {
    const tokenKey = authorization.replace('Bearer ', '');
    let token : any = null;
    
    token = verify(tokenKey, ACCESS_TOKEN_SECRET);
    context.userId = token.userId as string;
  } catch (err) {
    console.log(err);
    throw new ApolloError("not authenticated");
  }

  return next();
};
