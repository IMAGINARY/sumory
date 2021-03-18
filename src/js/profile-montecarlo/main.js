import calculateStrategies from '../helpers/sumory-strategy.js';
import { generateValues } from '../helpers/sumory-random.js';

const CARD_COUNT = 21;
const TURNS = 10;
const ITERATIONS_VHIGH = 2000000;
const ITERATIONS_HIGH = 1000000;
const ITERATIONS_LOW = 100000;
const ITERATIONS_MID = 500000;

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const values = generateValues(CARD_COUNT);

const stratVHigh = calculateStrategies(values, TURNS, ITERATIONS_VHIGH);
const stratHigh = calculateStrategies(values, TURNS, ITERATIONS_HIGH);
const stratMid = calculateStrategies(values, TURNS, ITERATIONS_MID);
const stratLow = calculateStrategies(values, TURNS, ITERATIONS_LOW);

console.log(`Differences ${ITERATIONS_HIGH} vs ${ITERATIONS_LOW}`);
console.log(zip(stratHigh, stratLow).map(([a, b]) => Math.abs(a - b)));

console.log(`Differences ${ITERATIONS_HIGH} vs ${ITERATIONS_MID}`);
console.log(zip(stratHigh, stratMid).map(([a, b]) => Math.abs(a - b)));

console.log(`Differences ${ITERATIONS_HIGH} vs ${ITERATIONS_VHIGH}`);
console.log(zip(stratHigh, stratVHigh).map(([a, b]) => Math.abs(a - b)));
