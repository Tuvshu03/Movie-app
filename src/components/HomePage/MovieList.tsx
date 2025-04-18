"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { MovieDetail } from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type MovieView = {
  name: string;
  endpoint: string;
};

const MovieList = (props: MovieView) => {
  const { name, endpoint } = props;
  const { push } = useRouter();
  const [, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${endpoint}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, [endpoint]);

  if (loading) {
    // Skeleton loading state
    return (
      <div className="w-full max-w-7xl justify-center p-0">
        <div className="flex justify-between mb-9 mt-8 w-full">
          <div className="text-3xl font-semibold">
            <Skeleton className="h-8 w-36" />
          </div>
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2">
            <ArrowRight />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 justify-center">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-center col-span-1">
              <Card className="w-[157.5px] lg:w-[233px] bg-secondary">
                <CardContent className="p-0 w-full bg-zinc-500 overflow-hidden rounded-lg bg-hidden">
                  <Skeleton className="w-full h-[233px] rounded-lg" />
                  <div className="flex pl-2 mt-2">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-16 h-4 ml-2" />
                  </div>
                  <Skeleton className="w-24 h-4 mt-1 pl-2" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl justify-center p-0">
      <div className="flex justify-between mb-9 mt-8 w-full">
        <div className="text-3xl font-semibold">{name}</div>
        <div
          onClick={() => {
            push(`/category/${endpoint}`);
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
        >
          See more
          <ArrowRight />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 justify-center">
        {nowPlayingData.length > 0 &&
          nowPlayingData.map((movie, index) => {
            return (
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
                        className="overflow-hidden object-cover rounded-bl-none w-full"
                      />
                      <div className="flex pl-2 mt-2">
                        <Star
                          color="#fde047"
                          fill="#fde047"
                          className="bg-yellow"
                        />
                        <span>{movie.vote_average}/10</span>
                      </div>
                      <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1">
                        {movie.title}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MovieList;
