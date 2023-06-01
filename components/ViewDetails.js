/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { clientCredentials } from '../utils/client';

function MovieDetails({ movieId }) {
  const [movieData, setMovieData] = useState(null);
  const [locations, setLocations] = useState([]);

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

  useEffect(() => {
    const fetchMovieLocations = async () => {
      const omdbUrl = clientCredentials.omdbURL;
      const url = `https://online-movie-database.p.rapidapi.com/title/get-filming-locations?tconst=${movieId}`;
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

        if (result && result.locations) {
          setLocations(result.locations);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieLocations();
  }, [movieId]);

  return (
    <>
      <div>
        {movieData ? (
          <div>
            <h2>{movieData.title?.title}</h2>
            <img src={movieData.title?.image?.url} alt={movieData.title?.title} width="400" height="350" />
            <p>{movieData.plotOutline?.text}</p>
            <ul>
              {movieData.genres.map((genre) => (
                <li key={uuid()}>{genre}</li>
              ))}
            </ul>
            <p>Rating: {movieData.ratings?.rating}</p>
            {/* Render other movie details */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {locations && (
          <div>
            <h2>Filming Locations:</h2>
            <ul>
              {locations.map((location) => (
                <li key={uuid()}>{location.location}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieDetails;
