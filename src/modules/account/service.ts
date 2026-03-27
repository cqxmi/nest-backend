import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity';
import { Repository } from 'typeorm';
import { accountAddDto } from './account.dto';
import { UsersService } from '../users/service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private readonly usersService: UsersService,
  ) {}

  async add(acc: accountAddDto, username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException('用户不存在');

    const account = this.accountsRepository.create({ ...acc, user });
    return this.accountsRepository.save(account);
  }

  async del(id: number, username: string) {
    // 1️⃣ 找用户，确保账号归属
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException('用户不存在');

    // 2️⃣ 直接按主键删除，同时加上用户校验
    const result = await this.accountsRepository.delete({
      id: id,
      user: { id: user.id }, // 假设 Account 有 user 关系
    });

    if (result.affected === 0) {
      throw new NotFoundException('账号不存在或不属于该用户');
    }

    return { success: true };
  }
}
