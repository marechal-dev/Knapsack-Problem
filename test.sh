#!/usr/bin/env bash

set -euo pipefail

trap 'echo "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

TESTS=$1
KNAPSACK_SIZE=$2
NUMBER_OF_ITEMS=$3
STEP=$4

echo 'Knapsack Algorithm Test Runner'

echo 'Compiling TypeScript source code...'
npm run build

echo 'Tests commencing:'
npm run execute -- "$TESTS" "$KNAPSACK_SIZE" "$NUMBER_OF_ITEMS" "$STEP"


