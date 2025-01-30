"use client";

import NowPlayingSlider from "@/app/homePage/NowPlayingSlider";

export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  console.log(TMDB_BASE_URL);

  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <NowPlayingSlider />
      
    </div>
  );
}
