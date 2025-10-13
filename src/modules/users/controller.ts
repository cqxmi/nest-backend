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
import { jwtPayload } from './dto/create-user.dto';

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
      role: res?.role.name,
      username: res?.name,
    };
  }

  @Get('getPermissionListByUser')
  @ApiOperation({ summary: '获取登录信息', description: '拿用户信息' })
  @HttpCode(HttpStatus.OK)
  async getPermissionListByUser(@Req() request: Request) {
    const user: jwtPayload = request['user'] as jwtPayload;
    const res = await this.userService.findOne({ id: user.id }, ['role']);
    console.log(res);
    return [
      {
        children: [
          {
            children: null,
            children2: [],
            id: 78,
            parentId: 77,
            permissionName: '角色列表',
            permission: 'role_list',
            hasChild: false,
          },
          {
            children: null,
            children2: [],
            id: 79,
            parentId: 77,
            permissionName: '添加角色',
            permission: 'role_add',
            hasChild: false,
          },
          {
            children: null,
            children2: [],
            id: 80,
            parentId: 77,
            permissionName: '编辑角色',
            permission: 'role_update',
            hasChild: false,
          },
          {
            children: null,
            children2: [],
            id: 81,
            parentId: 77,
            permissionName: '删除角色',
            permission: 'role_delete',
            hasChild: false,
          },
        ],
        id: 77,
        parentId: 1,
        permissionName: '权限设置',
        permission: 'permission_setting',
      },
    ];
  }
}
