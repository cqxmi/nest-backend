import { Module } from '@nestjs/common';
import { ChatController } from './controller';
import { ChatService } from './service';
import { RedisModule } from 'src/redis/module';

@Module({
  imports: [RedisModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
