import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entity';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '注册', description: '注册一个新用户' })
  @Post('/register')
  async create(@Body() loginDto: CreateUserDto): Promise<User> {
    return await this.authService.register(loginDto);
  }

  @ApiOperation({ summary: '登录', description: '用户登录' })
  @Post('/login')
  async login(@Body() loginDto: CreateUserDto): Promise<User> {
    return await this.authService.login(loginDto);
  }
}
