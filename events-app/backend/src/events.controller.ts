import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { EventEntity } from './event.entity';

@Controller({
  path: '/events',
})
export class EventsController {

  private events: EventEntity[] = [];

  @Get('/')
  findAll() {
    return this.events;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const searchedId = +id;
    return this.events.find(event => event.id === searchedId);
  }

  @Post('/')
  create(@Body() dto: CreateEventDto) {
    const event = new EventEntity();
    event.id = Date.now();
    event.name = dto.name;
    event.description = dto.description;
    event.when = new Date(dto.when);
    event.where = dto.where;
    this.events = [...this.events, event];
    return event;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    const searchedId = +id;
    this.events = this.events.map(event => {
      if (event.id !== searchedId) {
        return event;
      }
      const when = dto?.when ? new Date(dto.when) : event.when;
      return { ...event, ...dto, when };
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const searchedId = +id;
    this.events = this.events.filter(event => event.id !== searchedId);
  }
}