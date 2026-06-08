import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/module';
import { AuthModule } from './modules/auth/module';
import { AccountModule } from './modules/account/module';
import { ProblemModule } from './modules/problem/module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { DataSource } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guard';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/module';
import { MailModule } from './modules/email/module';
import { AiModule } from './modules/ai/module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AccountModule,
    ProblemModule,
    AiModule,
    DatabaseModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
