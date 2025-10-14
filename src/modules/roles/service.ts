import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity';
import { FindOptionsWhere, Repository } from 'typeorm';

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
}
