"use client";

import NowPlayingSlider from "@/components/HomePage/NowPlayingSlider";
import UpComing from "@/components/HomePage/UpComing";
import PopularMovie from "@/components/HomePage/PopularMovie";
import TopRatedMovies from "@/components/HomePage/TopRatedMovies";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const  TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL

export default function Home() {

  return (
    <div className="flex flex-col w-screen max-w-[1280px]">
      <NowPlayingSlider />
      <div className="">
      <UpComing/> 
      <PopularMovie/>
      <TopRatedMovies/>
      </div>
    </div>
  );
}
