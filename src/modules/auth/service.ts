import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(pass: string): Promise<{ access_token: string }> {
    // 1. 查询用户名为 root 的用户
    const user = await this.usersService.findOneByUsername('root');
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 2. 校验密码
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误');
    }

    // 3. 生成 JWT
    const payload = { sub: user.id, username: 'root' };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
