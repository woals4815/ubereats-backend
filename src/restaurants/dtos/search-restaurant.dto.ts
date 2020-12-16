import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.dto";
import { Restaurant } from "../entities/restaurants.entity";


@InputType()
export class SearchRestaurantInput extends PaginationInput{
    @Field(type=> String)
    query: string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput{
    @Field(type=> [Restaurant], {nullable: true})
    restaurants?: Restaurant[];
}