import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Problem {
  @ApiProperty({ description: '问题ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '问题标题', example: '如何解决这个问题？' })
  @Column()
  title: string;

  @ApiProperty({ description: '问题答案', example: '答案是...' })
  @Column({
    type: 'longtext',
  })
  answer: string;

  @ApiProperty({ description: '问题类型', example: '数学' })
  @Column()
  type: string;
}