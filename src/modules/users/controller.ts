import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAccountDto, ResponseBooleanDto } from 'src/app.dto';
import { searchDto } from './user.dto';
import { AuthRequest } from '../auth/auth.dto';

@ApiTags('用户') // Swagger 分组名称
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('changePass')
  @ApiOperation({ summary: '修改密码', description: '修改密码' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '修改成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() body: searchDto) {
    const password = body.password as string;
    return {
      success: await this.userService.changePass(password),
    };
  }

  @Get('getAccounts')
  @ApiOperation({
    summary: '获取所有账号',
    description: '获取当前用户下所有的账号信息',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '操作成功',
    type: ResponseAccountDto,
  })
  @HttpCode(HttpStatus.OK)
  async getAccounts(@Request() req: AuthRequest) {
    return {
      data: await this.userService.getAccounts(req.user.username),
    };
  }
}
