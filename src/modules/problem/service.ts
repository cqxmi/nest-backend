import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entity';
import { Repository, Like } from 'typeorm';
import { ProblemSaveDto, ProblemAnswerDto } from './dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private problemsRepository: Repository<Problem>,
  ) {}

  async save(body: ProblemSaveDto) {
    if (body.id) {
      const existing = await this.problemsRepository.findOne({
        where: { id: body.id },
      });
      if (!existing) {
        throw new NotFoundException('问题不存在');
      }
      Object.assign(existing, {
        title: body.title,
        answer: body.answer,
        type: body.type,
      });
      return this.problemsRepository.save(existing);
    } else {
      const newProblem = this.problemsRepository.create(body);
      return this.problemsRepository.save(newProblem);
    }
  }

  async del(id: number) {
    const result = await this.problemsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('问题不存在');
    }

    return { success: true };
  }

  async findByType(type: string, keyword?: string, page: number = 1, size: number = 10, isQuestion?: number) {
    const where: any = { type };

    if (keyword) {
      where.title = Like(`%${keyword}%`);
    }

    if (isQuestion === 1) {
      const qb = this.problemsRepository.createQueryBuilder('p')
        .where('p.type = :type', { type });

      if (keyword) {
        qb.andWhere('p.title LIKE :keyword', { keyword: `%${keyword}%` });
      }

      qb.orderBy(
        'CASE WHEN p.correctCount + p.wrongCount = 0 THEN 0 ELSE p.correctCount * 1.0 / (p.correctCount + p.wrongCount) END',
        'ASC',
      );

      const [problems, total] = await qb
        .skip((page - 1) * size)
        .take(size)
        .getManyAndCount();

      return {
        data: problems,
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      };
    }

    const [problems, total] = await this.problemsRepository.findAndCount({
      where,
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

  async recordAnswer(body: ProblemAnswerDto) {
    const problem = await this.problemsRepository.findOne({
      where: { id: body.id },
    });

    if (!problem) {
      throw new NotFoundException('问题不存在');
    }

    if (body.correct === 1) {
      problem.correctCount += 1;
      problem.lastResult = 1;
    } else if (body.correct === 2) {
      problem.wrongCount += 1;
      problem.lastResult = 2;
    } else {
      throw new BadRequestException('correct 值只能为 1（正确）或 2（错误）');
    }

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    problem.lastAnswerTime = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    return this.problemsRepository.save(problem);
  }
}
