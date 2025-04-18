"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { MovieDetail } from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type MovieId = {
  movieId: number;
};

const MoreLike = (props: MovieId) => {
  const { movieId } = props;
  const { push } = useRouter();
  const [, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [movieId]);

  return (
    <div className="w-full justify-center">
      <div className="flex justify-between mb-9 mt-8">
        <div className="text-3xl font-semibold">More Like this</div>
        <div
          onClick={() => {
            push(`/similar/${movieId}`);
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
        >
          See more
          <ArrowRight />
        </div>
      </div>

      {/* Conditional Rendering: Show Skeleton if loading is true */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 justify-center">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-center col-span-1">
                <Card className="w-[157.5px] lg:w-[233px] bg-secondary">
                  <CardContent className="p-0 w-full bg-zinc-500 overflow-hidden rounded-lg bg-hidden">
                    <div className="flex flex-col justify-center">
                      <Skeleton className="w-full h-[233px] rounded-t-lg" />
                      <div className="flex pl-2 mt-2">
                        <Skeleton className="h-4 w-6 rounded-full" />
                        <Skeleton className="h-4 w-12 ml-2" />
                      </div>
                      <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1">
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          : nowPlayingData.length > 0 &&
            nowPlayingData.map((movie, index) => (
              <div key={index} className="flex justify-center col-span-1 cursor-pointer">
                <Card
                  onClick={() => {
                    push(`/detail/${movie.id}`);
                  }}
                  className="w-[157.5px] lg:w-[233px] bg-secondary"
                >
                  <CardContent className="p-0 w-full bg-zinc-500 overflow-hidden rounded-lg bg-hidden">
                    <div className="flex flex-col justify-center">
                      <Image
                        src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.poster_path}`}
                        width={157.5}
                        height={233}
                        alt="property image"
                        className="overflow-hidden rounded-bl-none w-full"
                      />
                      <div className="flex pl-2 mt-2">
                        <Star color="#fde047" fill="#fde047" className="bg-yellow" />
                        <span>{movie.vote_average}/10</span>
                      </div>
                      <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1">
                        {movie.title}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MoreLike;
