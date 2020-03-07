// Core
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ default: 'sometetxt' })
  test?: string;

  @Field()
  @Column({ default: 'sometetxt'})
  testbig?: string;
}
