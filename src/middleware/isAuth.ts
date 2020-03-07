// Core
import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { verify } from "jsonwebtoken";

// Types
import { MyContext, ContextPayload } from "../graphql-types/MyContext";

// Instruments
import { ACCESS_TOKEN_SECRET } from '../constants';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new ApolloError("not authenticated");
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const payload = verify(token, ACCESS_TOKEN_SECRET);
    context.payload = payload as ContextPayload;
  } catch (err) {
    console.log(err);
    throw new ApolloError("not authenticated");
  }

  return next();
};
