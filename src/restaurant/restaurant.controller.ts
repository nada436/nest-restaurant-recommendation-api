import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { FindRestaurantDto, RestaurantDto } from './dto/RestaurantDto';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

   
  @Post()
  createRestaurant(@Body() restaurantDto: RestaurantDto) {
    return this.restaurantService.create(restaurantDto);
  }

  @Get()
findall(@Query() query: FindRestaurantDto) {
  return this.restaurantService.findall(query.cuisine);
}

@Get('nearby')
findNearby(
  @Query('lng') lng: number,
  @Query('lat') lat: number,
) {
  return this.restaurantService.findNearby(+lng, +lat);
}

@Get(':identifier')
find(@Param('identifier') identifier: string) {
  return this.restaurantService.findOne(identifier);
}
}