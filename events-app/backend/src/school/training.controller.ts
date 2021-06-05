import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Controller('school')
export class TrainingController {

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  @Get('/create-stuff')
  public async createStuff() {

    const subject = await this.subjectRepository.findOne(3);

    const teacher1 = await this.teacherRepository.findOne(3);
    const teacher2 = await this.teacherRepository.findOne(4);

    // Add teachers to a subject without the ORM
    this.subjectRepository.createQueryBuilder()
      .relation(Subject, 'teachers')
      .of(subject)
      .add([teacher1, teacher2]);

    // const subject1 = new Subject();
    // subject1.name = 'Math';

    // this.subjectRepository.save(subject1);

    // // const subject2 = new Subject();
    // // subject2.name = 'Physics';

    // const teacher1 = new Teacher();
    // teacher1.name = 'John Smith';

    // const teacher2 = new Teacher();
    // teacher2.name = 'Jane Smith';

    // // subject1.teachers = [teacher1, teacher2];

    // this.teacherRepository.save([teacher1, teacher2]);

    // // await this.subjectRepository.save([subject1, subject2]);
    // // await this.subjectRepository.save(subject1);
  }

  @Get('/remove-stuff')
  public async removeStuff() {

    // With ORM
    // const subject = await this.subjectRepository.findOne(1, {
    //   relations: ['teachers'],
    // });

    // // Removes the teacher from the database since cascade = true
    // subject.teachers = subject.teachers.filter(teacher => teacher.id !== 2);

    // await this.subjectRepository.save(subject);

    // With QueryBuilder
    // Make every subject "Confidential"
    await this.subjectRepository.createQueryBuilder('s')
      .update()
      .set({ name: 'Confidential' })
      .execute();
  }
}
