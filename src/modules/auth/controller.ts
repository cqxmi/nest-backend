import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../users/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
import { buildTree } from '../../utils/funcs';
import { Authority } from './entity';
import { ResponseBooleanDto } from 'src/app.dto';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录', description: '用户登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加角色成功',
    type: [ResponseBooleanDto],
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: CreateUserDto) {
    return {
      data: this.authService.signIn(signInDto.phone, signInDto.password),
    };
  }

  @ApiOperation({ summary: '获取所有权限', description: '获取所有权限' })
  @HttpCode(HttpStatus.OK)
  @Get('getPermissions')
  async getPermissions(): Promise<any> {
    const auths: Array<Authority> = await this.authService.findAll();
    return {
      data: buildTree(auths),
    };
  }
}
