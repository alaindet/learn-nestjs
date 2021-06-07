import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Attendee } from './attendee.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('events')
export class Event {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Expose()
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  @Expose()
  name: string;

  @Column('varchar', { length: 255 })
  @Expose()
  description: string;

  @Column('datetime', {
    transformer: {
      from: (timestamp: number): Date => new Date(timestamp),
      to: (date: Date): string => date.toISOString(),
    }
  })
  @Expose()
  when: Date;

  @Column('varchar', { length: 255 })
  @Expose()
  where: string;

  @OneToMany(
    () => Attendee,
    attendee => attendee.event,
    {
      // eager: true,
      cascade: true,
    },
  )
  @Expose()
  attendees: Attendee[];

  // Virtual properties, no column
  attendeesCount?: number;
  attendeesAccepted?: number;
  attendeesMaybe?: number;
  attendeesRejected?: number;

  @ManyToOne(
    () => User,
    user => user.organized,
  )
  @JoinColumn({ name: 'organizer_id' })
  @Expose()
  organizer: User;

  @Column({
    type: 'int',
    name: 'organizer_id',
    unsigned: true,
    nullable: true,
  })
  organizerId: number;
}
