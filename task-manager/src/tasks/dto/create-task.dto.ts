import { IsNotEmpty } from 'class-validator';

import { Task } from '../task.entity';

export class CreateTaskDto {

  @IsNotEmpty()
  title: Task['title'];

  @IsNotEmpty()
  description: Task['description'];
}
