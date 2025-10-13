import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
// import { AuthGuard } from './guard';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiOperation({ summary: '注册', description: '注册一个新用户' })
  // @Post('/register')
  // async create(@Body() loginDto: CreateUserDto): Promise<User> {
  //   return await this.authService.register(loginDto);
  // }

  @ApiOperation({ summary: '登录', description: '用户登录' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.phone, signInDto.password);
  }

  // @ApiOperation({ summary: '验证', description: '验证保护' })
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: '身份验证 Token',
  //   example: 'Bearer your-jwt-token-here',
  //   required: true,
  // })
  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   // eslint-disable-next-line
  //   return req.user;
  // }
}
