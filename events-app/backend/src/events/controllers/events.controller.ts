import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { Event } from '../entities/event.entity';

@Controller('/events')
export class EventsController {

  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  @Get('/')
  async findAll() {
    this.logger.log('EventsController.findall');
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('EventsController.findOne');
    return await this.repository.findOne(id);
  }

  @Post('/')
  // @UsePipes()
  async create(
    // @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    @Body(new ValidationPipe()) input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    // @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
    @Body(new ValidationPipe()) input: UpdateEventDto,
  ) {
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