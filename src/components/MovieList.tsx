"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/app/types/Movie";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type movieView = {
  name: string;
  endpoint: string;
};
const MovieList = (props: movieView) => {
  const { name, endpoint } = props;
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<Movie[]>([]);

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
      console.log(response);
      console.log("data", response.data.results);
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
  }, []);

  if (loading) {
    <div>Loading</div>;
  }

  return (
    <div className="w-full justify-center">
      <div className="flex justify-between mb-9 mt-8">
        <div>{name}</div>
        <div>See more</div>
      </div>
      <div className="flex flex-wrap gap-10 ">
      {nowPlayingData.length > 0 &&
        nowPlayingData.map((movie, index) => {
          return (
            <Card
              onClick={() => {
                push(`/detail/${movie.id}`);
              }}
              key={index}
            >
              <CardContent className="p-0 w-[157.5px] bg-zinc-500 overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
                <div className="flex flex-col justify-center">
                  <Image
                    src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                    width={157.5}
                    height={233.1}
                    alt="property image"
                    className="overflow-hidden rounded-lg"
                  />
                  <div className="flex pl-2 mt-2">
                    <Star color="#fde047"
                    fill="#fde047"
                    className="bg-yellow"/> 
                    {movie.vote_average}/10
                  </div>
                 <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1"> {movie.title}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
