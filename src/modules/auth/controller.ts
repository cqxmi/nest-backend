import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
import { buildTree } from '../../utils/funcs';
import { Authority } from './entity';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录', description: '用户登录' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.phone, signInDto.password);
  }

  @ApiOperation({ summary: '获取所有权限', description: '获取所有权限' })
  @HttpCode(HttpStatus.OK)
  @Get('getPermissions')
  async getPermissions(): Promise<any> {
    const auths: Array<Authority> = await this.authService.findAll();
    return buildTree(auths);
  }
}
