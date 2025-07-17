import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entity';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() loginDto: CreateUserDto): Promise<User> {
    return await this.authService.register(loginDto);
  }
}
