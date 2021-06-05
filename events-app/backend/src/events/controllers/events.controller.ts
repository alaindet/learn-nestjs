import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Patch, Post, ValidationPipe, NotFoundException, Query, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEventDto } from '../input/dtos/create-event.dto';
import { UpdateEventDto } from '../input/dtos/update-event.dto';
import { Event } from '../entities/event.entity';
import { Attendee } from '../entities/attendee.entity';
import { EventsService } from '../services/events.service';
import { ListEvents } from '../input/filters/list.events';

@Controller('/events')
export class EventsController {

  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event) private repository: Repository<Event>,
    @InjectRepository(Attendee) private attendeeRepository: Repository<Attendee>,
    private readonly eventsService: EventsService,
  ) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true })) // Provides default values
  async findAll(@Query() filter: ListEvents) {
    this.logger.log('EventsController.findall');
    const events = await this.eventsService
      .getEventsWithAttendeeCountFilteredPaginated(filter, {
        total: true,
        page: filter.page,
        limit: filter.limit,
      });
    return events;
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log('EventsController.findOne');
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
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
