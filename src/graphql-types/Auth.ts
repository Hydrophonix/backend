// Core
import { InputType, ObjectType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

// Entities
import { User } from '../entity';
// import { IsEmailAlreadyExist } from '../middleware';

@InputType()
export class AuthInput {
    @Field()
    @IsEmail()
    // @IsEmailAlreadyExist({ message: 'Email already in use'})
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

@ObjectType()
export class AuthResponseMobile extends AuthResponseWeb {
    @Field()
    refreshToken: string;
}
