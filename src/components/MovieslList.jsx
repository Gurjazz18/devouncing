import React, { useState, useEffect } from 'react';
import MovieDetails from './MovieDetails';
const apiKey = '994bab5e'; // Replace with your actual API key

function MoviesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) return;
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    }; 

    const timeoutId = setTimeout(fetchMovies, 500); // Debounce search input
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelectMovie = (imdbID) => {
    setSelectedMovie(imdbID);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="searchResults">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie" onClick={() => handleSelectMovie(movie.imdbID)}>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100'} alt={movie.Title} />
            <div className="details">
              <div className="title">{movie.Title}</div>
              <div className="year">{movie.Year}</div>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && <MovieDetails imdbID={selectedMovie} />}
    </div>
  );
}

export default MoviesList;
