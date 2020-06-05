// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './bus/auth/auth.module';
import { UserModule } from './bus/user/user.module';
import { TodoModule } from './bus/todo/todo.module';

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
