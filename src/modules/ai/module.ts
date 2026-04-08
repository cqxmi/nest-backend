import { Module } from '@nestjs/common';
import { AiService } from './service';
import { MailModule } from '../email/module';
import { AiController } from '../ai/controller';

@Module({
  imports: [MailModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
