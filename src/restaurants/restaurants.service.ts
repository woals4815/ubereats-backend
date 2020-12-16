import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { DeleteRestaurantInput, DeleteRestaurantOutput } from "./dtos/delete-restaurant.dto";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { Category } from "./entities/category.entity";
import { Restaurant } from "./entities/restaurants.entity";
import { CategoryRepository } from "./repositories/category.repository";


@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
         private readonly restaurants: Repository<Restaurant>,
         private readonly categories: CategoryRepository
         ){}
        
        async findReturnRestaurant(owner: User, restaurantId: number, descript: String): Promise<CoreOutput>{
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant){
                return{
                        ok:false,
                        error: 'Restaurant not found'
                };
            }
            if(owner.id !== restaurant.ownerId){
                return{
                    ok: false,
                    error: `you can't ${descript} a restaurant that you don't own`
                };
            }
        }

        async createRestaurant(
            owner: User,
            createRestaurantInput: CreateRestaurantInput
            ): Promise<CreateRestaurantOutput> {
                try{
                    const newRestaurant = this.restaurants.create(createRestaurantInput);
                    newRestaurant.owner = owner;
                    const category = await this.categories.getOrCreate(
                        createRestaurantInput.categoryName
                    );
                    newRestaurant.category = category;
                    await this.restaurants.save(newRestaurant);
                    return{
                        ok: true
                    };
                }catch{
                    return{
                        ok: false,
                        error: 'Could not create restaurant'
                    };
                }
        }

        async editRestaurant(owner: User,
             editRestaurantInput: EditRestaurantInput
             ): Promise<EditRestaurantOutput> {
                try{
                    const EDIT = 'edit'
                    await this.findReturnRestaurant(owner, editRestaurantInput.restaurantId, EDIT);
                    let category: Category = null;
                    if(editRestaurantInput.categoryName){
                        category = await this.categories.getOrCreate(
                            editRestaurantInput.categoryName)
                    }
                    await this.restaurants.save([{
                        id: editRestaurantInput.restaurantId,
                        ...editRestaurantInput,
                        ...(category && { category}),
                    }]);
                    return {
                        ok: true,
                    }
                }catch(error){
                    return{
                        ok: false,
                        error: 'Restaurant not found'
                    };
                }
        }
        async deleteRestaurant(owner: User, {restaurantId}: DeleteRestaurantInput
            ): Promise<DeleteRestaurantOutput>{
                const DELETE= "delete";
                try{
                    await this.findReturnRestaurant(owner, restaurantId, DELETE);
                    await this.restaurants.delete(restaurantId);
                }catch{
                    return {
                        ok: false,
                        error: "Could not delete"
                    };
                }
        }

        async allCategories(): Promise<AllCategoriesOutput>{
            try{
                const categories = await this.categories.find();
                return{
                    ok: true,
                    categories
                };
            }catch{
                return{
                    ok:false,
                    error:'Could not load categories'
                }
            }
        }
        countRestaurants(category:Category){
            return this.restaurants.count({category});
        }
}