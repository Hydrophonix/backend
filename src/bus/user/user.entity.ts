// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsEmail } from 'class-validator';

// Entity
// import { Todo } from './Todo';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int', { default: 0 })
    tokenVersion: number;

    @Field()
    @IsEmail()
    @Column('text', { unique: true })
    email: string;

    @Column()
    password: string;

    @Field()
    @Column({ default: 'sometetxt' })
    testbig?: string;

    // @Field(() => [ Todo ], { nullable: true })
    // @OneToMany(() => Todo, (todo) => todo.ownerId, { nullable: true })
    // todos: Todo[]
}
