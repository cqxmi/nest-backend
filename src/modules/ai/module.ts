import { Module } from '@nestjs/common';
import { AiService } from './service';
import { MailModule } from '../email/module';

@Module({
  imports: [MailModule],
  //   controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
