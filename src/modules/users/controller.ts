import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { jwtPayload } from './user.dto';

@ApiTags('用户') // Swagger 分组名称
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('vifLoginStatus')
  @ApiOperation({ summary: '获取登录信息', description: '拿用户信息' })
  @HttpCode(HttpStatus.OK)
  async vifLoginStatus(@Req() request: Request) {
    const user: jwtPayload = request['user'] as jwtPayload;
    const res = await this.userService.findOne({ id: user.id }, ['role']);
    return {
      data: {
        role: res?.role.name,
        username: res?.name,
      },
    };
  }

  @Get('getPermissionListByUser')
  @ApiOperation({ summary: '获取角色对应的权限', description: '获取权限' })
  @HttpCode(HttpStatus.OK)
  async getPermissionListByUser(@Req() request: Request) {
    const user: jwtPayload = request['user'] as jwtPayload;
    const res = await this.userService.findOne({ id: user.id }, ['role']);
    return {
      data: res?.role.authoritys,
    };
  }
}
