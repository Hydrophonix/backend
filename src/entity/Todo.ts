// Core
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';

// Entities
import { User } from './User';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    text?: string;

    @Field(() => Boolean)
    @Column('boolean', { default: false })
    done: boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    ownerId?: string;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'ownerId' })
    owner?: User
}
