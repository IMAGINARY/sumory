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

function calculateStrategiesMonteCarlo(values, turns, iterations) {
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

function calculateStrategiesDeterministically(values, turns, iterations) {
  const strategies = Array(turns).fill(0);

  // We need the sorted values for the exploit phase ...
  const valuesSorted = [...values].sort((a, b) => a - b);
  // ... and the average for the explore phase.
  const average = values.reduce((a, b) => a + b, 0) / values.length;

  for (let exploitStart = 1; exploitStart <= turns; exploitStart += 1) {
    // During the explore phase, we pick from the hidden values at random.
    // The expected value of a pick is the average of all values.
    // Multiply by the number of picks to get the total value for the explore phase.
    const exploreTotal = average * exploitStart;

    // During the exploit phase, we pick the maximum value known so far.
    // To determine the expected value, we need to compute the likelihood of each value
    // to be the maximum in a group of `exploitStart` randomly chosen elements and multiply
    // the likelihood by the value itself.
    // Consider the sorted list of values `valuesSorted`: The likelihood of value `i` being
    // the maximum is the number of combinations of size `exploitStart - 1` from the `i-1`
    // elements that are smaller than or equal to `valuesSorted[i]` (=binomial coefficient
    // (i - 1, exploitStart - 1)) divided by the total number of possible
    // combinations of size `exploitStart` from the (sorted) values (=binomial coefficient
    // (valuesSorted.length, exploitStart)).
    //
    // The binomial coefficient (n + 1, k) equals (n + 1) / (n + 1 - k) * (n, k).
    // Therefore, each required binomial coefficient can be computed from the previous one
    // resulting in the linear time algorithm below.
    let pickedAsMax = 1;
    let totalPicks = 0;
    let exploitTotal = 0;

    for (let indexOfMax = exploitStart - 1; indexOfMax < valuesSorted.length; indexOfMax += 1) {
      exploitTotal += pickedAsMax * valuesSorted[indexOfMax];
      totalPicks += pickedAsMax;
      pickedAsMax = (pickedAsMax * (indexOfMax + 1)) / (indexOfMax + 1 - (exploitStart - 1));
    }
    exploitTotal = (turns - exploitStart) * (exploitTotal / totalPicks);

    // The score for the strategy is the sum of the expected values for the explore and exploit phases.
    strategies[exploitStart - 1] = exploreTotal + exploitTotal;
  }

  return strategies;
}

export default function calculateStrategies(values, turns, iterations = 1000000) {
  return calculateStrategiesDeterministically(values, turns, iterations);
}
