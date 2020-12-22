import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Category } from "./category.entity";
import { Dish } from "./dish.entity";

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

    @ManyToOne(type => Category, 
        category => category.restaurants, 
        {nullable: true, onDelete: 'SET NULL'})
    @Field(type=> Category, 
        {nullable: true})
    category: Category;

    @ManyToOne(type => User, 
        user => user.restaurants, 
        { onDelete: 'CASCADE'})
    @Field(type=> User, 
        {nullable: true})
    owner: User;

    @RelationId((restaurant: Restaurant) => restaurant.owner)
    ownerId: number;

    @Field(type => [Dish])
    @OneToMany(
        type => Dish, 
        dish => dish.restaurant)
    menu: Dish[];

    @Field(type => [Order])
    @OneToMany(
        type => Order, 
        order => order.restaurant)
    orders: Order[];

    @Field(type => Boolean)
    @Column({default: false})
    isPromoted: boolean;

    @Field(type => Date, {nullable: true})
    @Column({nullable: true})
    promotedUntil: Date;
}