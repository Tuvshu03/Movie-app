import React from 'react'
import MovieList from "./MovieList";
const TopRatedMovies = () => {
    const name = "Top Rated";
    const endpoint = "top_rated";
  return (
    <div>
        <MovieList name={name} endpoint={endpoint}/>
    </div>
  )
}

export default TopRatedMovies