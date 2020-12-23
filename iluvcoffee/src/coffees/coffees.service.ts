import { Injectable, NotFoundException } from '@nestjs/common';

import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto  } from './dtos/update-coffee.dto';

@Injectable()
export class CoffeesService {

  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    }
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    const coffee = this.coffees.find(item => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(dto: CreateCoffeeDto): void {
    const id = Math.floor(Math.random() * 1000);
    const coffee = {id, ...dto};
    this.coffees = [...this.coffees, coffee];
  }

  update(id: number, dto: UpdateCoffeeDto): void {
    const existing = this.findOne(id);
    if (existing) {
      this.coffees = this.coffees.map(
        (item: Coffee) => item.id === id ? {...item, ...dto} : item
      );
    }
  }

  remove(id: number): void {
    this.coffees = this.coffees.filter(
      (item: Coffee) => item.id !== id
    );
  }
}
