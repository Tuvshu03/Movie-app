import React from 'react'
import MovieList from "./MovieList";

const UpComing = () => {
    const name = "Upcoming";
    const endpoint = "upcoming"
  return (
    <div>
        <MovieList name={name} endpoint={endpoint} />
    </div>
  )
}

export default UpComing