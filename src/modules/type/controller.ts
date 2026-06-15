import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Body,
} from '@nestjs/common';
import { ProblemTypeService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBooleanDto } from 'src/app.dto';
import {
  TypeSaveDto,
  DeleteTypeDto,
  TypeGetByIdDto,
} from './dto';

@ApiTags('类型')
@Controller('type')
export class ProblemTypeController {
  constructor(private readonly problemTypeService: ProblemTypeService) { }

  @Post('save')
  @ApiOperation({ summary: '新增/编辑类型', description: '传 ID 为编辑，不传 ID 为新增' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '操作成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async saveType(@Body() body: TypeSaveDto) {
    await this.problemTypeService.save(body);
    return { message: '操作成功' };
  }

  @Get('del')
  @ApiOperation({ summary: '删除类型', description: '删除类型' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteType(@Query() query: DeleteTypeDto) {
    await this.problemTypeService.del(query.id);
    return { message: '删除成功' };
  }

  @Get('getAll')
  @ApiOperation({ summary: '获取所有类型', description: '获取类型列表（分页）' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询成功',
  })
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const result = await this.problemTypeService.getAll();
    return {
      message: '查询成功',
      data: result.data,
      total: result.total
    };
  }

  @Get('getById')
  @ApiOperation({ summary: '根据 ID 获取类型', description: '根据类型 ID 获取类型详情' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询成功',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Query() query: TypeGetByIdDto) {
    const type = await this.problemTypeService.getById(query.id);
    return {
      message: '查询成功',
      data: type,
    };
  }
}
