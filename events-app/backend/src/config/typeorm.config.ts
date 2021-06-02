import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Event } from '../event.entity';

// TODO: Move values to .env
export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'events-app',
  // TODO: Auto-load of entities?
  entities: [
    Event,
  ],
  // TODO: Disable in production  
  // synchronize: true,
  synchronize: false,
}