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
        return User.findOne(userId);
    }

    @Query(() => [ User ])
    users() {
        return User.find();
    }
}
