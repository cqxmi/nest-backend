import { Module } from '@nestjs/common';
import { RolesController } from './controller';
import { RolesService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity';
import { AuthModule } from '../auth/module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RoleModule {}
