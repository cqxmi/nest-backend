import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProblemService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBooleanDto } from 'src/app.dto';
import { ProblemAddDto, ProblemUpdateDto, DeleteProblemDto, ProblemFindByTypeDto, ProblemGetByIdDto } from './dto';

@ApiTags('问题')
@Controller('prob')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) { }

  @Post('add')
  @ApiOperation({ summary: '增加问题', description: '增加问题' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async addProblem(@Body() body: ProblemAddDto) {
    await this.problemService.add(body);
    return { message: '添加成功' };
  }

  @Post('update')
  @ApiOperation({ summary: '更新问题', description: '更新问题' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateProblem(@Body() body: ProblemUpdateDto) {
    await this.problemService.update(body);
    return { message: '更新成功' };
  }

  @Get('del')
  @ApiOperation({ summary: '删除问题', description: '删除问题' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteProblem(@Query() query: DeleteProblemDto) {
    await this.problemService.del(query.id);
    return { message: '删除成功' };
  }

  @Get('findByType')
  @ApiOperation({ summary: '根据类型查询问题', description: '根据类型查询问题列表（分页）' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询成功',
  })
  @HttpCode(HttpStatus.OK)
  async findByType(@Query() query: ProblemFindByTypeDto) {
    const result = await this.problemService.findByType(query.type, query.page, query.size);
    return {
      message: '查询成功',
      data: result.data,
      total: result.total,
      page: result.page,
      size: result.size,
      totalPages: result.totalPages,
    };
  }

  @Get('getById')
  @ApiOperation({ summary: '根据 ID 获取问题', description: '根据问题 ID 获取问题详情（包含答案）' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询成功',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Query() query: ProblemGetByIdDto) {
    const problem = await this.problemService.getById(query.id);
    return {
      message: '查询成功',
      data: problem,
    };
  }
}
