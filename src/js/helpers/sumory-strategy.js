import { shuffle } from './aux';

function evaluateStrategy(values, turns, exploitStart) {
  let total = 0;
  let max = null;

  for (let k = 0; k < exploitStart; k += 1) {
    total += values[k];
    if (max === null || values[k] > max) {
      max = values[k];
    }
  }

  for (let k = exploitStart; k < turns; k += 1) {
    total += max;
  }

  return total;
}

export default function calculateStrategies(values, turns, iterations = 1000000) {
  const strategies = Array(turns).fill(0);

  for (let i = 0; i < iterations; i += 1) {
    const permutation = shuffle(values);
    for (let l = 0; l < turns; l += 1) {
      strategies[l] += evaluateStrategy(permutation, turns, l + 1);
    }
  }

  for (let l = 0; l < turns; l += 1) {
    strategies[l] /= iterations;
  }
  return strategies;
}
