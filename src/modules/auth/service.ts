import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { comparePassword, hashPassword } from '../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  // 注册
  async register(registerArg: CreateUserDto): Promise<User> {
    // 先查重
    const existingUser = await this.authRepository.findOne({
      where: { username: registerArg.username }, // 假设 DTO 中有 username 字段
    });
    if (existingUser) {
      throw new ConflictException('用户名已存在'); // 返回 409 冲突状态码
    }
    registerArg.password = await hashPassword(registerArg.password);
    return this.authRepository.save(registerArg);
  }

  // 登录
  async login(loginArg: CreateUserDto): Promise<User> {
    // 先判断有没有
    const existingUser = await this.authRepository.findOne({
      where: { username: loginArg.username }, // 假设 DTO 中有 username 字段
    });
    if (!existingUser) {
      throw new NotFoundException('该用户不存在');
    }
    if (await comparePassword(loginArg.password, existingUser.password)) {
      return existingUser;
    } else {
      throw new NotFoundException('密码错误');
    }
  }
}
