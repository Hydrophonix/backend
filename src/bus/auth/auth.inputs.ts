// Core
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

// Entities
import { User } from '../user/user.entity';

@InputType()
export class AuthInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class AuthResponseWeb {
    @Field(() => String)
    accessToken: string;

    @Field(() => User)
    user: User;
}
