import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Authority {
  @ApiProperty({ description: '权限id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '父权限id', example: 0 })
  @Column()
  parentId: number;

  @ApiProperty({ description: '权限标识', example: 'add_permission' })
  @Column()
  permission: string;

  @ApiProperty({ description: '权限名', example: '增加角色' })
  @Column()
  permissionName: string;
}
