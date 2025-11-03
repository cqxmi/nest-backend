import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/app.dto';

export class CreateRoleDto {
  @ApiProperty({ description: '角色id', example: '1' })
  id?: number;

  @ApiProperty({ description: '角色名', example: '超级管理员' })
  name: string;

  @ApiProperty({ description: '权限id数组', example: [1, 2, 3, 4] })
  authoritys: Array<number>;
}

export class getRoleDto {
  @ApiProperty({ description: '角色id', example: 1 })
  id: number;

  @ApiProperty({ description: '角色名', example: '超级管理员' })
  name: string;

  @ApiProperty({ description: '权限数组', example: ['角色管理'] })
  authoritysStr: Array<string>;
}

export class RoleListResponseDto extends ResponseDto {
  data: {
    list: getRoleDto[];
    total: number;
  };
}
