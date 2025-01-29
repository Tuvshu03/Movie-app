"use client"

import NowPlayingSlider from "@/components/homePage/NowPlayingSlider";
import PopularMovie from "@/components/homePage/PopularMovie";
import TopRatedMovie from "@/components/homePage/TopRatedMovie";
import UpComingSlider from "@/components/homePage/UpComingSlider";

export default function Home() {
  const  TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  return (
   <div>
    <NowPlayingSlider/>
    <UpComingSlider/>
    <TopRatedMovie/>
    <PopularMovie/>
   </div>
  );
}
