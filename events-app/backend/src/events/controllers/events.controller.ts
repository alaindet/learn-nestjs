import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { Event } from '../entities/event.entity';

@Controller('/events')
export class EventsController {

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get('/')
  async findAll() {
    return await this.repository.find();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return await this.repository.findOne(id);
  }

  @Post('/')
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOne(id);
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}