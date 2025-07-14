import { Controller, Get } from '@nestjs/common';
import { TextsService } from './service';
import { Text } from './entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('文本') // Swagger 分组名称
@Controller('texts')
export class TextsController {
  constructor(private readonly textService: TextsService) {}
  @Get('/list')
  @ApiResponse({
    status: 200,
    type: [Text],
  })
  async findAll(): Promise<Text[]> {
    return await this.textService.findAll();
  }
}
