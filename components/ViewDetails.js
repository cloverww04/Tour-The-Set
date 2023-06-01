/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { clientCredentials } from '../utils/client';

function MovieDetails({ movieId }) {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const omdbUrl = clientCredentials.omdbURL;
      const url = `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${movieId}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${omdbUrl}`,
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovieData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return (
    <div>
      {movieData ? (
        <div>
          <h2>{movieData.title?.title}</h2>
          <img src={movieData.title?.image?.url} alt={movieData.title?.title} />
          <p>{movieData.plotOutline?.text}</p>
          <li>{movieData.genres[0] ? movieData.genres[0] : 'No Information Found'}</li>
          <li>{movieData?.genres[1]}</li>
          <li>{movieData?.genres[2]}</li>
          <p>Rating: {movieData.ratings?.rating}</p>
          {/* Render other movie details */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};
export default MovieDetails;
