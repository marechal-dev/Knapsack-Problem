import { createWriteStream } from 'node:fs';

import { Item } from "./entities/item";
import { generateRandomItems } from "./helpers/generate-random-items";
import { bruteForce, memoized } from "./solution";

const [testsRaw, knapsackMaxWeightRaw, numberOfItemsRaw, stepRaw, shouldOutputTestResultsRaw] = process.argv.slice(2);

const tests = Number(testsRaw);
let knapsackMaxWeight = Number(knapsackMaxWeightRaw);
let numberOfItems = Number(numberOfItemsRaw);
const step = Number(stepRaw);
const shouldOutputTestResults = Boolean(shouldOutputTestResultsRaw);

console.log('Knapsack Problem');

const measurements = {
  iterations: 0,
};

console.log();

const testSet: Item[][] = [];

type TestResult = Record<string, Record<number, Record<string, number>>>;

const testsResults: TestResult = {
  bruteForce: {},
  memoized: {},
};

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

  if (shouldOutputTestResults) {
    testsResults.bruteForce[i + 1] = {
      knapsackMaxWeight,
      inputSize: testSet[i].length,
      executionTimeInMS: recDifference,
      iterations: measurements.iterations,
    };
  }

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

  if (shouldOutputTestResults) {
    testsResults.memoized[i + 1] = {
      knapsackMaxWeight,
      inputSize: testSet[i].length,
      executionTimeInMS: dynDifference,
      iterations: measurements.iterations,
    };
  }

  knapsackMaxWeight += step;
  measurements.iterations = 0;
}

if (shouldOutputTestResults) {
  console.log('Processing test results to CSV file...');

  const csvHeader = `implementation,test,knapSackMaxWeight,inputSize,executionTimeInMS,iterations\n`;

  const bruteForceResults = Object.entries(testsResults.bruteForce);
  const bruteForceLines = bruteForceResults.map(([key, value]) => {
    return `bruteForce,${key},${value.knapsackMaxWeight},${value.inputSize},${value.executionTimeInMS},${value.iterations}\n`
  });

  const memoizedResults = Object.entries(testsResults.memoized);
  const memoizedLines = memoizedResults.map(([key, value]) => {
    return `memoized,${key},${value.knapsackMaxWeight},${value.inputSize},${value.executionTimeInMS},${value.iterations}\n`;
  });;

  const resultFileWriteStream = createWriteStream('./results.csv', {
    encoding: 'utf-8',
  });

  resultFileWriteStream.write(csvHeader, () => {
    console.log('Writed CSV header...');
  });

  bruteForceLines.forEach((line) => resultFileWriteStream.write(line, () => {
    console.log(`Wrote ${line}`);
  }));

  memoizedLines.forEach((line) => resultFileWriteStream.write(line, () => {
    console.log(`Wrote ${line}`);
  }));
}
