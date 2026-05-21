import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './../restaurant/repository/restaurant_reposiyory';
import { UserRepository } from './../user/repository/user_reposiyory';
import { FollowRepository } from './../follow/repository/follow_reposiyory';

@Injectable()
export class RecommendationService {

constructor( private readonly  RestaurantRepository:RestaurantRepository,private readonly UserRepository:UserRepository
,private readonly FollowRepository:FollowRepository){}

  async getRecommendations(userId: string) {
    const user = await this.UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundException ('User not found')
    }

    const usersWithSameFavoriteCuisine =
      await this.UserRepository.findByCuisineMatch(user.favoriteCuisines,userId);

    const userIds = usersWithSameFavoriteCuisine.map((user) => user._id);

    const followedRestaurants =
      await this.FollowRepository.findUsersFollows(userIds);

    return {
      success: true,
      data: {
        usersWithSameFavoriteCuisine,
        followedRestaurants,
      },
    };
  }}
