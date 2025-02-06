"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, X, Star, Navigation } from "lucide-react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MovieDetail } from "../types/MovieDetail";
type Genres = {
  id: number;
  name: string;
};
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;
const page = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const searchedGenresId = searchParams.get("genresId");

  const getGenres = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setGenres(response.data.genres);
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
    getGenres();
  }, []);

  const getMovieGenres = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${searchedGenresId}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
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
    getMovieGenres();
  }, [searchedGenresId]);

  const handleGenreSelection = (genreId: any) => () => {
    const updateGenres = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((item) => item !== genreId)
      : [...selectedGenreIds, genreId];
    setSelectedGenreIds(updateGenres);
    const queryParams = new URLSearchParams();
    queryParams.set("genresId", updateGenres.join(","));
    const newPath = queryParams.toString();
    push(`/genre?${newPath}`);
  };
  return (
    <div className="flex flex-col page-primary pt-[59px]">
      <div className="py-8 lg:pt-[52px]">
        <h3 className="mb-8 text-2xl font-semibold text-foreground lg:text-3xl">
          Search Filter
        </h3>
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
          <div className="static h-fit w-full lg:sticky lg:top-[111px] lg:w-[387px] space-y-5">
            <div className="text-foreground space-y-1">
                <div className="text-2xl font-semibold">Genres</div>
                <div>See lists of movies by genre</div>
            </div>
            <div className="flex flex-wrap gap-4">
              {genres?.length > 0 &&
                genres.map((item) => {
                  const genreId: string = item.id.toString();
                  const isSelected = selectedGenreIds.includes(genreId);
                  return (
                    <div
                      onClick={handleGenreSelection(genreId)}
                      key={item.name}
                      className={`${
                        isSelected
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : ""
                      } inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full cursor-pointer`}
                    >
                      {item.name}
                      {isSelected ? (
                        <X width={16} height={16} />
                      ) : (
                        <ChevronRight width={16} height={16} />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <Separator orientation="vertical" className="shrink-0 bg-border w-[1px] hidden lg:block border h-screen mx-4"/>
          <div className="w-full justify-center">
            <div className="flex justify-between mb-9">
              <div>{movies.length} titles</div>
            </div>
            <div className="flex flex-wrap gap-10 ">
              {movies.length > 0 &&
                movies.map((movie, index) => {
                  return (
                    <Card
                      onClick={() => {
                        push(`/detail/${movie.id}`);
                      }}
                      key={index}
                      className="bg-secondary"
                    >
                      <CardContent className="p-0 w-[157.5px] bg-zinc-500 overflow-hidden rounded-lg bg-hidden space-y-1 lg:w-[233px]">
                        <div className="flex flex-col justify-center">
                          <Image
                            src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.poster_path}`}
                            width={157.5}
                            height={233.1}
                            alt="property image"
                            className="overflow-hidden rounded-lg w-full"
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
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
