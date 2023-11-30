#!/usr/bin/env bash

set -euo pipefail

trap 'echo "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

TESTS=$1
TRIALS_PER_TEST=$2
KNAPSACK_PERCENTAGE=$3
INITIAL_NUMBER_OF_ITEMS=$4
SHOULD_OUTPUT_TEST_RESULTS=$5

echo 'Knapsack Algorithm Test Runner'

if [ ! -d ./node_modules ]; then
  echo "Dependencies missing, installing..."
  npm install
fi

echo 'Compiling TypeScript source code...'
npm run build

echo 'Tests commencing:'
npm run execute -- "$TESTS" "$TRIALS_PER_TEST" "$KNAPSACK_PERCENTAGE" "$INITIAL_NUMBER_OF_ITEMS" "$SHOULD_OUTPUT_TEST_RESULTS"


