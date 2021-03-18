import { shuffle } from './aux';

export function generateValues(count) {
  const answer = [];

  const range = Math.floor((Math.random() * 89)) + 10;
  for (let i = 0; i < count; i += 1) {
    answer.push(Math.floor((Math.random() * range * 2)) - Math.floor((Math.random() * range * 2)));
  }

  return shuffle(answer);
}

export function generateRatings(count, maxRating = null) {
  const answer = [];

  // interesting distribution for max 5 stars
  if (maxRating === null && count === 11) {
    return shuffle([0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5]);
  }

  const range = (maxRating === null) ? Math.floor(Math.random() * 10) + 2 : maxRating;
  for (let i = 0; i < count; i += 1) {
    if (maxRating === null) {
      answer.push(Math.ceil((Math.random() * range)));
    } else {
      answer.push(Math.floor((Math.random() * (range + 1)))); // zero stars can happen
    }
  }

  return shuffle(answer);
}
