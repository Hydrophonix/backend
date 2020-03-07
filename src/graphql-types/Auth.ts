// Core
import { InputType, ObjectType, Field } from "type-graphql";

// Entities
import { User } from '../entity';

// Types
import { FieldError } from './index'

@InputType()
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AuthResponseWeb {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class AuthResponseMobile extends AuthResponseWeb {
  @Field()
  refreshToken: string;
}