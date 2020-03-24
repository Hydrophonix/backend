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
    ) {
        const updatedTodo = await Todo.update({ id }, input);

        return updatedTodo;
    }

    @Mutation(() => Boolean)
    async deleteTodo(@Arg('id', () => String) id: string): Promise<boolean> {
        await Todo.delete({ id });

        return true;
    }
}
