// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Instruments
import { Todo } from './todo.entity';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
    imports:   [ TypeOrmModule.forFeature([ Todo ]) ],
    providers: [ TodoResolver, TodoService ],
})
export class TodoModule {}
