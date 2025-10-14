import { ApiProperty } from '@nestjs/swagger';

export class LoginDataDto {
  @ApiProperty({
    description: '访问的令牌（JWT）',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx',
  })
  access_token: string;
}
