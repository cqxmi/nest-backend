import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async register(registerArg: CreateUserDto): Promise<User> {
    // 先查重
    const existingUser = await this.authRepository.findOne({
      where: { username: registerArg.username }, // 假设 DTO 中有 username 字段
    });
    if (existingUser) {
      throw new ConflictException('用户名已存在'); // 返回 409 冲突状态码
    }

    return this.authRepository.save(registerArg);
  }
}
