// Core
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// Entities
import { User } from './user.entity';

// Services
import { UserService } from './user.service';

// Instruments
import { IContextUser } from '../../graphql/graphql.interfaces';
import { CurrentUser } from '../Auth/auth.decorators';
import { AuthGuard } from '../Auth/auth.guard';
import { UserUpdateInput } from './user.inputs';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {}

    // ================================================================================================================

    @Query(() => User)
    @UseGuards(AuthGuard)
    me(@CurrentUser() { id }: IContextUser) {
        return this.userService.findOneById(id);
    }

    // ================================================================================================================

    // @Query(() => [ User ])
    // users() {
    //     return this.userService.findAll();
    // }

    // ================================================================================================================

    @Mutation(() => User)
    @UseGuards(AuthGuard)
    updateMe(
        @Args('input') input: UserUpdateInput,
        @CurrentUser() { id }: IContextUser,  // eslint-disable-line @typescript-eslint/indent
    ): Promise<User> {
        return this.userService.updateOneById(id, input);
    }

    // ================================================================================================================

    @Mutation(() => Boolean)
    @UseGuards(AuthGuard)
    deleteMe(
        @CurrentUser() { id }: IContextUser,
    ): Promise<boolean> {
        return this.userService.deleteOneById(id);
    }

    // ================================================================================================================
    // Relations
    // ================================================================================================================

    // @ResolveField()
    // projects(@Parent() { id }: User): Promise<Project[]> {
    //     return this.projectService.findOwnedProjects(id);
    // }
}
