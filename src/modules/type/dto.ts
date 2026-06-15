import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class TypeSaveDto {
  @ApiProperty({ description: '类型 ID（编辑时必传，新增不传）', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'ID 必须为数字' })
  id?: number;

  @ApiProperty({ description: '类型名称', example: '数学' })
  @IsString({ message: '名称必须为字符串' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;
}

export class DeleteTypeDto {
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number;
}

export class TypeGetAllDto {
  @ApiProperty({ description: '页码', example: 1, required: false })
  @IsNumber({}, { message: '页码必须为数字' })
  page?: number = 1;

  @ApiProperty({ description: '每页数量', example: 10, required: false })
  @IsNumber({}, { message: '每页数量必须为数字' })
  size?: number = 10;
}

export class TypeGetByIdDto {
  @ApiProperty({ description: '类型 ID', example: 1 })
  @IsNumber({}, { message: 'ID 必须为数字' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  id: number;
}
