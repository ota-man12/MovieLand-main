import React, { useState, useEffect } from 'react';

import './App.css';
import Search from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=d7e37ef5';

const App = () => {
  /* Adding API */
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  /* Hooks */
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    searchMovies();
  }, []);

  /* Handlers */

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchIconHandler = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search'
          value={searchTerm}
          onChange={searchHandler}
        />
        <img src={Search} alt='search' onClick={searchIconHandler} />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
