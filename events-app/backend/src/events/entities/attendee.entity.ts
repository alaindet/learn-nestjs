import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from './event.entity';

export enum AttendeeAnswer {
  Accepted = 1,
  Maybe = 2,
  Rejected = 3,
}

@Entity('attendees')
export class Attendee {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('varchar')
  name: string;

  @Column('enum', {
    enum: AttendeeAnswer,
    default: AttendeeAnswer.Accepted,
  })
  answer: number;

  // This is mandatory is the other entity has @OneToMany
  @ManyToOne(
    () => Event,
    event => event.attendees,
    {
      // It means no attendee can exist without an attached event
      nullable: false,
    }
  )
  @JoinColumn({
    name: 'event_id',
  })
  event: Event;
}
