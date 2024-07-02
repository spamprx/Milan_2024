import data from "./scores.json";
const pointsCount = {};
data.forEach((match) => {
  const { Sport, Team1, Score1, Team2, Score2 } = match;

  if (!pointsCount[Sport]) {
    pointsCount[Sport] = {};
  }
  if (!pointsCount[Sport][Team1]) {
    pointsCount[Sport][Team1] = 0;
  }
  pointsCount[Sport][Team1] += Score1;

  if (!pointsCount[Sport][Team2]) {
    pointsCount[Sport][Team2] = 0;
  }
  pointsCount[Sport][Team2] += Score2;
});

export const games = Object.keys(pointsCount);
export const blocknames = Object.keys(pointsCount[games[0]]);
export const points = Object.fromEntries(
  Object.entries(pointsCount).map(([game, blockPoints]) => [
    game,
    Object.values(blockPoints).map((value) => Number(value)),
  ])
);
console.log(points);
console.log(blocknames);
console.log(games);
