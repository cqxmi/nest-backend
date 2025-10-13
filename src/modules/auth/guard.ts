import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ✅ 白名单：放行登录、注册等公共接口
    const publicRoutes = ['/auth/login'];

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!publicRoutes.includes(request.url)) {
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.token as string;
  }
}
