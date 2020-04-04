// Core
import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class TodoInput {
    @Field()
    @Length(1, 20)
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
