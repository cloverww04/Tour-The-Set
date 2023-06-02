/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../utils/context/authContext';
import { getMovie } from '../api/firebaseData';

function Favorites() {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();

  const getAllTheMovies = () => {
    getMovie(user.uid).then(setMovies);
  };

  useEffect(() => {
    getAllTheMovies();
  }, []);
  return (

    <>
      <div className="d-flex flex-wrap">
        {movies.map((movie) => (
          <MovieCard key={movie.firebaseKey} movieObj={movie} onUpdate={getAllTheMovies} />
        ))}
      </div>
    </>
  );
}

export default Favorites;
