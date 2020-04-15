import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';

@ObjectType()
export class AuthResponse {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => String)
    accessToken: string
}
