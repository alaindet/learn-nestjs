import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    @Inject('APP_NAME') private readonly appName: string,
  ) {
    console.log('AppController.constructor', this.appName);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
