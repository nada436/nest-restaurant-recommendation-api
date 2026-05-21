import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './repository/restaurant_reposiyory';
import { RestaurantDto } from './dto/RestaurantDto';
import { error } from 'console';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Restaurant } from './schemas/Restaurant_Schema';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

 async create(
  restaurantDto: RestaurantDto,
): Promise<ApiResponse<Restaurant>> {
    const exists = await this.restaurantRepository.findOne(
      restaurantDto.slug,
    );

    if (exists) {
        throw new ConflictException('Slug already exists');
    }
  const result = await this.restaurantRepository.create(restaurantDto);

  return {
    success: true,
    data: result,
  };
}

async findall(cuisine?:CuisineEnum):Promise<ApiResponse<Restaurant[]>> {
  const data=await this.restaurantRepository.findAll(cuisine)
   if(data.length==0) throw new  NotFoundException(' No restaurants found');
  return {
     success: true,
    data,
  };
}

async findOne(identifier:string):Promise<ApiResponse<Restaurant>> {
  const data=await this.restaurantRepository.findOne(identifier)
  if(!data) throw new  NotFoundException('Restaurant not found');
  return {
     success: true,
    data,
  };
}


async findNearby(lng:number, lat:number):Promise<ApiResponse<Restaurant[]>> {
  const data=await this.restaurantRepository.findNearby(lng,lat)
  if(data.length==0) throw new  NotFoundException('No restaurants found');
  return {
     success: true,
    data,
  };
}
}