import { Module } from '@nestjs/common';
import { ProblemController } from './controller';
import { ProblemService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService],
})
export class ProblemModule {}