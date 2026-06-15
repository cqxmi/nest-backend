import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemType } from './entity';
import { Problem } from '../problem/entity';
import { TypeSaveDto } from './dto';

@Injectable()
export class ProblemTypeService {
  constructor(
    @InjectRepository(ProblemType)
    private problemTypeRepository: Repository<ProblemType>,
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) { }

  async save(body: TypeSaveDto) {
    if (body.id) {
      const existing = await this.problemTypeRepository.findOne({
        where: { id: body.id },
      });
      if (!existing) {
        throw new NotFoundException('类型不存在');
      }
      Object.assign(existing, { name: body.name });
      return this.problemTypeRepository.save(existing);
    } else {
      const newType = this.problemTypeRepository.create(body);
      return this.problemTypeRepository.save(newType);
    }
  }

  async del(id: number) {
    const result = await this.problemTypeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('类型不存在');
    }

    return { success: true };
  }

  async getAll() {
    const [types, total] = await this.problemTypeRepository.findAndCount();

    const countResult = await this.problemRepository
      .createQueryBuilder('problem')
      .select('problem.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('problem.type')
      .getRawMany();



    const countMap = new Map(
      countResult.map((row) => [Number(row.type), Number(row.count)]),
    );

    const data = types.map((type) => ({
      ...type,
      problemCount: countMap.get(type.id) ?? 0,
    }));

    return {
      data,
      total,
    };
  }

  async getById(id: number) {
    const type = await this.problemTypeRepository.findOne({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException('类型不存在');
    }

    return type;
  }
}
