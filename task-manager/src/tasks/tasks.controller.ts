import { Controller, Body, Get, Post, Delete, Param, Patch, Query } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService,
  ) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getFilteredTasks(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: Task['id']): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: Task['id'],
    @Body('status') status: Task['status'],
  ): Task {
    console.log('status', status);
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: Task['id']): string {

    if (this.tasksService.deleteTask(id)) {
      return `Task with id = ${id} was deleted`;
    }

    return `We could not remove task with id = ${id}`;
  }
}
