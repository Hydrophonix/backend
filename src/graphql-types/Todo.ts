// Core
import { InputType, Field } from 'type-graphql';

@InputType()
export class TodoInput {
    @Field()
    title: string;

    @Field(() => String, { nullable: true })
    text?: string;
}

@InputType()
export class TodoUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    text?: string;

    @Field(() => Boolean, { nullable: true })
    done?: boolean
}
