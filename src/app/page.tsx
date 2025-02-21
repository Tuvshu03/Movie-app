"use client";

import NowPlayingSlider from "@/components/HomePage/NowPlayingSlider";
import MovieList from "@/components/HomePage/MovieList";
import ConnectBackEnd from "@/components/connectBackEnd";

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
    <div className="w-screen mt-5">
      <NowPlayingSlider />
      <div className="flex flex-col items-center">
        {movieGenres.map((item, index) => (
          <MovieList key={index} name={item.name} endpoint={item.endpoint} />
        ))}
        <ConnectBackEnd/>
      </div>
    </div>
  );
}
