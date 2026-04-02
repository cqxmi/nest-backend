import { Module } from '@nestjs/common';
import { ChatController } from './controller';
import { ChatService } from './service';
import { RedisModule } from 'src/redis/module';
import { MailModule } from '../email/module';

@Module({
  imports: [RedisModule, MailModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
