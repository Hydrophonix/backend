// Core
import { Resolver, Query, Ctx, UseMiddleware, Info } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';

// Entities
import { User } from '../entity';

// Instruments
import { isAuthRequired } from '../middleware';

// Types
import { MyContext } from '../graphql-types';

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuthRequired)
    me(@Ctx()  { userId }: MyContext) {
        return User.findOne(userId);
    }

    @Query(() => [ User ])

    async users(
    @Info() info: GraphQLResolveInfo,
    ) {
        if (info.fieldNodes[ 0 ].selectionSet) {
            // console.log('"|_(ʘ_ʘ)_/" =>: TodoResolver -> info', info.fieldNodes[ 0 ].selectionSet.selections);
        }
        const user = await User.find();
        console.log('"|_(ʘ_ʘ)_/" =>: user', user);

        return user;
    }
}
