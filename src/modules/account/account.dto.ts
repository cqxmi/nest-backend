import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class accountAddDto {
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
