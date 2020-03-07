// Core
import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';

// Entities
import { User } from '../entity';

// Instruments
import { isAuth } from '../middleware';

// Types
import { MyContext } from '../graphql-types';

@Resolver()
export class UserResolver {
 
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(@Ctx()  { payload }: MyContext) {

   
    // try {
      return User.findOne(payload!.userId);
    // } catch (err) {
      // console.log(err);
      // return null;
    // }
  }
}