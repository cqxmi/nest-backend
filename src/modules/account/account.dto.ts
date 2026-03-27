import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class accountAddDto {
  @ApiProperty({ description: '用户昵称', example: '张三' })
  @IsString({ message: '昵称必须为字符串' })
  @IsNotEmpty({ message: '昵称不能为空' })
  name: string;

  @ApiProperty({ description: '平台', example: 'dy' })
  @IsString({ message: '平台必须为字符串' })
  @IsNotEmpty({ message: '平台不能为空' })
  platform: string;

  @ApiProperty({ description: 'cookie', example: '123456' })
  @IsString({ message: 'cookie必须为字符串' })
  @IsNotEmpty({ message: 'cookie不能为空' })
  cookie: string;
}

export class DelAccountDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
