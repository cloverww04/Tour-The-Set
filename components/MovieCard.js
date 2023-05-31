import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function MovieCard({
  title, poster,
}) {
  return (
    <div className="movie">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={poster} alt={title} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
}.isRequired;

export default MovieCard;
