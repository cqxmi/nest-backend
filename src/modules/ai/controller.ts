import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AiService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseChatDto } from 'src/app.dto';
import { chatDto, searchDto } from './ai.dto';

@ApiTags('AI') // Swagger 分组名称
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('sendMessage')
  @ApiOperation({ summary: '推送消息', description: '推送消息' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功返回消息',
    type: ResponseChatDto,
  })
  @HttpCode(HttpStatus.OK)
  async sendMsg(@Body() body: chatDto) {
    return {
      data: await this.aiService.send(body),
    };
  }

  @Get('getHistory')
  @ApiOperation({ summary: '拿历史', description: '获取对话历史' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功返回消息',
    type: ResponseChatDto,
  })
  @HttpCode(HttpStatus.OK)
  async getHis(@Query() query: searchDto) {
    return {
      data: await this.aiService.getHistory(query.company),
    };
  }
}
