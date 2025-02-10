import React from 'react'
import MovieList from "./MovieList";
const TopRatedMovies = () => {
    const name = "Top Rated";
    const endpoint = "top_rated";
  return (

        <MovieList name={name} endpoint={endpoint}/>

  )
}

export default TopRatedMovies