import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entity';
import { Repository } from 'typeorm';
import { ProblemAddDto, ProblemUpdateDto } from './dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,
  ) {}

  async add(problem: ProblemAddDto) {
    const newProblem = this.problemsRepository.create(problem);
    return this.problemsRepository.save(newProblem);
  }

  async update(problem: ProblemUpdateDto) {
    const existingProblem = await this.problemsRepository.findOne({
      where: { id: problem.id },
    });

    if (!existingProblem) {
      throw new NotFoundException('问题不存在');
    }

    Object.assign(existingProblem, {
      title: problem.title ?? existingProblem.title,
      answer: problem.answer ?? existingProblem.answer,
      type: problem.type ?? existingProblem.type,
    });

    return this.problemsRepository.save(existingProblem);
  }

  async del(id: number) {
    const result = await this.problemsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('问题不存在');
    }

    return { success: true };
  }

  async findByType(type: string, page: number = 1, size: number = 10) {
    const [problems, total] = await this.problemsRepository.findAndCount({
      where: { type },
      skip: (page - 1) * size,
      take: size,
    });

    return {
      data: problems,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }

  async getById(id: number) {
    const problem = await this.problemsRepository.findOne({
      where: { id },
    });

    if (!problem) {
      throw new NotFoundException('问题不存在');
    }

    return problem;
  }
}
