import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Text } from '../texts/entity';

@Entity()
export class User {
  @ApiProperty({ description: '用户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名', example: '张三' })
  @Column()
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @Column()
  password: string;

  @OneToMany(() => Text, (text) => text.user)
  texts: Text[];
}
