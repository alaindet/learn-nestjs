import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Patch, Post, ValidationPipe, NotFoundException, Query, UsePipes, UseGuards, ForbiddenException, SerializeOptions, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { CreateEventDto } from '../input/dtos/create-event.dto';
import { UpdateEventDto } from '../input/dtos/update-event.dto';
import { EventsService } from '../services/events.service';
import { ListEvents } from '../input/filters/list.events';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../../auth/entities/user.entity';
import { AuthJwtGuard } from 'src/auth/guards/auth-jwt.guard';

@Controller('/events')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class EventsController {

  private readonly logger = new Logger(EventsController.name);

  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true })) // Provides default values
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents) {
    this.logger.log('EventsController.findall');
    const events = await this.eventsService
      .getEventsWithAttendeeCountFilteredPaginated(filter, {
        total: true,
        page: filter.page,
        limit: filter.limit,
      });
    return events;
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string) {
    this.logger.log('EventsController.findOne');
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @Post('/')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body(new ValidationPipe()) dto: CreateEventDto,
    @CurrentUser() user: User,
  ) {
    return await this.eventsService.createEvent(dto, user);
  }

  @Patch('/:id')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) dto: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException(`No event found with id "${id}"`);
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(null, 'You cannot perform this action');
    }

    return await this.eventsService.updateEvent(event, dto);
  }

  @Delete('/:id')
  @UseGuards(AuthJwtGuard)
  @HttpCode(204)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(null, 'You cannot perform this action');
    }

    await this.eventsService.deleteEvent(event);
  }
}
