import { Controller, Post, Get, UseGuards, Body, BadRequestException, SerializeOptions, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthJwtGuard } from '../guards/auth-jwt.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('/users')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {

  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('/create')
  async create(@Body() dto: CreateUserDto) {

    if (dto.password !== dto.passwordAgain) {
      throw new BadRequestException('You mistyped your passwords');
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { username: dto.username },
        { email: dto.email },
      ]
    });

    if (existingUser) {
      // TODO: Send HTTP code 409 Conflict error instead?
      throw new BadRequestException('Username or email already exists');
    }

    const user = new User();
    user.username = dto.username;
    user.password = await this.authService.hashPassword(dto.password);
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    // Saving it assigns it an automatic ID as well
    const savedUser = await this.userRepository.save(user);
    const { password, ...userData } = savedUser;
    const token = this.authService.getTokenForUser(user);

    // NOTICE: Authenticating user after registering straight away is dangerous!
    return { ...userData, token };
  }

  @Get('/profile')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
