import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@InputType('RestaurantInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {

    @Field(type => String)
    @IsString()
    @Column()
    name: String;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;

    @Field(type => String)
    @IsString()
    @Column()
    address: String;

    @ManyToOne(type => Category, category => category.restaurants, {nullable: true, onDelete: 'SET NULL'})
    @Field(type=> Category, {nullable: true})
    category: Category;

    @ManyToOne(type => User, user => user.restaurants, { onDelete: 'CASCADE'})
    @Field(type=> User, {nullable: true})
    owner: User;    
}