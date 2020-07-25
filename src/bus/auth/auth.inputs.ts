// Core
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

// Entities
import { User } from '../User/user.entity';

@InputType()
export class AuthInput {
    @Field()
    @IsString()
    @MinLength(3)
    name: string;

    @Field()
    @IsString()
    @MinLength(6)
    password: string;
}

@ObjectType()
export class AuthResponseWeb {
    @Field(() => String)
    accessToken: string;

    @Field(() => User)
    user: User;
}
