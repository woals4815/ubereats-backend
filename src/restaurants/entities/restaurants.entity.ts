import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;

    @Field(is => String)
    @IsString()
    @Column()
    name: String;

    @Field(type => Boolean, { defaultValue: true}) //for GraphQL
    @Column({ default: true }) //for database
    //For validating Dto
    @IsBoolean()
    @IsOptional()
    
    isVegan?: boolean;

    @Field(type => String)
    @IsString()
    @Column()
    address: String;

    @Field(type => String)
    @IsString()
    @Column()
    ownersName: String;

    @Field(type=> String)
    @IsString()
    @Length(5, 12)
    @Column()
    categoryName: string;
}