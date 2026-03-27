import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';

export class LoginDataDto {
  @ApiProperty({
    description: '访问的令牌（JWT）',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx',
  })
  access_token: string;
}

export class AuthRequest extends Request {
  @ApiProperty({
    description: '保存的用户信息',
    example: { sub: 1, username: 'root' },
  })
  user: { sub: number; username: string }; // 对应 JWT payload
}
