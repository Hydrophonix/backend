// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

// Entity
import { Todo } from './todo.entity';

// Types
import { TodoInput } from './todo.inputs';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    createOne(input: TodoInput): Promise<Todo> {
        return this.todoRepository.save(input);
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    findOne(id: string): Promise<Todo | undefined> {
        return this.todoRepository.findOne(id);
    }

    updateOne(todo: Todo): Promise<Todo> {
        return this.todoRepository.save(todo);
    }

    deleteOne(id: string): Promise<DeleteResult> {
        return this.todoRepository.delete(id);
    }
}
