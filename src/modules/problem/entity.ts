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

  @ApiProperty({ description: '答对次数', example: 0 })
  @Column({ default: 0 })
  correctCount: number = 0;

  @ApiProperty({ description: '答错次数', example: 0 })
  @Column({ default: 0 })
  wrongCount: number = 0;

  @ApiProperty({ description: '最近答题结果（0 未答 / 1 正确 / 2 错误），初始为未答', example: 0 })
  @Column({ default: 0 })
  lastResult: number = 0;

  @ApiProperty({ description: '最近答题时间（yyyy-mm-dd hh:mm:ss）', example: '2026-06-15 14:30:00' })
  @Column({ default: '' })
  lastAnswerTime: string = '';
}