// Core
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

// Instruments
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoInput, TodoUpdateInput } from './todo.inputs';


@Resolver('Todo')
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService,
    ) {}

    // ==============================================================================================

    @Mutation(() => Todo, { description: 'test description' })
    async createTodo(@Args('input') input: TodoInput): Promise<Todo> {
        const todo = await this.todoService.createOne(input);

        return todo;
    }

    // ==============================================================================================

    @Query(() => [ Todo ])
    async todos(): Promise<Todo[]> {
        return await this.todoService.findAll();
    }

    // ==============================================================================================

    @Mutation(() => Todo)
    async updateTodo(
        @Args('id') id: string,
        // eslint-disable-next-line @typescript-eslint/indent
        @Args('input') input: TodoUpdateInput,
    ): Promise<Todo> {
        const todo = await this.todoService.findOne(id);

        if (!todo) {
            throw new ApolloError('Todo not found');
        }

        return await this.todoService.updateOne(Object.assign(todo, input));
    }

    // ==============================================================================================

    @Mutation(() => String)
    async deleteTodo(@Args('id') id: string): Promise<string> {
        await this.todoService.deleteOne(id);

        return id;
    }
}
