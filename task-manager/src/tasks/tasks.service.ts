import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   return this.getAllTasks().filter(
  //     (task: Task): boolean => {

  //       if (status && !(
  //         task.status === filterDto.status
  //       )) {
  //         return false;
  //       }

  //       if (search && !(
  //         task.title.includes(search) ||
  //         task.description.includes(search)
  //       )) {
  //         return false;
  //       }

  //       return true;
  //     }
  //   );
  // }

  // updateTaskStatus(id: Task['id'], status: Task['status']): Task {
  //   const index = this.getTaskIndexById(id);
  //   const updatedTask = { ...this.tasks[index], status };
  //   this.tasks = [
  //     ...this.tasks.slice(0, index),
  //     updatedTask,
  //     ...this.tasks.slice(index + 1),
  //   ];
  //   return updatedTask;
  // }

  // deleteTask(id: Task['id']): void {
  //   const index = this.getTaskIndexById(id);
  //   this.tasks = [
  //     ...this.tasks.slice(0, index),
  //     ...this.tasks.slice(index + 1),
  //   ];
  // }
}
