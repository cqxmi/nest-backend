import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../account/entity';

@Entity()
export class User {
  @ApiProperty({ description: '用户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户昵称', example: '张三' })
  @Column()
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts: Account[];
}
