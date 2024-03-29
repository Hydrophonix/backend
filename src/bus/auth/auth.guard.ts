// Core
import { Injectable, CanActivate, Inject, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Instruments
import { IContext } from '../../graphql/graphql.interfaces';
import { AuthService } from './auth.service';
import { IAccessTokenPayload } from './auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    static isAccessToken(token: object): token is IAccessTokenPayload {
        return (
            typeof (token as IAccessTokenPayload).id === 'string' // eslint-disable-line no-extra-parens
            && typeof (token as IAccessTokenPayload).name === 'string' // eslint-disable-line no-extra-parens
        );
    }

    constructor(
        @Inject(AuthService)
        private readonly authService: AuthService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean {
        const ctx = GqlExecutionContext.create(context).getContext<IContext>();
        const headerTokenKey = ctx.req.headers.authorization;

        if (!headerTokenKey) {
            throw new UnauthorizedException('not authenticated');
        }

        const token = this.authService.verifyAccessToken(headerTokenKey);

        if (!token) {
            throw new UnauthorizedException('not authenticated');
        }

        if (AuthGuard.isAccessToken(token)) {
            const user = { id: token.id, name: token.name };

            ctx.user = user;

            return true;
        }

        throw new UnauthorizedException('not authenticated');
    }
}
