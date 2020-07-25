// Core
import { InputType, Field } from '@nestjs/graphql';
import { Length, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class TodoInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    title: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    text?: string;
}

@InputType()
export class TodoUpdateInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    title?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    text?: string;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    done?: boolean
}
