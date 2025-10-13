import { Module } from '@nestjs/common';
import { RolesController } from './controller';
import { RolesService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RoleModule {}
