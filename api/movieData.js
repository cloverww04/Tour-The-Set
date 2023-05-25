const getMovieLoader = () => new Promise((resolve, reject) => {
  const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=brave';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '62ded4818fmsh224966963d961abp16bd45jsn27d86290140b',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
    },
  }.then((response) => {
    if (response.data) {
      fetch(url, options);
      resolve(Object.values(response.data));
    } else {
      resolve([]);
    }
  }).catch((error) => reject(error));
});

export default getMovieLoader;
