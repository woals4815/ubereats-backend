import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Restaurant {
    @Field(is => String)
    name: String;

    @Field(type => Boolean, { nullable: true})
    isVegan?: boolean;

    @Field(type => String)
    address: String;

    @Field(type => String)
    ownersName: String;
}