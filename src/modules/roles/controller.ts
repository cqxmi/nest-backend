import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { RolesService } from './service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('角色') // Swagger 分组名称
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get('list')
  @ApiOperation({ summary: '获取所有角色列表', description: '获取所有角色' })
  @HttpCode(HttpStatus.OK)
  async getPermissionListByUser() {
    const [list, total] = await this.roleService.findAll();
    return {
      list,
      total,
    };
  }
}
