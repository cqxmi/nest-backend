import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProblemType {
  @ApiProperty({ description: '类型ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '类型名称', example: '数学' })
  @Column()
  name: string;
}
