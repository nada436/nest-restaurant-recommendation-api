import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('recommendation')
export class RecommendationController {

  constructor(
    private readonly recommendationService: RecommendationService,
  ) {}

  @Get(':userId')
  async getRecommendations(
    @Param('userId',ParseObjectIdPipe) userId: string,
  ) {
    return this.recommendationService.getRecommendations(userId);
  }
}