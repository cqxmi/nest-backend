import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    // 排除特定路由和请求方法（如根路径的 GET 请求）
    if (request.url === '/' && request.method === 'GET') {
      return next.handle();
    }

    const { method, originalUrl } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - now;
        console.log(
          `[Request] ${method} ${originalUrl} - Completed in ${elapsedTime}ms`,
        );
      }),
    );
  }
}
