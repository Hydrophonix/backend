// Core
import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { AuthenticationError } from 'apollo-server-express';

// Entity
import { User } from "../entity/User";

// Instruments
import { SALT_ROUNDS } from '../constants';
import { sendRefreshToken, createAccessToken, createRefreshToken } from "../utils";

// Types
import { AuthInput, AuthResponseWeb, MyContext } from "../graphql-types";

@Resolver()
export class AuthResolver {
  // ----------------------------------------------------------------------------------------------
  // Register Web
  // ----------------------------------------------------------------------------------------------
  @Mutation(() => AuthResponseWeb)
  async registerWeb(
    @Arg('input') { email, password }: AuthInput,
    @Ctx() { res }: MyContext
    ): Promise<AuthResponseWeb> {
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        throw new AuthenticationError('Register');
      }
    
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const user = await User.create({
        email,
        password: hashedPassword,
      }).save();
      
      const accessToken = createAccessToken(user);
      sendRefreshToken(res, createRefreshToken(user));
      
      return { 
        user,
        accessToken
      };
  }
  // ----------------------------------------------------------------------------------------------
  // Login Web
  // ----------------------------------------------------------------------------------------------
  @Mutation(() => AuthResponseWeb)
  async loginWeb(
    @Arg("input") { email, password }: AuthInput,
    @Ctx() { res }: MyContext
    ): Promise<AuthResponseWeb> {
      const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError('login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError('login');
    }

    const accessToken = createAccessToken(user);
    sendRefreshToken(res, createRefreshToken(user));

    return { 
      user,
      accessToken
     };
  }
  // ----------------------------------------------------------------------------------------------
  // Logout Web
  // ----------------------------------------------------------------------------------------------
  @Mutation(() => Boolean)
  async logout(
    @Ctx() { res }: MyContext
    ): Promise<Boolean> {
    sendRefreshToken(res, "");

    return true;
  }
}