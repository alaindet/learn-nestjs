import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('datetime', {
    transformer: {
      from(timestamp: string): Date {
        return new Date(timestamp);
      },
      to(date: Date): number {
        return date.valueOf();
      }
    }
  })
  when: Date;

  @Column('varchar', { length: 255 })
  where: string;
}