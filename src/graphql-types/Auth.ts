// Core
import { InputType, ObjectType, Field } from 'type-graphql';

// Entities
import { User } from '../entity';

@InputType()
export class AuthInput {
  @Field()
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
