import { Injectable } from '@nestjs/common';
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
    return this.tasks.find(
      (task: Task): boolean => task.id === id
    );
  }

  updateTaskStatus(id: Task['id'], status: Task['status']): Task {
    let updatedTask: Task;
    this.tasks = this.tasks.map(
      (task: Task): Task => {
        if (task.id === id) {
          updatedTask = { ...task, status };
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
