import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Welcome to the E-Learning Platform API',
      routes: {
        users: '/users',
        backup: '/backup/schedule',
        courses: '/course',
      },
    };
  }
}
