
import MovieList from "./MovieList";

const PopularMovie = () => {
  const name = "Popular";
  const endpoint = "popular";
  return (
    <div>
      <MovieList name={name} endpoint={endpoint} />
    </div>
  );
};

export default PopularMovie;
