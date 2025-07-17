import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '张三' })
  name: string;
  @ApiProperty({ description: '年龄', example: 16 })
  age: number;
  @ApiProperty({ description: '性别，男1，女0', example: 1 })
  gender: number;
}
