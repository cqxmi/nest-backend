import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/list')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.userService.create(createUserDto);
    return '创建成功';
  }
}
