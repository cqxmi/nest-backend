import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class searchDto {
  @ApiProperty({
    description: '用户名',
    example: 'root',
  })
  @IsString({ message: '用户名必须是字符串' })
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsString({ message: '密码必须是字符串' })
  @IsOptional()
  password?: string;
}
