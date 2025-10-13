import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '手机号', example: '17876783567' })
  phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  password: string;
}

export class jwtPayload {
  phone?: string;
  id?: number;
}
