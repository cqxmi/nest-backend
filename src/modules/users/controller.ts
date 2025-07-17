import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './service';
import { User } from './entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('用户') // Swagger 分组名称
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/list')
  @ApiResponse({
    status: 200,
    type: [User], // 明确声明返回User数组
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
