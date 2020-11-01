import { Task } from '../tasks.model';

export class CreateTaskDto {
  title: Task['title'];
  description: Task['description'];
}
