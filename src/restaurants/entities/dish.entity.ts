import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { Restaurant } from "./restaurants.entity";

@InputType('DishChoiceInputType', {isAbstract: true})
@ObjectType()
export class DishChoice{
    @Field(type=> String)
    name: string;
    @Field(type=>Int, {nullable: true})
    extra?: number;
}

@InputType('DishOptionsInputType', {isAbstract: true})
@ObjectType()
export class DishOption {
    @Field(type=> String)
    name: string;
    @Field(type=>[DishChoice], { nullable:true })
    choices?: DishChoice[];
    @Field(type=> Int, { nullable: true })
    extra?: number;
}

@InputType('DishInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Dish extends CoreEntity {

    @Field(type => String)
    @IsString()
    @Column({unique: true})
    name: String;

    @Field(type=> Int)
    @Column()
    @IsNumber()
    price: number;

    @Field(type => String, { nullable:true })
    @IsString()
    @Column({ nullable:true })
    photo?: String;

    @Field(type=> String)
    @Column()
    @Length(5, 100)
    description: string;

    @ManyToOne(type => Restaurant, 
        restaurant => restaurant.menu, 
        { onDelete: 'CASCADE'})
    @Field(type=> Restaurant, 
        {nullable: true})
    restaurant: Restaurant;

    @RelationId((dish: Dish) => dish.restaurant)
    restaurantId: number;

    @Field(type=>[DishOption], {nullable: true})
    @Column({type: 'json', nullable: true})
    options?: DishOption[];
}