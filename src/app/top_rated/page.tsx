import React from 'react'
import MovieList from '@/components/HomePage/MovieList';

const page = () => {
    const name = "Top Rated";
    const endpoint = "top_rated";
  return (
    <div>
        <MovieList name={name} endpoint={endpoint}/>
    </div>
  )
}

export default page