import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '张三' })
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}
