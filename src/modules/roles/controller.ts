import { Body, Controller } from '@nestjs/common';
import { RolesService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色') // Swagger 分组名称
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
}
