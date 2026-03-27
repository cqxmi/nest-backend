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
}
