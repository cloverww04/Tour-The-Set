import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMovie } from '../../../api/firebaseData';
import MovieForm from '../../../components/forms/MovieForm';

export default function EditMovie() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleMovie(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<MovieForm obj={editItem} />);
}
