import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: '用户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名', example: '张三' })
  @Column()
  name: string;

  @ApiProperty({ description: '年龄', example: 16 })
  @Column()
  age: number;

  @ApiProperty({ description: '性别，男1，女0', example: 1 })
  @Column()
  gender: number;
}
