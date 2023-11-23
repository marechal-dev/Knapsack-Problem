import { generateRandomItems } from "./helpers/generate-random-items";
import { bruteForce, memoized } from "./solution";

console.log('Knapsack Problem');
console.log('Generating time tags...');
const rbf10 = 'rbf-10';
const rbf15 = 'rbf-15';
const rbf20 = 'rbf-20';
const rbf30 = 'rbf-30';

const memo10 = 'memo-10';
const memo15 = 'memo-15';
const memo20 = 'memo-20';
const memo30 = 'memo-30';

console.log('Generating random items...')
const items10 = generateRandomItems(10, 30);
const items15 = generateRandomItems(15, 31);
const items20 = generateRandomItems(20, 32);
const items30 = generateRandomItems(30, 33);

console.log('First Implementation: Recursive Brute-Force');

console.log('10 items');
console.time(rbf10);
const rbfe10 = bruteForce(
  30,
  items10,
  items10.length,
);
console.log(rbfe10);
console.timeEnd(rbf10);
console.log();

console.log('15 items');
console.time(rbf15);
const rbfe15 = bruteForce(
  31,
  items15,
  items15.length,
);
console.log(rbfe15);
console.timeEnd(rbf15);
console.log();

console.log('20 items');
console.time(rbf20);
const rbfe20 = bruteForce(
  32,
  items20,
  items20.length,
);
console.log(rbfe20);
console.timeEnd(rbf20);
console.log();

console.log('30 items');
console.time(rbf30);
const rbfe30 = bruteForce(
  33,
  items30,
  items30.length,
);
console.log(rbfe30);
console.timeEnd(rbf30);
console.log();

console.log('Second Implementation: Memoized Recursion');

console.log('10 items');
console.time(memo10);
const memoe10 = memoized(
  30,
  items10,
  items10.length,
);
console.log(memoe10);
console.timeEnd(memo10);
console.log();

console.log('100 items');
console.time(memo15);
const memoe15 = memoized(
  31,
  items15,
  items15.length,
);
console.log(memoe15);
console.timeEnd(memo15);
console.log();

console.log('200 items');
console.time(memo20);
const memoe20 = memoized(
  32,
  items20,
  items20.length,
);
console.log(memoe20);
console.timeEnd(memo20);
console.log();

console.log('300 items');
console.time(memo30);
const memoe30 = memoized(
  33,
  items30,
  items30.length,
);
console.log(memoe30);
console.timeEnd(memo30);
console.log();
