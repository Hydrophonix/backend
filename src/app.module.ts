// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './bus/Auth/auth.module';
import { UserModule } from './bus/User/user.module';
import { TodoModule } from './bus/Todo/todo.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        GraphqlModule,
        AuthModule,
        UserModule,
        TodoModule,
    ],
})
export class AppModule {}
