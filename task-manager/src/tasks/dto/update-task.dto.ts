import { Task } from '../tasks.model';

export class UpdateTaskDto {
  title?: Task['title'];
  description?: Task['description'];
  status?: Task['status'];
}
