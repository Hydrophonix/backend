// Core
import { Resolver, Query, Context } from '@nestjs/graphql';

// Instrumenta
import { User } from './user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';

// Instruments
import { AuthGuard } from '../auth/auth.guard';
import { MyContext } from '../../graphql/graphql.interfaces';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Query(() => User)
    @UseGuards(AuthGuard)
    async me(@Context() ctx: MyContext) {
        console.log('"|_(ʘ_ʘ)_/" =>: UserResolver -> me -> ctx', ctx.user);
        const users = await this.userService.findAll();

        return users[ 0 ];
    }

    @Query(() => [ User ], { nullable: true })
    users(
    // @Info() info: GraphQLResolveInfo,
    ) {
        // if (info.fieldNodes[ 0 ].selectionSet) {
        //     // console.log('"|_(ʘ_ʘ)_/" =>: TodoResolver -> info', info.fieldNodes[ 0 ].selectionSet.selections);
        // }
        return this.userService.findAll();
    }
}
