import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateCoffeeDto } from '../models/create-coffee.dto';
import { UpdateCoffeeDto } from '../models/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

  @Post()
  // @HttpCode(HttpStatus.GONE) // Example: set HTTP status
  create(@Body() body: CreateCoffeeDto) {
    return name;
  }

  @Get()
  findAll(
    @Query() paginationQuery,
  ) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees, paginated with limit: ${limit} and offset: ${offset}`;
  }
  // Express-specific alternative
  // findAll(@Res() response) {
  //   return 'This action returns all coffees';
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns one coffee with id ${id}`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateCoffeeDto,
  ) {
    return `This action updates coffee #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action deletes coffee #${id}`;
  }
}
