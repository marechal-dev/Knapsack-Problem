#!/usr/bin/env bash

set -euo pipefail

trap 'echo "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

TESTS=$1
TRIALS_PER_TEST=$2
INITIAL_KNAPSACK_SIZE=$3
NUMBER_OF_ITEMS=$4
STEP=$5
SHOULD_OUTPUT_TEST_RESULTS=$6

echo 'Knapsack Algorithm Test Runner'

if [ ! -d ./node_modules ]; then
  echo "Dependencies missing, installing..."
  npm install
fi

echo 'Compiling TypeScript source code...'
npm run build

echo 'Tests commencing:'
npm run execute -- "$TESTS" "$TRIALS_PER_TEST" "$INITIAL_KNAPSACK_SIZE" "$NUMBER_OF_ITEMS" "$STEP" "$SHOULD_OUTPUT_TEST_RESULTS"


