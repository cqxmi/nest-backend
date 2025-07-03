import { Injectable } from '@nestjs/common';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): void {
    const user: User = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
