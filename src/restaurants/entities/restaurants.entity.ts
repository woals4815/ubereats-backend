import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;

    @Field(is => String)
    @Column()
    name: String;

    @Field(type => Boolean, { nullable: true})
    @Column()
    isVegan?: boolean;

    @Field(type => String)
    @Column()
    address: String;

    @Field(type => String)
    @Column()
    ownersName: String;

    @Field(type=> String)
    @Column()
    categoryName: string;
}