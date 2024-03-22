import React, { useState, useEffect } from 'react';
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

function MovieDetails({ imdbID }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        const fetchMovieDetails = async () => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
            const data = await response.json();
            setMovie(data);
        };

        fetchMovieDetails();

        return () => setMovie(null);
    }, [imdbID]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movieDetails">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} alt={movie.Title} />
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
        </div>
    );
}

export default MovieDetails;
