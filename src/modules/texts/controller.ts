import { Controller, Get } from '@nestjs/common';
import { TextsService } from './service';
import { Text } from './entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文本') // Swagger 分组名称
@Controller('texts')
export class TextsController {
  constructor(private readonly textService: TextsService) {}
  @Get('/list')
  async findAll(): Promise<Text[]> {
    return await this.textService.findAll();
  }
}
