import { Controller, Body, Get, Post, Delete, Param, Patch, Query, UsePipes, ValidationPipe,ParseIntPipe } from '@nestjs/common';

import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getFilteredTasks(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: Task['id']): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: Task['id'],
  //   @Body('status', TaskStatusValidationPipe) status: Task['status'],
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: Task['id']): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
