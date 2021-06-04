import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { AttendeeAnswer } from '../entities/event.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {

  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  private getEventsBaseQuery(): SelectQueryBuilder<Event> {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  public async getEvent(id: number): Promise<Event | undefined> {
    const query = this.getEventWithAttendeesCount(id)
      .andWhere('e.id = :id', { id });
    this.logger.debug(query.getSql());
    return await query.getOne();
  }

  public getEventWithAttendeesCount(id: number): SelectQueryBuilder<Event> {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap(
        'e.attendeesCount',
        'e.attendees',
      )
      .loadRelationCountAndMap(
        'e.attendeesAccepted',
        'e.attendees',
        'attendee',
        queryBuilder => queryBuilder
          .where('attendee.answer = :answer', {
            answer: AttendeeAnswer.Accepted
          })
      )
  }
}
