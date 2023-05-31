import React from 'react';
import { useRouter } from 'next/router';
import MovieDetails from '../components/ViewDetails';

function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div>
      <h1>Movie Details</h1>
      <MovieDetails movieId={id} />
    </div>
  );
}

export default DetailsPage;
