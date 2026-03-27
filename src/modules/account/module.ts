import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity';
import { UserModule } from '../users/module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), UserModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
