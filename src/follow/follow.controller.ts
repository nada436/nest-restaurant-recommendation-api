import { Body, Controller, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/CreateFollowDto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  async create(@Body() dto: CreateFollowDto) {
    return await this.followService.create(dto);
  }
}
