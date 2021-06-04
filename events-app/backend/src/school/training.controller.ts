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

    const subject = new Subject();
    subject.name = 'Math';

    const teacher1 = new Teacher();
    teacher1.name = 'John Smith';

    const teacher2 = new Teacher();
    teacher2.name = 'Jane Smith';

    subject.teachers = [teacher1, teacher2];

    await this.subjectRepository.save(subject);
  }

  @Get('/remove-stuff')
  public async removeStuff() {

    const subject = await this.subjectRepository.findOne(1, {
      relations: ['teachers'],
    });

    // Removes the teacher from the database since cascade = true
    subject.teachers = subject.teachers.filter(teacher => teacher.id !== 2);

    await this.subjectRepository.save(subject);
  }
}
