import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity';
import { FindOneOptions, Repository } from 'typeorm';
import { searchDto } from './user.dto';
import { hashPassword } from 'src/utils/bcrypt';
import { Account } from '../account/entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneByUsername(username: string): Promise<User | null> {
    const params: FindOneOptions<User> = {};
    const where: searchDto = {};

    where.username = username;
    params.where = where;
    return this.usersRepository.findOne(params);
  }

  async changePass(newPassword: string): Promise<boolean> {
    // 1. 查找 root 用户
    const user = await this.findOneByUsername('root');
    if (!user) {
      return false; // 用户不存在
    }

    const hashedPassword = await hashPassword(newPassword);

    // 3. 更新数据库
    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return true; // 成功
  }

  async getAccounts(username: string): Promise<Account[]> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['accounts'],
    });

    if (!user) throw new NotFoundException('用户不存在');

    return user.accounts;
  }
}
