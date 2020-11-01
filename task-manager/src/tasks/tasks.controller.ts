import { Controller, Body, Get, Post, Delete, Param, Patch } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  getAllTask(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: Task['id']): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/:key')
  updateTask(
    @Param('id') id: Task['id'],
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: Task['id']): string {

    if (this.tasksService.deleteTask(id)) {
      return `Task with id = ${id} was deleted`;
    }

    return `We could not remove task with id = ${id}`;
  }
}
