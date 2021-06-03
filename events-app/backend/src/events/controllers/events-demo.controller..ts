import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Event } from '../entities/event.entity';

@Controller('/events-demo')
export class EventsDemoController {

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get('/first')
  async firstDemo() {
    return await this.repository.find({
      // SELECT id, name FROM events
      select: [
        'id',
        'name',
      ],
      where: [
        // (id = 1 AND name LIKE "%meet%")
        { id: 1, name: Like('%meet%') },
        // OR (id = 2)
        { id: 2 },
      ],
      // LIMIT 10
      take: 10,
      // OFFSET 0
      skip: 0,
      // ORDER BY id DESC
      order: {
        id: 'DESC',
      },
    });
  }

  @Get('/second')
  async secondDemo() {
    const event = await this.repository.findOne(1, {
      relations: ['attendees'],
    });
    return await event.attendees;
  }
}
