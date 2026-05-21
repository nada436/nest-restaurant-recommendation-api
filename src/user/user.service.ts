import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user_reposiyory';
import { UseDto} from './dto/CreateUserDto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: UseDto):Promise<ApiResponse<UseDto>> {
    const user = await this.userRepository.create(dto);
    return {
      success: true,
      data: user,
    };
  }
}
