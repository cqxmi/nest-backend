import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<[Role[], number]> {
    return this.rolesRepository.findAndCount();
  }

  findOne(obj: any): Promise<Role | null> {
    return this.rolesRepository.findOneBy(obj as FindOptionsWhere<Role>);
  }

  async addOne(newRole: any) {
    await this.rolesRepository.save(newRole);
  }

  async delOne(id: number) {
    await this.rolesRepository.delete(id);
  }

  async updateOne(id: number, updateData: any) {
    const result = await this.rolesRepository.update(
      id,
      updateData as DeepPartial<Role>,
    );

    // 检查是否成功更新
    if (result.affected === 0) {
      return false;
    }

    return true;
  }
}
