import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { Profile } from './profile.entity';

@Entity('users')
export class User {
 
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  username: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { unique: true, length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  firstName: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn({
    name: 'profile_id',
  })
  profile: Profile;
}