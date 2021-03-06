import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, DeleteResult } from 'typeorm';

import { paginate, PaginateOptions } from 'src/shared/pagination/pagination';
import { AttendeeAnswer } from '../entities/attendee.entity';
import { Event } from '../entities/event.entity';
import { User } from '../../auth/entities/user.entity';
import { ListEvents, WhenEventFilter } from '../input/filters/list.events';
import { CreateEventDto } from '../input/dtos/create-event.dto';
import { UpdateEventDto } from '../input/dtos/update-event.dto';

@Injectable()
export class EventsService {

  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  public async getEvent(id: string): Promise<Event | undefined> {
    const query = this.getEventWithAttendeesCount()
      .andWhere('e.id = :id', { id });
    this.logger.debug(query.getSql());
    return await query.getOne();
  }

  public async getEventsWithAttendeeCountFilteredPaginated(
    filter: ListEvents,
    paginateOptions: PaginateOptions,
  ) {
    const query = this.getEventsWithAttendeeCountFiltered(filter);
    return await paginate(await query, paginateOptions);
  }

  public getEventWithAttendeesCount(): SelectQueryBuilder<Event> {

    // It works, but every "loadRelationCountAndMap" performs a query!
    // Which is a whopping 5 queries
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap(
        'e.attendeesCount', // Virtual property to map to
        'e.attendees', // Relation property to count on
      )
      .loadRelationCountAndMap(
        'e.attendeesAccepted', // Virtual property to map to
        'e.attendees', // Relation property to count on
        'att', // Alias of related table?
        queryBuilder => queryBuilder
          .where('att.answer = :answer', { answer: AttendeeAnswer.Accepted })
      )
      .loadRelationCountAndMap(
        'e.attendeesRejected', // Virtual property to map to
        'e.attendees', // Relation property to count on
        'att', // Alias of related table?
        queryBuilder => queryBuilder
          .where('att.answer = :answer', { answer: AttendeeAnswer.Rejected })
      )
      .loadRelationCountAndMap(
        'e.attendeesMaybe', // Virtual property to map to
        'e.attendees', // Relation property to count on
        'att', // Alias of related table?
        queryBuilder => queryBuilder
          .where('att.answer = :answer', { answer: AttendeeAnswer.Maybe })
      );
  }

  public async createEvent(dto: CreateEventDto, user: User): Promise<Event> {
    const when = new Date(dto.when);
    const { password, ...organizer } = user;
    return await this.eventsRepository.save({ ...dto, when, organizer });
  }

  public async updateEvent(event: Event, dto: UpdateEventDto): Promise<Event> {
    const when = dto.when ? new Date(dto.when) : event.when;
    return await this.eventsRepository.save({ ...event, ...dto, when });
  }

  public async deleteEvent(event: Event): Promise<void> {
    this.eventsRepository.remove(event);
  }

  // Delete via query builder
  // public async deleteEvent(id: number): Promise<DeleteResult> {
  //   return await this.eventsRepository
  //     .createQueryBuilder('e')
  //     .delete()
  //     .where('id = :id', { id })
  //     .execute();
  // }

  private getEventsBaseQuery(): SelectQueryBuilder<Event> {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  private async getEventsWithAttendeeCountFiltered(
    filter?: ListEvents,
  ): Promise<SelectQueryBuilder<Event>> {

    let query = this.getEventWithAttendeesCount();

    if (!filter) {
      return query;
    }

    if (filter.when) {
      switch (filter.when) {
        case WhenEventFilter.Today: {
          const today = 'CURDATE()';
          const tomorrow = 'CURDATE() + INTERVAL 1 DAY';
          const sql = `e.when >= ${today} AND e.when < ${tomorrow}`;
          query = query.andWhere(sql);
          break;
        }
        case WhenEventFilter.Tomorrow: {
          const tomorrow = 'CURDATE() + INTERVAL 1 DAY';
          const afterTomorrow = 'CURDATE() + INTERVAL 2 DAY';
          const sql = `e.when >= ${tomorrow} AND e.when < ${afterTomorrow}`;
          query = query.andWhere(sql);
          break;
        }
        case WhenEventFilter.ThisWeek: {
          const eventsWeek = 'YEARWEEK(e.when, 1)';
          const thisWeek = 'YEARWEEK(CURDATE(), 1)';
          const sql = `${eventsWeek} = ${thisWeek}`;
          query = query.andWhere(sql);
          break;
        }
        case WhenEventFilter.NextWeek: {
          const eventsWeek = 'YEARWEEK(e.when, 1)';
          const nextWeek = 'YEARWEEK(CURDATE(), 1) + 1';
          const sql = `${eventsWeek} = ${nextWeek}`;
          query = query.andWhere(sql);
          break;
        }
      }
    }

    return await query;
  }
}
