// Core
import {
    Resolver,
    Mutation,
    Arg,
    Query,
    Ctx,
} from 'type-graphql';

// Entities
import { Todo } from '../entity';

// Instruments
import { formatInput } from '../utils';

// Types
import { MyContext, TodoInput, TodoUpdateInput } from '../graphql-types';

@Resolver()
export class TodoResolver {
    @Query(() => [ Todo ])
    todos() {
        return Todo.find();
    }

    @Mutation(() => Todo)
    async createTodo(
        @Arg('input', () => TodoInput) input: TodoInput,
        // eslint-disable-next-line @typescript-eslint/indent
        @Ctx() { userId }: MyContext,
    ): Promise<Todo> {
        const todo = await Todo.create({
            ...formatInput(input),
            ownerId: userId,
        }).save();

        return todo;
    }

    @Mutation(() => Todo)
    async updateTodo(
    @Arg('id') id: string,
        // eslint-disable-next-line @typescript-eslint/indent
        @Arg('input', () => TodoUpdateInput) input: TodoUpdateInput,
    ) {
        const updatedTodo = await Todo.update({ id }, formatInput(input));

        return updatedTodo;
    }

    @Mutation(() => Boolean)
    async deleteTodo(@Arg('id', () => String) id: string): Promise<boolean> {
        await Todo.delete({ id });

        return true;
    }
}
