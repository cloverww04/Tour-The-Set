/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { clientCredentials } from '../utils/client';
import { createMovie } from '../api/firebaseData';
import { useAuth } from '../utils/context/authContext';
import detailsCSS from './forms/detailsCSS.module.css';

function MovieDetails({ movieId }) {
  const [movieData, setMovieData] = useState(null);
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const handleLocationClick = (location) => {
    const address = location.location;
    router.push({
      pathname: '/MapPage',
      query: { address },
    });
  };

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

  const handleAddToFavorites = () => {
    const movieObject = {
      title: movieData?.title?.title,
      image: movieData?.title?.image?.url,
      favorite: true,
      rating: movieData?.ratings?.rating,
      plotOutline: movieData?.plotOutline?.text,
      uid: user.uid,
      // Add any other properties you need
    };
    createMovie(movieObject);
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <Card className={detailsCSS.movieCard}>
            <Card.Img variant="top" src={movieData?.title?.image?.url} alt={movieData?.title?.title} className={detailsCSS.movieImage} />
            <Button variant="primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </Button>
          </Card>
        </Col>
        <Col md={8} className={`movieDetailsContainer ${detailsCSS.movieDetailsContent}`}>
          <Card>
            <Card.Body>
              <Card.Title><h1>{movieData?.title?.title}</h1></Card.Title>
              <Card.Text>
                <span className="header-details">Plot Outline:</span>
              </Card.Text>
              <Card.Text>
                {movieData?.plotOutline?.text}
              </Card.Text>
              <Card.Text>
                <span className="header-details">Rating:</span>
              </Card.Text>
              <Card.Text>
                {movieData?.ratings?.rating}
              </Card.Text>
              <Card.Text>
                <span className="header-details">Genres:</span>
              </Card.Text>
              <ul>
                {movieData?.genres?.map((genre) => (
                  <li className="header-details" key={uuid()}>{genre}</li>
                ))}
              </ul>
              <div>
                <div className="header-details">Filming Locations:</div>
                {locations && locations.length > 0 ? (
                  <ul>
                    {locations.map((location) => (
                      <li className="header-details" key={uuid()}>
                        <a
                          tabIndex="-1"
                          onClick={() => handleLocationClick(location)}
                          style={{ cursor: 'pointer' }}
                        >
                          {location.location}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No locations found for this film.</span>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieDetails;
