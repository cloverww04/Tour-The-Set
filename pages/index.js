/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import MovieCard from '../components/MovieCard';

function Home({ data }) {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [formInput, setFormInput] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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
        'X-RapidAPI-Key': '85986a5db4msh517938993f594c8p13a5cejsnd77db73deb02',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    };
    let movies = await fetch(`https://online-movie-database.p.rapidapi.com/title/v2/find?title=${formInput.searchTerm}&limit=20&sortArg=moviemeter%2Casc`, options);
    movies = await movies.json();
    setSearchResults(movies.results);
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <h1>Hello {user.displayName}! </h1>
      <p> click below to sign out </p>
      <Button onClick={signOut}>Sign Out</Button>
      <div>
        <form onSubmit={search}>
          <input className="search" name="searchTerm" value={searchTerm} onChange={handleInput} type="text" required />
          <button type="submit" className="btn-search">search</button>
        </form>
      </div>
      <div className="movie-search-results-grid">
        {searchResults.map((each) => (
          // add image url and update api quota https://rapidapi.com/apidojo/api/online-movie-database
          <MovieCard key={each.id} id={each.id} title={each.title} poster={each.image?.url ? each.image.url : 'some image url here'} titleType={each.titleType} />
        ))}
      </div>
    </div>
  );
}

// sets server side props to pre load page with movies
export async function getServerSideProps() {
  const url = 'https://online-movie-database.p.rapidapi.com/title/v2/find?title=brave&limit=20&sortArg=moviemeter%2Casc';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '85986a5db4msh517938993f594c8p13a5cejsnd77db73deb02',
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
