import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function MovieCard({
  id, title, poster, titleType,
}) {
  return (
    <div className="movie" key={id}>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={poster} alt={title} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <p className="card-text bold">{titleType}</p>
          <h1>{id}</h1>
        </Card.Body>
      </Card>
    </div>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
  cast: PropTypes.string,
}.isRequired;

export default MovieCard;
