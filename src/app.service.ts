import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'To-Do List API is running!',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}