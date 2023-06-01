/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import router from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { clientCredentials } from '../utils/client';

function Home({ data }) {
  const omdbUrl = clientCredentials.omdbURL;
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [formInput, setFormInput] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setSearchResults(data.results);
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
    setSearchTerm(e.target.value);
  };
  // api call for search function then sets search results
  const search = async (e) => {
    e.preventDefault();
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${omdbUrl}`,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    };
    let movies = await fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${formInput.searchTerm}`, options);
    movies = await movies.json();
    setSearchResults(movies.results);
  };

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Search below for the title of your favorite movies.</p>
        <p>Click on the View Details button below the movie poster for a more in depth overview</p>
        <div>
          <form className="search-form" onSubmit={search}>
            <input className="search" name="searchTerm" value={searchTerm} onChange={handleInput} type="text" required />
            <button type="submit" className="btn-search">search</button>
          </form>
        </div>
        <div className="movie-search-results-grid">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {searchResults.map((item) => (
              <Carousel.Item key={item.id.slice(7)} className="carousel-item" interval={4000}>
                <img src={item.image?.url} alt={item.title} />
                <Carousel.Caption className="carousel-caption">
                  <h3>{item.title}</h3>
                  <Button
                    onClick={() => router.push(`/detailsPage?id=${item.id.slice(7)}`)}
                    size="lg"
                    variant="primary"
                    style={{ flex: 2, marginBottom: 0 }}
                  >
                    View Details
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

// sets server side props to pre load page with movies
export async function getServerSideProps() {
  const omdbUrl = clientCredentials.omdbURL;
  const url = 'https://online-movie-database.p.rapidapi.com/title/find?q=brave';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${omdbUrl}`,
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
    },
  };

  const intialMovies = await fetch(url, options);
  const data = await intialMovies.json();
  return { props: { data } };
}

export default Home;

Home.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array,
  }).isRequired,
};
