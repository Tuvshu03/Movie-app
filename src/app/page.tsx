"use client";

import NowPlayingSlider from "@/components/HomePage/NowPlayingSlider";
import MovieList from "@/components/HomePage/MovieList";

export default function Home() {
  const movieGenres = [
    {
      name: "Upcoming",
      endpoint: "upcoming",
    },
    {
      name: "Popular",
      endpoint: "popular",
    },
    {
      name: "Top Rated",
      endpoint: "top_rated",
    },
  ];

  return (
    <div className="w-screen">
      <NowPlayingSlider />
      <div className=" px-5 lg:px-96">
        {movieGenres.map((item, index) => (
          <MovieList key={index} name={item.name} endpoint={item.endpoint} />
        ))}
      </div>
    </div>
  );
}
