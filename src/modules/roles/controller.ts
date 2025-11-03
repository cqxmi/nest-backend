import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './service';
import { AuthService } from '../auth/service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, RoleListResponseDto } from './role.dto';
import { idToTree, traverseTree, traverseTreeId } from 'src/utils/funcs';
import { AuthorityNode } from 'src/modules/auth/entity';
import { ResponseBooleanDto } from 'src/app.dto';

@ApiTags('角色') // Swagger 分组名称
@Controller('roles')
export class RolesController {
  constructor(
    private readonly roleService: RolesService,
    private readonly authService: AuthService,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '获取所有角色列表', description: '获取所有角色' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取所有角色列表成功',
    type: [RoleListResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async getRoleList() {
    const [list, total] = await this.roleService.findAll();

    return {
      data: {
        list: list.map((item) => {
          return {
            id: item.id,
            name: item.name,
            authoritysStr: traverseTree(item.authoritys as AuthorityNode[]),
            authoritys: traverseTreeId(item.authoritys as AuthorityNode[]),
          };
        }),
        total,
      },
    };
  }

  @Post('addRole')
  @ApiOperation({ summary: '添加角色', description: '添加角色' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: [ResponseBooleanDto],
  })
  @HttpCode(HttpStatus.OK)
  async addRole(@Body() createRoleDto: CreateRoleDto) {
    const { name, authoritys } = createRoleDto;

    // 1. 查重：角色名已存在
    const existingRole = await this.roleService.findOne({ name });
    if (existingRole) {
      return {
        code: 1,
        message: '角色已存在',
      };
    }

    // 2. 获取所有权限列表
    const allAuthorities = await this.authService.findAll();

    // 3. 转换为树形结构
    const treeStructure = idToTree(authoritys, allAuthorities);

    // 4. 构造要保存的数据
    const roleToSave = {
      name,
      authoritys: JSON.stringify(treeStructure), // 序列化为 JSON 字符串存入数据库
    };

    await this.roleService.addOne(roleToSave);

    return {
      data: true,
    };
  }

  @Post('editRole')
  @ApiOperation({ summary: '编辑角色', description: '编辑角色' })
  @HttpCode(HttpStatus.OK)
  async editRole(@Body() createRoleDto: CreateRoleDto) {
    const { name, authoritys, id } = createRoleDto;

    // 1. 查重：角色名已存在
    const existingRole = await this.roleService.findOne(id);
    if (!existingRole) {
      return {
        code: 1,
        message: '角色不存在',
      };
    }

    // 2. 获取所有权限列表
    const allAuthorities = await this.authService.findAll();

    // 3. 转换为树形结构
    const treeStructure = idToTree(authoritys, allAuthorities);

    // 4. 构造要保存的数据
    const roleToSave = {
      name,
      authoritys: JSON.stringify(treeStructure), // 序列化为 JSON 字符串存入数据库
    };

    await this.roleService.updateOne(id as number, roleToSave);

    return {
      data: true,
    };
  }

  @Get('delRole')
  @ApiOperation({ summary: '删除角色', description: '删除角色' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除角色成功',
    type: [ResponseBooleanDto],
  })
  @HttpCode(HttpStatus.OK)
  async delRole(@Query('id') id: number) {
    const role = await this.roleService.findOne({ id });
    if (!role) {
      return {
        code: 1,
        data: false,
        message: '角色不存在',
      };
    }
    await this.roleService.delOne(id);
    return {
      data: true,
    };
  }
}
