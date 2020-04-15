// Core
import bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';

// Entity
import { User } from '../entity/User';

// Instruments
import { SALT_ROUNDS } from '../constants';
import { sendRefreshToken, createAccessToken, createRefreshToken } from '../utils';

// Types
import { AuthInput, AuthResponseWeb, MyContext } from '../graphql-types';

@Resolver()
export class AuthResolver {
    // ==============================================================================================
    // Register Web
    // ==============================================================================================
    @Mutation(() => AuthResponseWeb)
    async registerWeb(
        @Arg('input') { email, password }: AuthInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Ctx() { res }: MyContext,
    ): Promise<AuthResponseWeb> {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new UserInputError('User with email you have entered is already exist');
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // TODO: implement User.insert()
        const user = await User.create({
            email,
            password: hashedPassword,
        }).save();

        const accessToken = createAccessToken(user);
        sendRefreshToken(res, createRefreshToken(user));

        return {
            user,
            accessToken,
        };
    }

    // ----------------------------------------------------------------------------------------------
    // Login Web
    // ----------------------------------------------------------------------------------------------
    @Mutation(() => AuthResponseWeb)
    async loginWeb(
        @Arg('input') { email, password }: AuthInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Ctx() { res }: MyContext,
    ): Promise<AuthResponseWeb> {
        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw new UserInputError('The username or password you have entered is incorrect.');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new UserInputError('The username or password you have entered is incorrect.');
        }

        const accessToken = createAccessToken(user);
        sendRefreshToken(res, createRefreshToken(user));

        return {
            user,
            accessToken,
        };
    }

    // ----------------------------------------------------------------------------------------------
    // Logout Web
    // ----------------------------------------------------------------------------------------------
    @Mutation(() => Boolean)
    logout(
        @Ctx() { res }: MyContext,
    ): Boolean {
        sendRefreshToken(res, '');

        return true;
    }
}
