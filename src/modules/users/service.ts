import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity';
import { FindOneOptions, Repository } from 'typeorm';
import { jwtPayload } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(user: jwtPayload, relations?: Array<string>): Promise<User | null> {
    const params: FindOneOptions<User> = {};
    const where: jwtPayload = {};

    // 构建查询条件：支持 phone 或 id
    if (user.phone) {
      where.phone = user.phone;
    }
    if (user.id) {
      where.id = user.id;
    }
    params.where = where;
    if (relations) {
      params.relations = relations;
    }
    return this.usersRepository.findOne(params);
  }
}
