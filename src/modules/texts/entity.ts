import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entity';

@Entity()
export class Text {
  @ApiProperty({ description: '文本ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '文本标题', example: '山河' })
  @Column()
  title: string;

  @ApiProperty({ description: '文本内容', example: '山河xxxx' })
  @Column()
  content: string;

  @ApiProperty({ description: '创建者id', example: '111' })
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.texts)
  @JoinColumn({ name: 'userId' })
  user: User;
}
