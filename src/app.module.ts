import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { FollowModule } from './follow/follow.module';
import { RecommendationController } from './recommendation/recommendation.controller';
import { RecommendationService } from './recommendation/recommendation.service';
import { RecommendationModule } from './recommendation/recommendation.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    FollowModule,
    UserModule,
    RestaurantModule,
    RecommendationModule,
  ],
  controllers: [AppController, RecommendationController],
  providers: [AppService, RecommendationService],
})
export class AppModule {}
