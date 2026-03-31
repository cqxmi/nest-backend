import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ChatService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseChatDto } from 'src/app.dto';
import { chatDto } from './chat.dto';

@ApiTags('聊天') // Swagger 分组名称
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sendMessage')
  @ApiOperation({ summary: '推送消息', description: '推送消息' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功返回消息',
    type: ResponseChatDto,
  })
  @HttpCode(HttpStatus.OK)
  async sendMsg(@Body() body: chatDto) {
    const msg = body.msg;
    return {
      data: await this.chatService.sendMsg(msg),
    };
  }
}
