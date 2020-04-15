// Core
import {
    Resolver,
    Mutation,
    Arg,
    Query,
    Ctx,
    UseMiddleware,
    Info,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';

// Entities
import { Todo } from '../entity';

// Instruments
import { isAuthOptional } from '../middleware';

// Types
import { MyContext, TodoInput, TodoUpdateInput } from '../graphql-types';

@Resolver()
export class TodoResolver {
    @Query(() => [ Todo ])
    todos(
    @Info() info: GraphQLResolveInfo,
    ) {
        if (info.fieldNodes[ 0 ].selectionSet) {
            console.log('"|_(ʘ_ʘ)_/" =>: TodoResolver -> info', info.fieldNodes[ 0 ].selectionSet.selections);
        }

        return Todo.find();
    }

    @Mutation(() => Todo)
    @UseMiddleware(isAuthOptional)
    async createTodo(
        @Arg('input', () => TodoInput) input: TodoInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Ctx() { userId }: MyContext,
    ): Promise<Todo> {
        const todo = await Todo.create({
            ...input,
            ownerId: userId,
        }).save();

        return todo;
    }

    @Mutation(() => Todo)
    async updateTodo(
        @Arg('id') id: string,
        // eslint-disable-next-line @typescript-eslint/indent
        @Arg('input', () => TodoUpdateInput) input: TodoUpdateInput,
    ): Promise<Partial<Todo>> {
        const todo = await Todo.findOne(id);

        if (!todo) {
            throw new ApolloError('Todo not found');
        }

        Object.assign(todo, input);

        return todo.save();
    }

    @Mutation(() => String)
    async deleteTodo(@Arg('id') id: string): Promise<string> {
        await Todo.delete({ id });

        return id;
    }
}
