import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tasks: Task[] = [];

  createTask(createTaskDto: CreateTaskDto): Task {

    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.Open,
    };

    this.tasks = [...this.tasks, task];

    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: Task['id']): Task {
    return this.tasks.find(
      (task: Task): boolean => task.id === id
    );
  }

  updateTask(id: Task['id'], updateTaskDto: UpdateTaskDto): Task {
    console.log('id', id, 'updateTaskDto', updateTaskDto);
    let updatedTask: Task;
    this.tasks = this.tasks.map(
      (task: Task): Task => {
        if (task.id === id) {
          updatedTask = {...task};
          for (const key in updateTaskDto) {
            updatedTask[key] = updateTaskDto[key];
          }
          return updatedTask;
        }
        return task;
      }
    );
    return updatedTask;
  }

  deleteTask(id: Task['id']): boolean {
    const prevLength = this.tasks.length;
    this.tasks = this.tasks.filter(
      (task: Task): boolean => task.id !== id
    );
    return prevLength > this.tasks.length;
  }
}
