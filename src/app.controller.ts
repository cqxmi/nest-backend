import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Header('Content-Type', 'text/html') // 设置响应头为 HTML
  getHello() {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hello Page</title>
        </head>
        <body>
          <h1>${this.appService.getHello()}</h1>
        </body>
      </html>
    `;
  }
}
