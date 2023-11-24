import { Item } from "./entities/item";

function greater(a: number, b: number) {
  return a > b ? a : b;
}

export function bruteForce(
  remainingWeight: number,
  items: Item[],
  currentIteration: number,
  measurements: { iterations: number },
): any {
  measurements.iterations += 1;
  if (currentIteration === 0 || remainingWeight === 0) {
    return 0;
  }

  if (items[currentIteration - 1].weight > remainingWeight) {
    return bruteForce(
      remainingWeight,
      items,
      currentIteration - 1,
      measurements
    );
  } else {
    return Math.max(
      items[currentIteration - 1].value + bruteForce(
        remainingWeight - items[currentIteration - 1].weight,
        items,
        currentIteration - 1,
        measurements
      ),
      bruteForce(
        remainingWeight,
        items,
        currentIteration - 1,
        measurements
      ),
    );
  }
};

export function memoized(
  remainingWeight: number,
  items: Item[],
  currentIteration: number,
  measurements: { iterations: number },
  memo: any = {},
): any {
  measurements.iterations += 1;

  if (currentIteration === 0 || remainingWeight === 0) {
    return 0;
  }

  if ((currentIteration - 1) in memo) {
    return memo[currentIteration - 1];
  }

  if (items[currentIteration - 1].weight > remainingWeight) {
    return memo[currentIteration - 1] = memoized(
      remainingWeight,
      items,
      currentIteration - 1,
      measurements,
      memo,
    );
  } else {
    return memo[currentIteration] = Math.max(
      items[currentIteration - 1].value + memoized(
        remainingWeight - items[currentIteration - 1].weight,
        items,
        currentIteration - 1,
        measurements,
        memo,
      ),
      memoized(
        remainingWeight,
        items,
        currentIteration - 1,
        measurements,
        memo,
      ),
    );
  }
}
