import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): string {
    this.userService.create(createUserDto);
    return '创建成功';
  }
}
