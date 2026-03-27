import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
import { ResponseBooleanDto } from 'src/app.dto';
import { searchDto } from '../users/user.dto';

@ApiTags('鉴权') // Swagger 分组名称
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录', description: '用户登录' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '登录成功',
    type: ResponseBooleanDto,
  })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: searchDto) {
    const password = body.password as string;
    return {
      data: await this.authService.signIn(password),
    };
  }
}
