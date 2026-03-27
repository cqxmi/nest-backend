import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AccountService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBooleanDto } from 'src/app.dto';
import { accountAddDto } from './account.dto';
import { AuthRequest } from '../auth/auth.dto';

@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('add')
  @ApiOperation({ summary: '增加账号', description: '增加账号' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async addAccount(@Body() body: accountAddDto, @Request() req: AuthRequest) {
    await this.accountService.add(body, req.user.username);
    return { message: '添加成功' };
  }
}
