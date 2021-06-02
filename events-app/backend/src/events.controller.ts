import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Like } from 'typeorm';

import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get('demo')
  async demo() {
    return await this.repository.find({
      where: [
        {
          id: MoreThan(3),
          // AND
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        // OR
        {
          description: Like('%meet%'),
        },
      ],
    });
  }

  @Get('/')
  async findAll() {
    return await this.repository.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.repository.findOne(id);
  }

  @Post('/')
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
      id: Date.now(),
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