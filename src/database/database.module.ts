// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from '../bus/User/user.entity';
import { Todo } from '../bus/Todo/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:    [ ConfigModule ],
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService) => ({
                type:        'postgres',
                url:         configService.get('DATABASE_URL'),
                dropSchema:  configService.get('NODE_ENV') !== 'production' || false,
                synchronize: configService.get('NODE_ENV') !== 'production' || true,
                logging:     false,
                entities:    [ Todo, User ],
                migrations:  [ 'src/migration/**/*.ts' ],
                subscribers: [ 'src/subscriber/**/*.ts' ],
                cli:         {
                    entitiesDir:    'src/entity',
                    migrationsDir:  'src/migration',
                    subscribersDir: 'src/subscriber',
                },
            }),
        }),
    ],
})
export class DatabaseModule {}
