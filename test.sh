#!/usr/bin/env bash

set -euo pipefail

trap 'echo "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

TESTS=$1
KNAPSACK_SIZE=$2
NUMBER_OF_ITEMS=$3
STEP=$4
SHOULD_OUTPUT_TEST_RESULTS=$5

echo 'Knapsack Algorithm Test Runner'

if [ ! -d ./node_modules ]; then
  echo "Dependencies missing, installing..."
  npm install
fi

echo 'Compiling TypeScript source code...'
npm run build

echo 'Tests commencing:'
npm run execute -- "$TESTS" "$KNAPSACK_SIZE" "$NUMBER_OF_ITEMS" "$STEP" "$SHOULD_OUTPUT_TEST_RESULTS"


