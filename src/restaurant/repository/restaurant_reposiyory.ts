import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantDto } from '../dto/RestaurantDto';
import { Restaurant, RestaurantDocument } from '../schemas/Restaurant_Schema';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';




@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(dto: RestaurantDto) {
    return this.restaurantModel.create(dto);
  }

  findAll(cuisine?: CuisineEnum) {
  const filter = cuisine ? {cuisines: cuisine } : {};

  return this.restaurantModel.find(filter);
}


  async findOne(identifier: string) {
  const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

  if (isObjectId) {
    return this.restaurantModel.findById(identifier);
  }

  return this.restaurantModel.findOne({ slug: identifier });
}

  findNearby(lng: number, lat: number) {
    return this.restaurantModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: 1000,
        },
      },
    });
  }
}