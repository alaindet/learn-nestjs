import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Attendee } from './attendee.entity';

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

  @OneToMany(
    () => Attendee,
    attendee => attendee.event
  )
  attendees: Attendee[];
}
