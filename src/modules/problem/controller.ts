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
import { ProblemSaveDto, DeleteProblemDto, ProblemFindByTypeDto, ProblemGetByIdDto, ProblemAnswerDto } from './dto';

@ApiTags('问题')
@Controller('prob')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) { }

  @Post('save')
  @ApiOperation({ summary: '新增/编辑问题', description: '传 ID 为编辑，不传 ID 为新增' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '操作成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async saveProblem(@Body() body: ProblemSaveDto) {
    await this.problemService.save(body);
    return { message: '操作成功' };
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
    const result = await this.problemService.findByType(query.type, query.keyword, Number(query.page), Number(query.size), Number(query.isQuestion));
    return {
      message: '查询成功',
      data: result.data,
      total: result.total,
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
    const problem = await this.problemService.getById(Number(query.id));
    return {
      message: '查询成功',
      data: problem,
    };
  }

  @Post('answer')
  @ApiOperation({ summary: '记录答题结果', description: '传 id 和 correct（1 正确 / 2 错误），对应次数加 1' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '记录成功',
  })
  @HttpCode(HttpStatus.OK)
  async recordAnswer(@Body() body: ProblemAnswerDto) {
    await this.problemService.recordAnswer(body);
    return { message: '记录成功' };
  }
}
