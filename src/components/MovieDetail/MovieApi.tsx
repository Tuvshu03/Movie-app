"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import PartPeople from "./PartPeople";
import MoreLike from "./MoreLike";
import { MovieDetail, MovieId } from "@/app/types";
import Trailer from "./Trailer";
import { Skeleton } from "../ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const MovieApi = (props: MovieId) => {
  const { movieId } = props;
  const [, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>(
    {} as MovieDetail
  );

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

  const runtime = movieDetail.runtime;
  const hour = Math.floor(runtime / 60);
  const minute = runtime - hour * 60;

  return (
    <div className="page-detail text-foreground mt-10">
      {loading ? (
        <div className="max-w-6xl">
          <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
            <div className="space-y-1">
              <Skeleton className="w-52 h-8" />
              <Skeleton className="w-36 h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-12 h-6" />
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <Skeleton className="w-[290px] h-[428px]" />
            <div className="relative ">
              <Skeleton className="w-[760px] h-[428px]" />
            </div>
          </div>
          <div className="px-5 lg:px-0">
            <div className="flex gap-x-[34px] lg:block">
              <Skeleton className="w-[100px] h-[148px]" />
              <div className="space-y-5 mb-5">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      ) : movieDetail.id ? (
        <div className="max-w-6xl">
          <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
            <div className="space-y-1">
              <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
                {movieDetail.original_title}
              </h1>
              <h4 className="text-sm lg:text-lg flex">
                {movieDetail.release_date}
                {movieDetail.adult === false && <div> · PG · </div>} {hour}h
                {minute}m
              </h4>
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="hidden lg:block w-full align-center">Rating</h5>
              <div className="flex py-[2px] gap-x-1 items-center">
                <Star
                  color="#fde047"
                  fill="#fde047"
                  className="bg-yellow w-[28px] h-[28px]"
                />
                <div className="flex flex-col items-center">
                  <div className="font-medium">
                    {movieDetail.vote_average}/10
                  </div>
                  {movieDetail.vote_count > 1000 ? (
                    <div>{Math.floor(movieDetail.vote_count / 1000)}k</div>
                  ) : (
                    <div>1k</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded">
              <Image
                src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.poster_path}`}
                width={290}
                height={428}
                alt="property image"
                className="overflow-hidden"
              />
            </div>
            <div className="relative ">
              <div className="absolute z-30 bottom-3 right-3 bg-white rounded-2xl">
                <Trailer movieId={movieId} />
              </div>
              <div className="overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
                <Image
                  src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.backdrop_path}`}
                  width={760}
                  height={428}
                  alt="property image"
                  className="overflow-hidden w-full"
                />
                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
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
                        <div
                          key={genre.id}
                          className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs"
                        >
                          {genre.name}
                        </div>
                      );
                    })}
                </div>
                <p>{movieDetail.overview}</p>
              </div>
            </div>
            <PartPeople movieId={movieId} />
            <MoreLike movieId={movieId} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieApi;
