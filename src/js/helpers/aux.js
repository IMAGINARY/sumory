/* eslint-disable import/prefer-default-export */

// Fisher-Yates shuffle
export function shuffle(array) {
  const answer = [...array];
  for (let i = answer.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [answer[i], answer[j]] = [answer[j], answer[i]];
  }
  return answer;
}
