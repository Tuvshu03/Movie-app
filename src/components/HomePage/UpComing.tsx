import React from "react";
import MovieList from "./MovieList";

const UpComing = () => {
  const name = "Upcoming";
  const endpoint = "upcoming";
  return <MovieList name={name} endpoint={endpoint} />;
};

export default UpComing;
