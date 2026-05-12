import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AiClient } from './client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseChatDto } from 'src/app.dto';
import { chatDto, searchDto } from './ai.dto';

@ApiTags('AI') // Swagger 分组名称
@Controller('ai')
export class AiController {
  constructor(private readonly aiClient: AiClient) {}

  @Post('sendMessage')
  @ApiOperation({ summary: 'AI发消息', description: 'AI发消息' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功返回消息',
    type: ResponseChatDto,
  })
  @HttpCode(HttpStatus.OK)
  async sendMsg(@Body() body: chatDto) {
    return await this.aiClient.sendMessage({
      user_id: body.company,
      message: body.msg,
    });
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
    return await this.aiClient.getHistory({ user_id: query.company });
  }
}
