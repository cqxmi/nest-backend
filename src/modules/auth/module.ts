import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
