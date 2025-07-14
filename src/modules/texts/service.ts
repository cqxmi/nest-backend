import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Text } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(Text)
    private textsRepository: Repository<Text>,
  ) {}

  findAll(): Promise<Text[]> {
    return this.textsRepository.find();
  }
}
