import { Module } from '@nestjs/common';
import { FollowModule } from 'src/follow/follow.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { UserModule } from 'src/user/user.module';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({ 
 imports: [UserModule,RestaurantModule,FollowModule],
  controllers: [RecommendationController],
  providers: [RecommendationService]})
export class RecommendationModule {
 
}
