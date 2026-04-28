import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class chatDto {
  @ApiProperty({
    description: '公司名称',
    example: '腾讯',
  })
  @IsNotEmpty({ message: '公司不能为空' })
  company: string;

  @ApiProperty({
    description: '消息',
    example: '你有什么用',
  })
  @IsNotEmpty({ message: '消息不能为空' })
  msg: string;
}

export class searchDto {
  @ApiProperty({
    description: '公司名称',
    example: '腾讯',
  })
  @IsNotEmpty({ message: '公司不能为空' })
  company: string;
}
