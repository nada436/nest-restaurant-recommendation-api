import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UseDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: UseDto) {
    return await this.userService.create(dto);
  }
}
