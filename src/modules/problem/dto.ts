import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ProblemSaveDto {
  @ApiProperty({ description: '问题 ID（编辑时必传，新增不传）', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'ID 必须为数字' })
  id?: number;

  @ApiProperty({ description: '问题标题', example: '如何解决这个问题？' })
  @IsString({ message: '标题必须为字符串' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  @ApiProperty({ description: '问题答案', example: '答案是...' })
  @IsString({ message: '答案必须为字符串' })
  @IsNotEmpty({ message: '答案不能为空' })
  answer: string;

  @ApiProperty({ description: '问题类型', example: '数学' })
  @IsString({ message: '类型必须为字符串' })
  @IsNotEmpty({ message: '类型不能为空' })
  type: string;
}

export class DeleteProblemDto {
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number;
}

export class ProblemFindByTypeDto {
  @ApiProperty({ description: '问题类型', example: '数学' })
  @IsString({ message: '类型必须为字符串' })
  @IsNotEmpty({ message: '类型不能为空' })
  type: string;

  @ApiProperty({ description: '关键词（模糊匹配标题）', example: '函数', required: false })
  @IsOptional()
  @IsString({ message: '关键词必须为字符串' })
  keyword?: string;

  @ApiProperty({ description: '页码', example: 1, required: false })
  @IsNotEmpty({ message: '页码不能为空' })
  page?: number | string;

  @ApiProperty({ description: '每页数量', example: 10, required: false })
  @IsNotEmpty({ message: '每页数量不能为空' })
  size?: number | string;

  @ApiProperty({ description: '是否按正确率排序（1 按正确率倒序排列，正确率最低排最前）', example: 1, required: false })
  @IsOptional()
  isQuestion?: number | string;
}

export class ProblemGetByIdDto {
  @ApiProperty({ description: '问题 ID', example: 1 })
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number | string;
}

export class ProblemAnswerDto {
  @ApiProperty({ description: '问题 ID', example: 1 })
  @IsNumber({}, { message: 'ID 必须为数字' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number;

  @ApiProperty({ description: '是否正确（1 正确 / 2 错误）', example: 1 })
  @IsNumber({}, { message: 'correct 必须为数字' })
  @IsNotEmpty({ message: 'correct 不能为空' })
  correct: number = 0;
}
