import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingController } from './training.controller';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subject,
      Teacher,
    ]),
  ],
  controllers: [
    TrainingController,
  ],
})
export class SchoolModule {}
