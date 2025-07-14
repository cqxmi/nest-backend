import { Module } from '@nestjs/common';
import { TextsController } from './controller';
import { TextsService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextModule {}
