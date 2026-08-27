import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { User, ApiResponse } from '@repo/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getUser(): ApiResponse<User> {
    return this.appService.getUser();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
