/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.HOST!,
      port: Number(process.env.RS_PORT),
      password: process.env.PASSWORD!,
    });
  }

  get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  set(key: string, value: string): Promise<'OK'> {
    return this.client.set(key, value);
  }

  rpush(key: string, ...values: string[]): Promise<number> {
    return this.client.rpush(key, ...values);
  }

  lpush(key: string, ...values: string[]): Promise<number> {
    return this.client.lpush(key, ...values);
  }

  lrange(key: string, start = 0, end = -1): Promise<string[]> {
    return this.client.lrange(key, start, end);
  }

  ltrim(key: string, start: number, end: number) {
    return this.client.ltrim(key, start, end);
  }
}
