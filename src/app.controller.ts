import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  getPing(): string {
    return 'Pong!';
  }
}
