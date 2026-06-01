import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entity';

@Entity()
export class Account {
  @ApiProperty({ description: '账户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '平台', example: 'dy' })
  @Column()
  platform: string;

  @ApiProperty({ description: 'cookie的JSON字符串', example: '123456' })
  @Column({
    type: 'longtext',
  })
  cookie: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User; // 关联到哪个用户
}
