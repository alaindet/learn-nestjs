import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from './teacher.entity';

@Entity('subjects')
export class Subject {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Teacher,
    teacher => teacher.subjects,
    {
      cascade: true,
    },
  )
  // JoinTable should only be on one side of the relation
  @JoinTable({
    name: 'join_subjects_teachers',
    joinColumn: {
      name: 'subjects_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teachers_id',
      referencedColumnName: 'id',
    },
  })
  teachers: Teacher[];
}
