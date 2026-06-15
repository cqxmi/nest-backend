import { Module } from '@nestjs/common';
import { ProblemTypeController } from './controller';
import { ProblemTypeService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemType } from './entity';
import { Problem } from '../problem/entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemType, Problem])],
  controllers: [ProblemTypeController],
  providers: [ProblemTypeService],
  exports: [ProblemTypeService],
})
export class ProblemTypeModule {}
