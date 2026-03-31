import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class chatDto {
  @ApiProperty({
    description: '消息',
    example: '你有什么用',
  })
  @IsNotEmpty({ message: '消息不能为空' })
  msg: string;
}
