import React from 'react'
import MovieList from '@/components/HomePage/MovieList';

const Page = () => {
  const name = "Upcoming";
  const endpoint = "upcoming"
return (
  <div>
      <MovieList name={name} endpoint={endpoint} />
  </div>
) 
}

export default Page