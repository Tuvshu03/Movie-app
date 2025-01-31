"use client";

import NowPlayingSlider from "@/components/NowPlayingSlider";
import PopularMovie from "@/components/PopularMovie";
import UpComing from "@/components/UpComing";
import TopRatedMovies from "@/components/TopRatedMovies";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const  TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL

export default function Home() {

  return (
    <div className="flex flex-col w-screen h-screen">
      <NowPlayingSlider />
      <div className="mx-5">
      <UpComing/>
      <PopularMovie/>
      <TopRatedMovies/>
      </div>
    </div>
  );
}
