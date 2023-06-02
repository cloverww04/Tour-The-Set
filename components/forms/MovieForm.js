import React, { useState, useEffect } from 'react';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getMovie, editMovie, createMovie } from '../../api/firebaseData';

const intialState = {
  title: '',
  image: '',
  favorite: false,
  rating: '',
  plotOutline: '',
};

function MovieForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [, setMovie] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getMovie(user.uid).then(setMovie);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      const updatedMovie = { ...formInput, firebaseKey: obj.firebaseKey };
      editMovie(updatedMovie)
        .then(() => router.push('/favorites'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMovie(payload).then(() => {
        router.push('/favorites');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Movie</h2>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Enter movie poster image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Enter the name of the movie" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Movie Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Enter the plot of the movie" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the plot"
            name="plotOutline"
            value={formInput.plotOutline}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput4" label="Enter the rating of the movie" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the rating"
            name="rating"
            value={formInput.rating}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Movie</Button>
      </Form>
    </>
  );
}

MovieForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MovieForm.defaultProps = {
  obj: intialState,
};

export default MovieForm;
