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
    me(@Ctx()  { userId }: MyContext) {
        // try {
        return User.findOne(userId);
    // } catch (err) {
        // console.log(err);
        // return null;
    // }
    }

  @Query(() => [ User ])
  users() {
      return User.find();
  }
}
