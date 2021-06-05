import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profiles')
export class Profile {
 
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column('smallint')
  age: number;  
}