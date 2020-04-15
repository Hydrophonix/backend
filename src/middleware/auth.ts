// Core
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-core';
import { verify } from 'jsonwebtoken';

// Types
import { MyContext } from '../graphql-types';

// Instruments
import { ACCESS_TOKEN_SECRET } from '../constants';

export const isAuthRequired: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers.authorization;

    if (!authorization) {
        throw new AuthenticationError('not authenticated');
    }

    try {
        const tokenKey = authorization.replace('Bearer ', '');
        let token:any = null;

        token = verify(tokenKey, ACCESS_TOKEN_SECRET);
        context.userId = token.userId as string;
    } catch (error) {
        console.log('isAuthRequired', error.name, error.message);
        throw new AuthenticationError('not authenticated');
    }

    return next();
};

export const isAuthOptional: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers.authorization;

    if (!authorization) {
        throw new AuthenticationError('not authenticated');
    }

    try {
        const tokenKey = authorization.replace('Bearer ', '');
        let token:any = null;

        token = verify(tokenKey, ACCESS_TOKEN_SECRET);
        context.userId = token.userId as string;
    } catch (error) {
        console.log('isAuthOptional', error.name, error.message);
    }

    return next();
};
