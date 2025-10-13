import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/entity';

@Entity()
export class User {
  @ApiProperty({ description: '用户ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户昵称', example: '张三' })
  @Column()
  name: string;

  @ApiProperty({ description: '电话号码', example: '17687673304' })
  @Column()
  phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @Column()
  password: string;

  @ApiProperty({ description: '角色Id', example: 1 })
  @Column()
  roleId: number;

  // 多对一关系：多个用户对应一个角色
  @ApiProperty({ description: '用户角色', type: () => Role })
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' }) // 指定外键列
  role: Role;
}
