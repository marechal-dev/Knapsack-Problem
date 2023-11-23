import { Item } from "./entities/item";

function greater(a: number, b: number) {
  return a > b ? a : b;
}

export function bruteForce(
  remainingWeight: number,
  items: Item[],
  currentIteration: number,
): any {
  if (currentIteration === 0 || remainingWeight === 0) {
    return 0;
  }

  if (items[currentIteration - 1].weight > remainingWeight) {
    return bruteForce(
      remainingWeight,
      items,
      currentIteration - 1,
    );
  } else {
    return greater(
      items[currentIteration - 1].value + bruteForce(
        remainingWeight - items[currentIteration - 1].weight,
        items,
        currentIteration - 1,
      ),
      bruteForce(
        remainingWeight,
        items,
        currentIteration - 1,
      ),
    );
  }
};

export function memoized(
  remainingWeight: number,
  items: Item[],
  currentIteration: number,
  memo: any = {}
): any {
  if (currentIteration === 0 || remainingWeight === 0) {
    return 0;
  }

  const key = `${currentIteration}${remainingWeight}`;

  if (key in memo) {
    return memo[key];
  }

  if (items[currentIteration - 1].weight > remainingWeight) {
    return memo[key] = memoized(
      remainingWeight,
      items,
      currentIteration - 1,
      memo,
    );
  } else {
    return memo[key] = greater(
      items[currentIteration - 1].value + memoized(
        remainingWeight - items[currentIteration - 1].weight,
        items,
        currentIteration - 1,
        memo,
      ),
      memoized(
        remainingWeight,
        items,
        currentIteration - 1,
        memo,
      ),
    );
  }
}
