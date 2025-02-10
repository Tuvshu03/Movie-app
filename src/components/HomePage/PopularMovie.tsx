
import MovieList from "./MovieList";

const PopularMovie = () => {
  const name = "Popular";
  const endpoint = "popular";
  return (
      <MovieList name={name} endpoint={endpoint} />
  );
};

export default PopularMovie;
