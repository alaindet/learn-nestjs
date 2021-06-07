import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { Profile } from './profile.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('users')
export class User {
 
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @Expose()
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  @Expose()
  username: string;

  @Column('varchar', { length: 255 })
  // Excluded from serialization since @Expose is missing
  password: string;

  @Column('varchar', { unique: true, length: 255 })
  @Expose()
  email: string;

  @Column('varchar', { length: 255 })
  @Expose()
  firstName: string;

  @Column('varchar', { length: 255 })
  @Expose()
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn({
    name: 'profile_id',
  })
  @Expose()
  profile: Profile;

  @OneToMany(
    () => Event,
    event => event.organizer,
  )
  @Expose()
  organized: Event[];
}
