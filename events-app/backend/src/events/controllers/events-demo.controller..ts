import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Event } from '../entities/event.entity';
import { Profile } from 'src/auth/entities/profile.entity';
import { User } from 'src/auth/entities/user.entity';

@Controller('/events-demo')
export class EventsDemoController {

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  @Get('/first')
  async firstDemo() {
    return await this.repository.find({
      // SELECT id, name FROM events
      select: [
        'id',
        'name',
      ],
      where: [
        // (id = 1 AND name LIKE "%meet%")
        { id: 1, name: Like('%meet%') },
        // OR (id = 2)
        { id: 2 },
      ],
      // LIMIT 10
      take: 10,
      // OFFSET 0
      skip: 0,
      // ORDER BY id DESC
      order: {
        id: 'DESC',
      },
    });
  }

  @Get('/second')
  async secondDemo() {
    const event = await this.repository.findOne(1, {
      relations: ['attendees'],
    });
    return await event.attendees;
  }

  @Get('/third')
  async thirdDemo() {

    const profile = new Profile();
    profile.id = 1;
    profile.age = 30;

    await this.profileRepo.save(profile);

    const user = new User();
    user.id = 1;
    user.email = 'john.doe@example.com';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.username = 'johndoe';
    user.password = 'johndoe';

    // Add relationship
    user.profile = profile;

    // // Remove relationship
    // user.profile = null;

    await this.userRepo.save(user);
  }
}
