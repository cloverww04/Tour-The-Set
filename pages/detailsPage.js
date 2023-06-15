import React from 'react';
import { useRouter } from 'next/router';
import MovieDetails from '../components/MovieDetails';

function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h3 className="glow">Movie Details</h3>
      <MovieDetails movieId={id} />
    </div>
  );
}

export default DetailsPage;
