import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty({ description: '角色名', example: '超级管理员' })
  phone: string;

  @ApiProperty({ description: '权限', example: [{ id: 1, name: '用户管理' }] })
  authoritys: string;
}
