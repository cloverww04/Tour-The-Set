import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMovie } from '../api/firebaseData';

function MovieCard({ movieObj, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);

  const deleteThisMovie = () => {
    if (window.confirm(`Delete ${movieObj.title}?`)) {
      deleteMovie(movieObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      style={{ width: '18rem', margin: '10px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card.Img variant="top" src={movieObj.image} alt={movieObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{movieObj.title}</Card.Title>
        <br />
        <Card.Text>
          <div>
            <h5 className={isHovered ? 'show' : 'hidden'}>Plot Outline:</h5>
            <span className={isHovered ? 'show' : 'hidden'}>{movieObj.plotOutline}</span>
          </div>
        </Card.Text>
        <Card.Text>
          <div className={isHovered ? 'show' : 'hidden'}>Rating: {movieObj.rating}</div>
        </Card.Text>
        <br />
        {/* DYNAMIC LINK TO VIEW THE MOVIE DETAILS  */}
        <Link href={`../movie/${movieObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE MOVIE DETAILS  */}
        <Link href={`../movie/edit/${movieObj.firebaseKey}`} passHref>
          <Button variant="secondary">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMovie} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
    plotOutline: PropTypes.string,
    rating: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MovieCard;
