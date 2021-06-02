import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppItalianService {

  constructor(
    @Inject('DUMMY_MESSAGE') private readonly dummyMessage: string,
  ) {
    console.log('AppItalianService.constructor', this.dummyMessage);
    console.log(process.env.DB_HOST);
  }

  getHello(): string {
    return 'Ciao Mondo!';
  }
}
