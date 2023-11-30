import { createWriteStream } from 'node:fs';

import { Item } from "./entities/item";
import { CoolMath } from './helpers/cool-math';
import { generateRandomItems } from "./helpers/generate-random-items";
import { bruteForce, memoized } from "./solution";

const [
  testsRaw,
  trialsPerTestRaw,
  knapsackPercentageRaw,
  numberOfItemsRaw,
  shouldOutputTestResultsRaw
] = process.argv.slice(2);

const tests = Number(testsRaw);
const trialsPerTest = Number(trialsPerTestRaw);
// const knapsackPercentage = Number(knapsackPercentageRaw);
// let numberOfItems = Number(numberOfItemsRaw);
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

const itensPerTest = [10,
  50,
  100,
  150,
  170,
  250,
  500,
  1000,
  5000
]

const knapsackSizes = [
  5,
  5,
  10,
  15,
  17,
  25,
  50,
  100,
  500,
]

console.log('Generating Test Set...');
for (let i = 0; i < tests; i++) {
  testSet.push(
    generateRandomItems(
      itensPerTest[i],
      knapsackSizes[i],
    ),
  )
}

console.log();

console.log('Simple Recursive Approach');
for (let i = 0; i < tests; i++) {
  if (itensPerTest[i] > 170) {
    break;
  }

  console.log(`Running Test ${i + 1} with ${knapsackSizes[i]} as knapsack max weight`);
  console.log(`Running with ${testSet[i].length} items`);

  let executionTimes: number[] = [];
  let iterations: number[] = [];
  for (let j = 0; j < trialsPerTest; j++) {
    const recStart = performance.now();
    bruteForce(
      knapsackSizes[i],
      testSet[i],
      testSet[i].length,
      measurements,
    )
    const recStop = performance.now();

    const recDifference = recStop - recStart;
    executionTimes.push(recDifference);
    iterations.push(measurements.iterations)

    console.log(`Test ${i + 1} Trial ${j + 1} execution time: ${recDifference}ms`)
    console.log(`Test ${i + 1} Trial ${j + 1} iterations: ${measurements.iterations}`);

    measurements.iterations = 0;
  }

  console.log()

  if (shouldOutputTestResults) {
    testsResults.bruteForce[i + 1] = {
      knapsackMaxWeight: knapsackSizes[i],
      inputSize: testSet[i].length,
      executionTimeInMS: executionTimes.reduce((acc, cur) => acc + cur, 0),
      executionTimeMean: CoolMath.mean(executionTimes),
      executionTimeStd: CoolMath.standardDeviation(executionTimes, true),
      iterations: iterations.reduce((acc, cur) => acc + cur, 0),
    };
  }

  executionTimes = [];
  iterations = [];
  measurements.iterations = 0;
}

console.log()

measurements.iterations = 0;

console.log('Dynamic Programming Approach');
for (let i = 0; i < tests; i++) {
  console.log(`Running Test ${i + 1} with ${knapsackSizes[i]} as knapsack max weight`);
  console.log(`Running with ${testSet[i].length} items`);

  let executionTimes: number[] = [];
  let iterations: number[] = [];
  for (let j = 0; j < trialsPerTest; j++) {
    const dynStart = performance.now();
    memoized(
      knapsackSizes[i],
      testSet[i],
      testSet[i].length,
      measurements,
    );
    const dynStop = performance.now();

    const dynDifference = dynStop - dynStart;
    executionTimes.push(dynDifference);
    iterations.push(measurements.iterations)

    console.log(`Test ${i + 1} Trial ${j + 1} execution time: ${dynDifference}ms`)
    console.log(`Test ${i + 1} Trial ${j + 1} iterations: ${measurements.iterations}`)
  }

  console.log();

  if (shouldOutputTestResults) {
    testsResults.memoized[i + 1] = {
      knapsackMaxWeight: knapsackSizes[i],
      inputSize: testSet[i].length,
      executionTimeInMS: executionTimes.reduce((acc, cur) => acc + cur, 0),
      executionTimeMean: CoolMath.mean(executionTimes),
      executionTimeStd: CoolMath.standardDeviation(executionTimes, true),
      iterations: iterations.reduce((acc, cur) => acc + cur, 0),
    };
  }

  executionTimes = [];
  iterations = [];
  measurements.iterations = 0;
}

if (shouldOutputTestResults) {
  console.log('Processing test results to CSV file...');

  const csvHeader = `implementation,test,knapSackMaxWeight,inputSize,executionTimeInMS,executionTimeMean,executionTimeStd,iterations\n`;

  const bruteForceResults = Object.entries(testsResults.bruteForce);
  const bruteForceLines = bruteForceResults.map(([key, value]) => {
    return `bruteForce,${key},${value.knapsackMaxWeight},${value.inputSize},${value.executionTimeInMS},${value.executionTimeMean},${value.executionTimeStd},${value.iterations}\n`
  });

  const memoizedResults = Object.entries(testsResults.memoized);
  const memoizedLines = memoizedResults.map(([key, value]) => {
    return `memoized,${key},${value.knapsackMaxWeight},${value.inputSize},${value.executionTimeInMS},${value.executionTimeMean},${value.executionTimeStd},${value.iterations}\n`;
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
