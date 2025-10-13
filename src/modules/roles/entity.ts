import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/entity';

@Entity()
export class Role {
  @ApiProperty({ description: '角色id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '角色名', example: '超级管理员' })
  @Column()
  name: string;

  @ApiProperty({
    description: '拥有权限',
    example: [{ id: 1, name: '用户管理' }],
  })
  @Column('json', {
    nullable: true,
  })
  authoritys: Array<any>; // TypeScript 类型提示

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
