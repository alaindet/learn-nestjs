import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

  constructor(
    private readonly coffeesService: CoffeesService,
  ) {}

  @Post()
  create(@Body() body: CreateCoffeeDto) {
    console.log(body instanceof CreateCoffeeDto);
    return this.coffeesService.create(body);
  }

  @Get()
  findAll(@Query() paginationQuery: any): Coffee[] {
    // const { limit, offset } = paginationQuery; // TODO
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Coffee | undefined {
    return this.coffeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.coffeesService.remove(id);
  }
}
