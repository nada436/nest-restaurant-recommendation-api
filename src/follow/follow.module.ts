import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { FollowRepository } from './repository/follow_reposiyory';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schemas/FollowSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
  exports: [FollowRepository],
})
export class FollowModule {}
