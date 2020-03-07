// Core
import bcrypt from "bcryptjs";
// import { Arg, Ctx, Mutation, Resolver, Query } from "type-graphql";
import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthenticationError } from 'apollo-server-express';

// Entity
import { User } from "../entity/User";

// Instruments
import { SALT_ROUNDS } from '../constants';
// import { createAccessToken } from '../utils';

// Types
// import { AuthInput, AuthResponseWeb } from "../graphql-types/Auth";
import { AuthInput } from "../graphql-types/Auth";
// import { MyContext } from "../graphql-types/MyContext";
import { UserResponse } from "../graphql-types/UserResponse";

// const invalidLoginResponse = {
//   errors: [
//     {
//       path: "email",
//       message: "invalid login"
//     }
//   ]
// };

@Resolver()
export class AuthResolver {

  @Mutation(() => UserResponse)
  // @Mutation(() => AuthResponseWeb)
  async registerWeb(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    console.log('<<<TESTLOG>>>: AuthResolver -> registerWeb -> password', password);
    console.log('<<<TESTLOG>>>: AuthResolver -> registerWeb -> email', email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // return invalidLoginResponse;
      throw new AuthenticationError(' kek');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    const user = await User.create({
      email,
      password: hashedPassword,
    }).save();

    // const token = createAccessToken(user);

    return { user };
  }

  // @Mutation(() => UserResponse)
  // async loginWeb(
  //   @Arg("input") { email, password }: AuthInput,
  //   @Ctx() ctx: MyContext
  // ): Promise<UserResponse> {
  //   const user = await User.findOne({ where: { email } });

  //   if (!user) {
  //     return invalidLoginResponse;
  //   }

  //   const valid = await bcrypt.compare(password, user.password);

  //   if (!valid) {
  //     return invalidLoginResponse;
  //   }

  //   ctx.req.session!.userId = user.id;

  //   return { user };
  // }

  // @Query(() => User, { nullable: true })
  // async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
  //   if (!ctx.req.session!.userId) {
  //     return undefined;
  //   }

  //   return User.findOne(ctx.req.session!.userId);
  // }

  // @Mutation(() => Boolean)
  // async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
  //   return new Promise((res, rej) =>
  //     ctx.req.session!.destroy(err => {
  //       if (err) {
  //         console.log(err);
  //         return rej(false);
  //       }

  //       ctx.res.clearCookie("qid");
  //       return res(true);
  //     })
  //   );
  // }
}

// @Resolver()
// export class UserResolver {

//   @Mutation(() => Boolean)
//   async logout(@Ctx() { res }: MyContext) {
//     sendRefreshToken(res, "");

//     return true;
//   }

//   @Mutation(() => Boolean)
//   async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
//     await getConnection()
//       .getRepository(User)
//       .increment({ id: userId }, "tokenVersion", 1);

//     return true;
//   }

//   @Mutation(() => LoginResponse)
//   async login(
//     @Arg("email") email: string,
//     @Arg("password") password: string,
//     @Ctx() { res }: MyContext
//   ): Promise<LoginResponse> {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       throw new Error("could not find user");
//     }

//     const valid = await compare(password, user.password);

//     if (!valid) {
//       throw new Error("bad password");
//     }

//     // login successful

//     sendRefreshToken(res, createRefreshToken(user));

//     return {
//       accessToken: createAccessToken(user),
//       user
//     };
//   }

//   @Mutation(() => Boolean)
//   async register(
//     @Arg("email") email: string,
//     @Arg("password") password: string
//   ) {
//     const hashedPassword = await hash(password, 12);

//     try {
//       await User.insert({
//         email,
//         password: hashedPassword
//       });
//     } catch (err) {
//       console.log(err);
//       return false;
//     }

//     return true;
//   }
// }