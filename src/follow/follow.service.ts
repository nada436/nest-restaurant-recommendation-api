import { Injectable } from '@nestjs/common';
import { FollowRepository } from './repository/follow_reposiyory';
import { CreateFollowDto } from './dto/CreateFollowDto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Follow } from './schemas/FollowSchema';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async create(dto: CreateFollowDto) :Promise<ApiResponse<Follow>>{
    const follow = await this.followRepository.create(dto);
    return {
      success: true,
      data: follow,
    };
  }
}
