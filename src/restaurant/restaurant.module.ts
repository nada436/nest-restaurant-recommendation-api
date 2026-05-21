import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantRepository } from './repository/restaurant_reposiyory';
import { Restaurant, RestaurantSchema } from './schemas/Restaurant_Schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),],
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    RestaurantRepository,
  ],
   exports: [RestaurantRepository]
})
export class RestaurantModule {}
 
