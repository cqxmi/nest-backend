import { ApiProperty } from '@nestjs/swagger';
import { Account } from './modules/account/entity';

export class ResponseDto {
  @ApiProperty({ description: '状态码，0 表示成功', example: 0 })
  code: number;

  @ApiProperty({ description: '请求是否成功', example: true })
  success: boolean;
}

export class ResponseBooleanDto extends ResponseDto {
  @ApiProperty({ description: '操作是否成功', example: true })
  data: boolean;
}

export class ResponseAccountDto extends ResponseDto {
  @ApiProperty({
    description: '账号数组',
    example: [{ id: 1, name: '账号1', platform: '抖音', cookie: '123456' }],
  })
  data: Account[];
}
