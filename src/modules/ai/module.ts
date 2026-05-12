import { Module } from '@nestjs/common';
import { MailModule } from '../email/module';
import { AiController } from '../ai/controller';
import { AiClient } from './client';

@Module({
  imports: [MailModule],
  controllers: [AiController],
  providers: [AiClient],
})
export class AiModule {}
