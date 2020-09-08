// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// import { IsEmail } from 'class-validator';

// Entity


@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Field()
    // @Column('text', { unique: true })
    // email: string;

    @Column()
    password: string;

    @Field(() => String)
    @Column('text', { unique: true })
    name: string;

    @Column('int', { default: 0 })
    tokenVersion: number;

    // ================================================================================================================
    // Relations
    // ================================================================================================================
}
