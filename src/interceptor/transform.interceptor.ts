import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    // 排除特定路由和请求方法（如根路径的 GET 请求）
    if (request.url === '/' && request.method === 'GET') {
      return next.handle();
    }
    return next.handle().pipe(
      map((data: T) => ({
        code: 0,
        success: true,
        data,
      })),
      catchError((error: HttpException) => {
        // 这里可以记录错误日志
        console.error('Request failed:', error);

        // 返回统一的错误格式
        return throwError(
          () =>
            new HttpException(
              {
                code: error.getStatus() || 500,
                success: false,
                message: error.message || 'Request failed',
              },
              error.getStatus() || 500,
            ),
        );
      }),
    );
  }
}
