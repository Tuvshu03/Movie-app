"use client";

import NowPlayingSlider from "@/components/HomePage/NowPlayingSlider";
import UpComing from "@/components/HomePage/UpComing";
import PopularMovie from "@/components/HomePage/PopularMovie";
import TopRatedMovies from "@/components/HomePage/TopRatedMovies";

export default function Home() {
  return (
    <div className="w-screen">
      <NowPlayingSlider/>
      <div className="px-5 lg:px-96" >
          <UpComing />
          <PopularMovie />
          <TopRatedMovies />
      </div>
    </div>
  );
}
