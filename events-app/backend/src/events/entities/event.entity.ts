import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Attendee } from './attendee.entity';

export enum AttendeeAnswer {
  Accepted = 1,
  Maybe = 2,
  Rejected = 3,
}

@Entity('events')
export class Event {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('datetime', {
    transformer: {
      from: (timestamp: number): Date => new Date(timestamp),
      to: (date: Date): string => date.toISOString(),
    }
  })
  when: Date;

  @Column('varchar', { length: 255 })
  where: string;

  @Column('enum', {
    enum: AttendeeAnswer,
    default: AttendeeAnswer.Accepted,
  })
  answer: number;

  @OneToMany(
    () => Attendee,
    attendee => attendee.event,
    {
      // eager: true,
      cascade: true,
    },
  )
  attendees: Attendee[];

  // Virtual properties, no column
  attendeesCount?: number;
  attendeesRejected?: number;
  attendeesMaybe?: number;
  attendeesAccepted?: number;
}
