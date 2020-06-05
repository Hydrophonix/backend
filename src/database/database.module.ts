// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from '../bus/user/user.entity';
import { Todo } from '../bus/todo/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:    [ ConfigModule ],
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService) => ({
                type:        'postgres',
                url:         configService.get('DATABASE_URL'),
                dropSchema:  false,
                synchronize: true,  // switch this to false once you have the initial tables created and use migrations instead
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
