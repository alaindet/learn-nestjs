import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: Read from .env
export const TYPEORM_OPTIONS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true, // TODO: False on production
};