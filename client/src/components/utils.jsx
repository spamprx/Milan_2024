import Papa from 'papaparse';

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function loadGamesFromCSV() {
  return new Promise((resolve, reject) => {
    Papa.parse('/games.csv', {
      header: true,
      download: true,
      complete: (results) => {
        const games = results.data.map(game => ({
          ...game,
          startDatetime: game.startDatetime ? new Date(game.startDatetime) : null,
          endDatetime: game.endDatetime ? new Date(game.endDatetime) : null,
        }));
        resolve(games);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
