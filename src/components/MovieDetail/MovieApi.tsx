"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Play } from "lucide-react";
import { MovieDetail } from "@/app/types/MovieDetail";
import Image from "next/image";
import { Button } from "../ui/button";
import PartPeople from "./PartPeople";
import MoreLike from "./MoreLike";
import Trailer from "./Trailer";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type MovieId = {
  movieId: number;
};

const MovieApi = (props: MovieId) => {
  const { movieId } = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | any>({});
  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovieDetail(response.data);
      console.log("ssad", response.data);
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

  return (
    <div className="page-detail text-foreground">
      {!movieDetail.movieId ? (
        <div className="justify-center ">
          <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
            <div className="space-y-1">
              <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
                {movieDetail.original_title}
              </h1>
              <h4 className="text-sm lg:text-lg">{movieDetail.release_date}</h4>
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="hidden lg:block w-full align-center">Rating</h5>
              <div className="flex py-[2px] gap-x-1">
                <Star
                  color="#fde047"
                  fill="#fde047"
                  className="bg-yellow w-[28px] h-[28px]"
                />
                <div className="flex flex-col items-center">
                  <div className="font-medium">
                    {movieDetail.vote_average}/10
                  </div>
                  <div>{movieDetail.vote_count}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-8 mb-8">
            <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded">
              <Image
                src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.poster_path}`}
                width={290}
                height={428}
                alt="property image"
                className="overflow-hidden"
              />
            </div>
            <div className="relative">
              <div className="relative overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
                <Image
                  src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.backdrop_path}`}
                  width={760}
                  height={428}
                  alt="property image"
                  className="overflow-hidden"
                />
                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
              </div>
              <div className="absolute left-6 bottom-6 z-20">
                <Button className="bg-inherit">
                  <div className="bg-white w-[40px] h-[40px] rounded-full pl-3 pt-3">
                    <Play color="black" />
                  </div>
                  <div>Play trailer 1:30</div>
                </Button>
              </div>
            </div>
          </div>
          <div className="px-5 lg:px-0">
            <div className="flex gap-x-[34px] lg:block">
              <div className="relative overflow-hidden block w-[100px] h-[148px] rounded shrink-0 lg:hidden">
                <Image
                  src={`${TMDB_IMAGE_SERVICE_URL}/w500${movieDetail.poster_path}`}
                  width={290}
                  height={428}
                  alt="property image"
                  className="overflow-hidden"
                />
              </div>
              <div className="space-y-5 mb-5">
                <div className="flex flex-wrap gap-3">
                  {Array.isArray(movieDetail?.genres) &&
                    movieDetail.genres.length > 0 &&
                    movieDetail.genres.map((genre: any) => {
                      return (
                        <div key={genre.id} className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs">
                          {genre.name}
                        </div>
                      );
                    })}
                </div>
                <p>{movieDetail.overview}</p>
              </div>
            </div>
            <PartPeople movieId={movieId} />
            <Trailer movieId={movieId} />
            <MoreLike movieId={movieId} /> 
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default MovieApi;
