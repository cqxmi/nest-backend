import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProblemAddDto {
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

export class ProblemUpdateDto {
  @ApiProperty({ description: '问题 ID', example: 1 })
  @IsNumber({}, { message: 'ID 必须为数字' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number;

  @ApiProperty({ description: '问题标题', example: '如何解决这个问题？', required: false })
  @IsString({ message: '标题必须为字符串' })
  title?: string;

  @ApiProperty({ description: '问题答案', example: '答案是...', required: false })
  @IsString({ message: '答案必须为字符串' })
  answer?: string;

  @ApiProperty({ description: '问题类型', example: '数学', required: false })
  @IsString({ message: '类型必须为字符串' })
  type?: string;
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

  @ApiProperty({ description: '页码', example: 1, required: false })
  @IsNumber({}, { message: '页码必须为数字' })
  page?: number = 1;

  @ApiProperty({ description: '每页数量', example: 10, required: false })
  @IsNumber({}, { message: '每页数量必须为数字' })
  size?: number = 10;
}

export class ProblemGetByIdDto {
  @ApiProperty({ description: '问题 ID', example: 1 })
  @IsNumber({}, { message: 'ID 必须为数字' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number;
}
