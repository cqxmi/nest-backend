import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { UsersService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, TypeOrmModule],
})
export class UserModule {}
