import { Module } from '@nestjs/common';
import { AuthoritysService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  providers: [AuthoritysService],
  exports: [AuthoritysService],
})
export class AuthorityModule {}
