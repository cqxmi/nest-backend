import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entity';

@Entity()
export class Account {
  @ApiProperty({ description: '账户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户昵称', example: '张三' })
  @Column()
  name: string;

  @ApiProperty({ description: '平台', example: 'dy' })
  @Column()
  platform: string;

  @ApiProperty({ description: 'cookie', example: '123456' })
  @Column()
  cookie: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User; // 关联到哪个用户
}
