import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authority } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthoritysService {
  constructor(
    @InjectRepository(Authority)
    private authoritysRepository: Repository<Authority>,
  ) {}
}
