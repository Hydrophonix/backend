// Core
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

// Entities
// import { User } from './User';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    text?: string;

    @Field(() => Boolean)
    @Column('boolean', { default: false })
    done: boolean;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // ownerId?: string;

    // @ManyToOne(() => User, (user) => user.todos, { nullable: true })
    // @JoinColumn()
    // owner?: User
}
