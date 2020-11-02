import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    return this.getAllTasks().filter(
      (task: Task): boolean => (
        task.status === status && (
          task.title.includes(search) ||
          task.description.includes(search)
        )
      )
    );
  }

  getTaskById(id: Task['id']): Task {
    const index = this.getTaskIndexById(id);
    return this.tasks[index];
  }

  updateTaskStatus(id: Task['id'], status: Task['status']): Task {
    const index = this.getTaskIndexById(id);
    const updatedTask = { ...this.tasks[index], status };
    this.tasks = [
      ...this.tasks.slice(0, index),
      updatedTask,
      ...this.tasks.slice(index + 1),
    ];
    return updatedTask;
  }

  deleteTask(id: Task['id']): void {
    const index = this.getTaskIndexById(id);
    this.tasks = [
      ...this.tasks.slice(0, index),
      ...this.tasks.slice(index + 1),
    ];
  }

  private getTaskIndexById(id: Task['id']): number {
    const index = this.tasks.findIndex((task: Task): boolean => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return index;
  }
}
