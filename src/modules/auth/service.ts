import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phone: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ phone });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, phone: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
