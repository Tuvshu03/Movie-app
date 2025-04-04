"use client";

import NowPlayingSlider from "@/components/HomePage/NowPlayingSlider";
import MovieList from "@/components/HomePage/MovieList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
      <SkeletonTheme>
        {" "}
        <NowPlayingSlider />
        <div className="flex flex-col items-center">
          {movieGenres.map((item, index) => (
            <MovieList key={index} name={item.name} endpoint={item.endpoint} />
          ))}
        </div>
      </SkeletonTheme>
    </div>
  );
}
