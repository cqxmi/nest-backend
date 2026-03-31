import { User } from '../modules/users/entity';
import { Account } from '../modules/account/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('HOST'),
          port: Number(config.get('DB_PORT')),
          username: config.get('USER_NAME'),
          password: config.get('PASSWORD'),
          database: config.get('DATA_BASE'),
          entities: [User, Account],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
