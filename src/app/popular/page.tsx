import React from 'react'
import MovieList from '@/components/HomePage/MovieList';

const page = () => {
    const name = "Popular";
    const endpoint = "popular";
    return (
      <div>
        <MovieList name={name} endpoint={endpoint} />
      </div>
    );
}

export default page