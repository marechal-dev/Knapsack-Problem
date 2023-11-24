import { Item } from "./entities/item";
import { generateRandomItems } from "./helpers/generate-random-items";
import { bruteForce, memoized } from "./solution";

const [testsRaw, knapsackMaxWeightRaw, numberOfItemsRaw, stepRaw] = process.argv.slice(2);

const tests = Number(testsRaw);
let knapsackMaxWeight = Number(knapsackMaxWeightRaw);
let numberOfItems = Number(numberOfItemsRaw);
const step = Number(stepRaw);

console.log('Knapsack Problem');

const measurements = {
  iterations: 0,
};

console.log();

const testSet: Item[][] = [];

console.log('Generating Test Set...');
for (let i = 0; i < tests; i++) {
  testSet.push(
    generateRandomItems(
      numberOfItems,
      knapsackMaxWeight,
    ),
  )

  numberOfItems += step;
}

console.log();

console.log('Simple Recursive Approach');
for (let i = 0; i < tests; i++) {
  console.log(`Running Test ${i + 1} with ${knapsackMaxWeight} as knapsack max weight`);
  console.log(`Running with ${testSet[i].length} items`);

  const recStart = performance.now();
  bruteForce(
    knapsackMaxWeight,
    testSet[i],
    testSet[i].length,
    measurements,
  )
  const recStop = performance.now();

  const recDifference = recStop - recStart;

  console.log(`Test ${i + 1} execution time: ${recDifference}ms`)
  console.log(`Test ${i + 1} iterations: ${measurements.iterations}`);
  console.log()

  measurements.iterations = 0;
}

console.log()

measurements.iterations = 0;

console.log('Dynamic Programming Approach');
for (let i = 0; i < tests; i++) {
  console.log(`Running Test ${i + 1} with ${knapsackMaxWeight} as knapsack max weight`);
  console.log(`Running with ${testSet[i].length} items`);

  const dynStart = performance.now();
  memoized(
    knapsackMaxWeight,
    testSet[i],
    testSet[i].length,
    measurements,
  );
  const dynStop = performance.now();

  const dynDifference = dynStop - dynStart;

  console.log(`Test ${i + 1} execution time: ${dynDifference}ms`)
  console.log(`Test ${i + 1} iterations: ${measurements.iterations}`)
  console.log();

  knapsackMaxWeight += step;
  measurements.iterations = 0;
}
