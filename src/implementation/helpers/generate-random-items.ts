import { faker } from '@faker-js/faker';

import { Item } from "../entities/item";

export function generateRandomItems(n: number, knapsackMaxWeight: number): Item[] {
  const items: Item[] = [];

  for (let i = 0; i < n; i++) {
    items.push(new Item(
      faker.number.int({
        min: 1,
        max: knapsackMaxWeight + 1,
      }),
      faker.number.int({
        min: 1,
        max: 100,
      }),
    ));
  }

  return items;
}
