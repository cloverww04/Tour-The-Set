import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMovie } from '../../api/firebaseData';
import MovieCard from '../../components/MovieCard';

export default function ViewMovie() {
  const [movieObj, setMovieObj] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    const fetchMovie = async () => {
      if (firebaseKey) {
        const movie = await getSingleMovie(firebaseKey);
        setMovieObj(movie);
      }
    };

    fetchMovie();
  }, [firebaseKey]);

  return (
    <div>
      {Object.keys(movieObj).length > 0 && (
        <MovieCard movieObj={movieObj} onUpdate={setMovieObj} />
      )}
    </div>
  );
}
